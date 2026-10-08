import { Fade, Reveal, Rule } from '../components/Reveal'
import { practice } from '../data/content'

export default function Practice() {
  return (
    <section
      className="section practice"
      id="practice"
      data-scene="practice"
      data-label="Practice"
      data-rail-n="03"
      data-accent="#C97B4A"
    >
      <div className="container">
        <div className="sec-head">
          <p className="t-label t-label--accent">03 / Practice</p>
          <p className="t-label">How the work gets made</p>
        </div>
        <Rule />

        <div className="practice__grid" style={{ paddingTop: 'clamp(36px, 6vh, 76px)' }}>
          <aside className="practice__aside">
            <Reveal as="h2" className="t-h2" lines={['Four disciplines,', 'one standard.']} />
            <Fade delay={260}>
              <p className="t-body">
                One team carries a project from the first sentence to the last frame. Nothing is
                thrown over a wall, so nothing gets softened on the way through.
              </p>
            </Fade>
            <Fade delay={380}>
              <p className="t-label" style={{ lineHeight: 2 }}>
                Typical engagement — 10 to 18 weeks
              </p>
            </Fade>
          </aside>

          <div className="practice__list">
            {practice.map((item, i) => (
              <Fade key={item.n} delay={i * 90}>
                <article className="practice-item" tabIndex={0}>
                  <span className="practice-item__n">{item.n}</span>
                  <div>
                    <h3 className="practice-item__title">{item.title}</h3>
                    <p className="practice-item__lead">{item.lead}</p>
                    <div className="practice-item__detail">
                      <p>{item.detail}</p>
                    </div>
                  </div>
                </article>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
