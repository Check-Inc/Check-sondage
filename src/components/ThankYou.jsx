import { useEffect, useRef } from "react";
import { WHATSAPP_CHANNEL_URL } from "../config.js";

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
            <a className="btn btn-whatsapp" href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.99 6.68 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.04.7C5.77.7.67 5.8.67 12.07c0 2 .52 3.96 1.52 5.68L.57 23.7l6.08-1.6a11.33 11.33 0 0 0 5.39 1.37h.01c6.26 0 11.36-5.1 11.37-11.37 0-3.04-1.18-5.89-3.34-8.04z" />
              </svg>
              Nous rejoindre
              <span className="sr-only"> sur la chaîne WhatsApp (nouvel onglet)</span>
            </a>
          </div>
          <button type="button" className="thanks-home btn-prev" onClick={onHome}>
            <span className="arrow" aria-hidden="true">←</span> Retour à l'accueil
          </button>
        </div>
      </div>
    </section>
  );
}
