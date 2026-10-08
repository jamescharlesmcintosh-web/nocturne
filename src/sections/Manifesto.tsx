import { useEffect, useRef } from 'react'
import { Fade, Reveal, Rule } from '../components/Reveal'
import { useCoarsePointer, usePrefersReducedMotion } from '../lib/hooks'

export default function Manifesto() {
  const line = useRef<HTMLParagraphElement>(null)
  const coarse = useCoarsePointer()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = line.current
    if (!el) return

    if (coarse || reduced) {
      let raf = 0
      const loop = () => {
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        const t = Math.min(1, Math.max(0, (vh * 0.86 - r.top) / (vh * 0.55)))
        el.style.setProperty('--spot-x', `${(8 + t * 84).toFixed(2)}%`)
        el.style.setProperty('--spot-y', '50%')
        el.style.setProperty('--spot-r', '150px')
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      return () => cancelAnimationFrame(raf)
    }

    let tx = 40
    let ty = 50
    let cx = 40
    let cy = 50
    let raf = 0

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx = ((e.clientX - r.left) / Math.max(1, r.width)) * 100
      ty = ((e.clientY - r.top) / Math.max(1, r.height)) * 100
    }

    const loop = () => {
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      el.style.setProperty('--spot-x', `${cx.toFixed(2)}%`)
      el.style.setProperty('--spot-y', `${cy.toFixed(2)}%`)
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [coarse, reduced])

  return (
    <section
      className="section manifesto"
      id="manifesto"
      data-scene="manifesto"
      data-label="Manifesto"
      data-rail-n="01"
      data-accent="#E7D9BE"
    >
      <div className="container">
        <div className="sec-head">
          <p className="t-label t-label--accent">01 / Manifesto</p>
          <p className="t-label">Light · Structure · Restraint</p>
        </div>
        <Rule />

        <div className="manifesto__grid" style={{ paddingTop: 'clamp(36px, 6vh, 76px)' }}>
          <div className="manifesto__col">
            <Reveal
              as="h2"
              className="t-h2"
              lines={['Light is the only', 'interface that', 'matters.']}
            />
            <Fade delay={220}>
              <p className="t-body">
                Every screen is a lamp in a dark room. We treat digital work as architecture —
                measured, physical, and lit with intent.
              </p>
            </Fade>
            <Fade delay={340}>
              <div className="manifesto__meta">
                <div className="manifesto__meta-row">
                  <span>Founded</span>
                  <b>2016</b>
                </div>
                <div className="manifesto__meta-row">
                  <span>Studio</span>
                  <b>London / Kyoto</b>
                </div>
                <div className="manifesto__meta-row">
                  <span>Team</span>
                  <b>Nine, deliberately</b>
                </div>
              </div>
            </Fade>
          </div>

          <div className="manifesto__blade" aria-hidden="true" />

          <div className="manifesto__col manifesto__col--r">
            <Fade delay={140}>
              <p className="t-body">
                No templates, no defaults. Each project begins as a spatial problem: what should
                someone feel in the first second, and what should they still be turning over an
                hour later?
              </p>
            </Fade>

            <Fade delay={300}>
              <p className="spot-line" ref={line}>
                <span className="spot-line__base">
                  Darkness is not the absence of design. It is the condition for it.
                </span>
                <span className="spot-line__lit" aria-hidden="true">
                  Darkness is not the absence of design. It is the condition for it.
                </span>
              </p>
            </Fade>

            <Fade delay={420}>
              <p className="t-label" style={{ maxWidth: '34ch', lineHeight: 1.9 }}>
                Move your light across the line above
              </p>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  )
}
