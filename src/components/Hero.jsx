export default function Hero() {
  return (
    <section className="hero" aria-labelledby="title">
      <div className="container hero-inner">
        <h1 id="title" className="hero-title">
          <span className="line">Stoppons le vol</span>
          <span className="line"><span className="outline">c<span className="apos">’</span>est un crime</span><span className="dot" aria-hidden="true" /></span>
        </h1>
        {/* Le contour de « c'est un crime » est un -webkit-text-stroke de la
            MÊME couleur que le remplissage (styles.css) : les tracés internes
            dans N/M/R sont invisibles, et le rendu est le même partout —
            y compris Safari iOS qui rend mal les filtres SVG url(). */}
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
