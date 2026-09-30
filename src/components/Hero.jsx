export default function Hero() {
  return (
    <section className="hero" aria-labelledby="title">
      <div className="container hero-inner">
        <h1 id="title" className="hero-title">
          <span className="line">Stoppons le vol</span>
          <span className="line"><span className="outline">c<span className="apos">’</span>est un crime</span><span className="dot" aria-hidden="true" /></span>
        </h1>
        {/* Contour tracé autour de la forme pleine des lettres : -webkit-text-stroke fait apparaître
            les tracés qui se croisent à l'intérieur de N, M et R dans Plus Jakarta Sans.
            Trait centré sur le bord (moitié dehors, moitié dedans), comme un text-stroke.
            Une épaisseur par palier, suivant la taille du titre (voir styles.css). */}
        <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
          {[["1", 0.6], ["2", 1], ["3", 1.5], ["4", 2]].map(([id, w]) => (
            <filter id={`hero-outline-${id}`} key={id}>
              <feMorphology in="SourceAlpha" operator="dilate" radius={w / 2} result="grown" />
              <feMorphology in="SourceAlpha" operator="erode" radius={w / 2} result="shrunk" />
              <feComposite in="grown" in2="shrunk" operator="out" result="ring" />
              <feFlood floodColor="#FECACA" />
              <feComposite in2="ring" operator="in" />
            </filter>
          ))}
        </svg>
        <div className="hero-visual">
          <img
            className="hero-illu"
            src="/hero-rouge-hd.png"
            alt="Un homme menotté, en larmes, les poings serrés."
            width="600"
            height="698"
          />
          <a className="btn btn-light btn-start" href="#questionnaire">
            Participer <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
