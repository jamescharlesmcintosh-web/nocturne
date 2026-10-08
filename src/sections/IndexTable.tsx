import { Fade, Reveal, Rule } from '../components/Reveal'
import { recognition } from '../data/content'

export default function IndexTable() {
  return (
    <section
      className="section indexsec"
      id="index"
      data-scene="index"
      data-label="Index"
      data-rail-n="04"
      data-accent="#E4D7BE"
    >
      <div className="container">
        <div className="sec-head">
          <p className="t-label t-label--accent">04 / Index</p>
          <p className="t-label">Recognition, kept short</p>
        </div>
        <Rule />

        <div style={{ paddingTop: 'clamp(34px, 6vh, 70px)', paddingBottom: 'clamp(28px, 5vh, 56px)' }}>
          <Reveal as="h2" className="t-h2" lines={['Kept in', 'proportion.']} />
        </div>

        <div className="index__table">
          {recognition.map((r, i) => (
            <Fade key={`${r.year}-${r.body}`} delay={i * 70}>
              <div className="index-row">
                <span className="index-row__year">{r.year}</span>
                <span className="index-row__body">{r.body}</span>
                <span className="index-row__detail">{r.detail}</span>
                <span className="index-row__project">{r.project}</span>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  )
}
