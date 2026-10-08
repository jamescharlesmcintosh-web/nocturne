import { useEffect, useState } from 'react'
import { Fade, Reveal, Rule } from '../components/Reveal'

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

export default function Contact() {
  return (
    <section
      className="section contact"
      id="contact"
      data-scene="contact"
      data-label="Contact"
      data-rail-n="05"
      data-accent="#F2A65A"
    >
      <div className="container">
        <div className="sec-head">
          <p className="t-label t-label--accent">05 / Contact</p>
          <p className="t-label">Two engagements open — Q3 2026</p>
        </div>
        <Rule />

        <div className="contact__grid" style={{ paddingTop: 'clamp(36px, 6vh, 76px)' }}>
          <div>
            <Reveal
              as="h2"
              className="contact__title"
              lines={["Let's make something", 'that lingers.']}
            />
            <Fade delay={300}>
              <a className="contact__email" href="mailto:studio@nocturne.design">
                studio@nocturne.design
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </Fade>
          </div>

          <div className="contact__side">
            <Fade delay={160}>
              <div className="contact__block">
                <p className="t-label">Availability</p>
                <p>
                  Taking two projects for Q3 2026. Brand sites, product launches, and title work
                  with a real idea behind them.
                </p>
              </div>
            </Fade>
            <Fade delay={260}>
              <div className="contact__block">
                <p className="t-label">London</p>
                <p>
                  14 Rivington Street
                  <br />
                  Shoreditch, EC2A 3DU
                </p>
              </div>
            </Fade>
            <Fade delay={340}>
              <div className="contact__block">
                <p className="t-label">Kyoto</p>
                <p>
                  Nakagyō-ku, Tominokōji
                  <br />
                  604-8081
                </p>
              </div>
            </Fade>
            <Fade delay={420}>
              <div className="contact__block">
                <p className="t-label">Elsewhere</p>
                <div className="socials">
                  <a href="#index" onClick={(e) => e.preventDefault()}>
                    Instagram
                  </a>
                  <a href="#index" onClick={(e) => e.preventDefault()}>
                    Are.na
                  </a>
                  <a href="#index" onClick={(e) => e.preventDefault()}>
                    Vimeo
                  </a>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const now = useClock()
  const time = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Europe/London',
  })

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__meta">
          <span>© 2026 Nocturne Studio Ltd</span>
          <span>London / Kyoto</span>
          <span>Local {time}</span>
        </div>
        <div className="footer__meta">
          <span>Company No. 10284417</span>
          <a className="footer__top" href="#top">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
