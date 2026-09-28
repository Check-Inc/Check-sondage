import { useEffect, useRef } from "react";

export default function ThankYou({ onCopy, onShare, onHome }) {
  const titleRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    titleRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section className="thanks" id="thanks">
      <div className="container">
        <div className="thanks-card">
          <div className="stamp" aria-hidden="true">
            Dossier transmis<small>{new Date().toLocaleDateString("fr-FR")}</small>
          </div>
          <h2 tabIndex={-1} ref={titleRef}>Merci pour votre franchise.</h2>
          <p>
            Vos réponses aident à mieux comprendre ce que vivent les familles face au vol et à la perte de biens en Côte
            d'Ivoire. Vous pouvez partager ce sondage autour de vous pour qu'on entende plus de voix.
          </p>
          <div className="thanks-actions">
            <button type="button" className="btn btn-secondary" onClick={onCopy}>Copier le lien</button>
            <button type="button" className="btn btn-primary" onClick={onShare}>
              Partager <span className="arrow" aria-hidden="true">→</span>
            </button>
          </div>
          <button type="button" className="thanks-home btn-prev" onClick={onHome}>
            <span className="arrow" aria-hidden="true">←</span> Retour à l'accueil
          </button>
        </div>
      </div>
    </section>
  );
}
