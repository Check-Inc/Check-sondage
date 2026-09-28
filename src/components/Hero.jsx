export default function Hero() {
  return (
    <section className="hero" aria-labelledby="title">
      <div className="container hero-inner">
        <h1 id="title" className="hero-title">
          <span className="line">Stoppons le vol</span>
          <span className="line">c<span className="apos">’</span>est un crime<span className="dot" aria-hidden="true" /></span>
        </h1>
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
