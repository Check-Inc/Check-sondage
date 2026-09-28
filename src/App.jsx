import { useCallback, useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import SurveyForm from "./components/SurveyForm.jsx";
import ThankYou from "./components/ThankYou.jsx";
import { useToast } from "./hooks/useToast.js";
import { useShare } from "./hooks/useShare.js";

const FORM_HASH = "#questionnaire";
const inForm = () => window.location.hash === FORM_HASH;

/* Trois vues : accueil → formulaire (#questionnaire) → remerciement.
   Le bouton « retour » du navigateur ramène du formulaire à l'accueil. */
export default function App() {
  const [view, setView] = useState(inForm() ? "form" : "home");
  const [answers, setAnswers] = useState({}); // conservées si l'on revient à l'accueil
  const toast = useToast();
  const { copyLink, share } = useShare(toast.show);

  useEffect(() => {
    const onHash = () => setView((v) => (v === "thanks" ? v : inForm() ? "form" : "home"));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const onAnswer = useCallback((name, value) => setAnswers((a) => ({ ...a, [name]: value })), []);

  // depuis la page de remerciement : on repart de zéro (nouvelles réponses, nouvel identifiant d'envoi)
  const onHome = () => {
    setAnswers({});
    setView("home");
    if (window.location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <>
      <main>
        {view === "home" && <Hero />}
        {view === "form" && (
          <SurveyForm answers={answers} onAnswer={onAnswer} onSubmitted={() => setView("thanks")} toast={toast.show} />
        )}
        {view === "thanks" && <ThankYou onCopy={copyLink} onShare={share} onHome={onHome} />}
      </main>
      <div className={`toast${toast.visible ? " show" : ""}`} role="status" aria-live="polite">{toast.message}</div>
    </>
  );
}
