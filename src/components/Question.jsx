import { TOTAL } from "../data/questions.js";

const pad = (n) => String(n).padStart(2, "0");
const SCALE = ["1", "2", "3", "4", "5"];

export function isAnswered(q, value) {
  if (q.type === "multi") return Array.isArray(value) && value.length > 0;
  return typeof value === "string" && value.trim() !== "";
}

/* Une question : titre numéroté + champ adapté à son type */
export default function Question({ q, value, onChange }) {
  const id = `q${q.n}`;
  const hintId = q.hint ? `${id}-hint` : undefined;
  const legendId = q.type === "scale" ? `${id}-legend` : undefined;
  const className = `q${isAnswered(q, value) ? " answered" : ""}${q.showIf ? " reveal" : ""}`;

  const head = (
    <>
      <span className="q-no" aria-hidden="true">{pad(q.n)}</span>
      <span>
        <span className="sr-only">Question {q.n} sur {TOTAL} : </span>
        {q.label}
        {q.optional && <> <span className="q-opt">Facultatif</span></>}
      </span>
    </>
  );
  const hint = q.hint && <p className="q-hint" id={hintId}>{q.hint}</p>;

  if (q.type === "short" || q.type === "long") {
    const Field = q.type === "long" ? "textarea" : "input";
    return (
      <div className={className}>
        <label className="q-title" htmlFor={`${id}-f`}>{head}</label>
        {hint}
        <Field
          className="field"
          id={`${id}-f`}
          name={q.name}
          type={q.type === "short" ? "text" : undefined}
          rows={q.type === "long" ? 4 : undefined}
          placeholder={q.placeholder || "Votre réponse…"}
          autoComplete={q.autoComplete}
          aria-describedby={hintId}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  const multi = q.type === "multi";
  const options = q.type === "scale" ? SCALE.map((v) => [v, v]) : q.options;
  const selected = q.type === "scale" ? Number(value || 0) : 0;

  const toggle = (v, checked) => {
    if (!multi) return onChange(v);
    const list = Array.isArray(value) ? value : [];
    onChange(checked ? [...list, v] : list.filter((x) => x !== v));
  };

  const items = options.map(([v, label], k) => (
    <label key={v} className={`opt${q.type === "scale" && k + 1 < selected ? " lit" : ""}`}>
      <input
        type={multi ? "checkbox" : "radio"}
        name={q.name}
        value={v}
        checked={multi ? (value || []).includes(v) : value === v}
        onChange={(e) => toggle(v, e.target.checked)}
      />
      <span className="opt-box">
        {q.type !== "scale" && <span className="mark" aria-hidden="true" />}
        <span>{label}</span>
      </span>
    </label>
  ));

  return (
    <fieldset className={className} aria-describedby={hintId || legendId}>
      <legend className="q-title">{head}</legend>
      {hint}
      {q.type === "scale" ? (
        <>
          <div className="scale">{items}</div>
          <div className="scale-legend" id={legendId}><span>{q.ends[0]}</span><span>{q.ends[1]}</span></div>
        </>
      ) : (
        <div className="opts">{items}</div>
      )}
    </fieldset>
  );
}
