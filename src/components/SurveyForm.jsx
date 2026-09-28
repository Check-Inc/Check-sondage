import { useEffect, useRef, useState } from "react";
import { ALL_QUESTIONS, STEPS } from "../data/questions.js";
import { SUBMIT_URL } from "../config.js";
import Question from "./Question.jsx";

const makeId = () =>
  "rsp_" + (crypto.randomUUID ? crypto.randomUUID().replace(/-/g, "") : Date.now().toString(36) + Math.random().toString(36).slice(2));

/* Réponses → objet envoyé à l'API (texte vide = null, choix multiples = tableau) */
function buildPayload(id, answers) {
  const data = { id, submitted_at: new Date().toISOString() };
  ALL_QUESTIONS.forEach((q) => {
    const v = answers[q.name];
    if (q.type === "multi") data[q.name] = Array.isArray(v) ? v : [];
    else if (q.type === "scale") data[q.name] = v ? Number(v) : null;
    else data[q.name] = typeof v === "string" && v.trim() !== "" ? v.trim() : null;
  });
  return data;
}

function isVisible(q, answers) {
  return !q.showIf || answers[q.showIf[0]] === q.showIf[1];
}

/* Partie (étape de questions.js) à laquelle appartient une question */
const partOf = (q) => STEPS.find((s) => s.questions.includes(q));

export default function SurveyForm({ answers, onAnswer, onSubmitted, toast }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState("from-right");
  const [sending, setSending] = useState(false);
  const submissionId = useRef(makeId()); // identifiant stable : évite les doublons en cas de double clic
  const titleRef = useRef(null);
  const advanceTimer = useRef(null);

  const questions = ALL_QUESTIONS.filter((q) => isVisible(q, answers));
  const index = Math.min(current, questions.length - 1);
  const q = questions[index];
  const last = index === questions.length - 1;
  const progress = ((index + 1) / questions.length) * 100;

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, [index]);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const go = (i) => {
    clearTimeout(advanceTimer.current);
    setDir(i >= index ? "from-right" : "from-left");
    setCurrent(i);
  };

  // Choix unique : on passe automatiquement à la question suivante
  const answer = (v) => {
    onAnswer(q.name, v);
    if (q.type === "single" && !last) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => go(index + 1), 350);
    }
  };

  const submit = async () => {
    if (sending) return;
    setSending(true);
    const data = buildPayload(submissionId.current, answers);
    try {
      if (SUBMIT_URL) {
        const r = await fetch(SUBMIT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Idempotency-Key": data.id },
          body: JSON.stringify(data),
        });
        if (!r.ok) throw new Error("HTTP " + r.status);
      } else {
        console.info("[sondage] payload", data);
        await new Promise((res) => setTimeout(res, 400));
      }
      onSubmitted();
    } catch {
      setSending(false);
      toast("Échec de l'envoi, réessayez.");
    }
  };

  // Entrée dans un champ ou sur une option = question suivante (soumission implicite)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (last) submit();
    else go(index + 1);
  };

  return (
    <div id="survey-wrap">
      <section className="survey" aria-label="Questionnaire">
        <div className="container">
          <a
            className="back-link"
            href="#"
            onClick={(e) => { e.preventDefault(); window.location.hash = ""; }}
          >
            <span className="arrow" aria-hidden="true">←</span> Retour à l’accueil
          </a>
          <form className="wizard" noValidate onSubmit={handleSubmit}>
            <header className="wizard-head">
              <div className="wizard-kicker">
                <span className="kicker-step">Question {index + 1} sur {questions.length}</span>
                <span className="kicker-count">{partOf(q).short}</span>
              </div>
              <div
                className="progress"
                role="progressbar"
                aria-label="Progression du questionnaire"
                aria-valuemin={0}
                aria-valuemax={questions.length}
                aria-valuenow={index + 1}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
              <h2 className="sr-only" tabIndex={-1} ref={titleRef}>Question {index + 1} sur {questions.length}</h2>
            </header>

            <div className="wizard-body">
              <div className={`step ${dir}`} key={q.name}>
                <Question q={q} value={answers[q.name]} onChange={answer} />
              </div>
            </div>

            <footer className="step-nav">
              <button type="button" className="btn btn-secondary btn-prev" disabled={index === 0} onClick={() => go(index - 1)}>
                <span className="arrow" aria-hidden="true">←</span> Précédent
              </button>
              <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? "Envoi…" : <>{last ? "Envoyer" : "Suivant"} <span className="arrow" aria-hidden="true">→</span></>}
              </button>
            </footer>
            <p className="nav-note"><strong>Réponses anonymes.</strong> Seul un contact facultatif est demandé à la fin.</p>
          </form>
        </div>
      </section>
    </div>
  );
}
