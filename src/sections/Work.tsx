import { useRef, useState } from 'react'
import ProjectArt from '../components/Art'
import { Fade, Reveal, Rule } from '../components/Reveal'
import { projects } from '../data/content'
import { useCoarsePointer } from '../lib/hooks'
import { setAccent } from '../lib/scroll'

const BASE_ACCENT = '#7EB6FF'

export default function Work() {
  const [open, setOpen] = useState<string | null>(null)
  const leaveTimer = useRef<number | null>(null)
  const coarse = useCoarsePointer()

  const enter = (accent: string, id: string) => {
    if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
    setAccent(accent)
    setOpen(id)
  }

  const leave = () => {
    if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
    leaveTimer.current = window.setTimeout(() => {
      setAccent(BASE_ACCENT)
      setOpen(null)
    }, 90)
  }

  const toggle = (accent: string, id: string) => {
    if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
    if (open === id) {
      setOpen(null)
      setAccent(BASE_ACCENT)
    } else {
      setOpen(id)
      setAccent(accent)
    }
  }

  return (
    <section
      className="section work"
      id="work"
      data-scene="work"
      data-label="Selected Work"
      data-rail-n="02"
      data-accent="#7EB6FF"
    >
      <div className="container">
        <div className="sec-head">
          <p className="t-label t-label--accent">02 / Selected Work</p>
          <p className="t-label">2023 — 2025 · Four of eleven</p>
        </div>
        <Rule />

        <div style={{ paddingTop: 'clamp(34px, 6vh, 70px)' }}>
          <Reveal as="h2" className="t-h2" lines={['Work that', 'holds the room.']} />
        </div>

        <div className="work__list" style={{ marginTop: 'clamp(34px, 6vh, 68px)' }}>
          {projects.map((p, i) => (
            <Fade key={p.id} delay={i * 80}>
              <button
                type="button"
                className={`work-row ${open === p.id ? 'is-open' : ''}`}
                style={{ ['--row-accent' as string]: p.accent }}
                aria-expanded={open === p.id}
                onMouseEnter={coarse ? undefined : () => enter(p.accent, p.id)}
                onMouseLeave={coarse ? undefined : leave}
                onFocus={coarse ? undefined : () => enter(p.accent, p.id)}
                onBlur={coarse ? undefined : leave}
                onClick={(e) => {
                  if (coarse) toggle(p.accent, p.id)
                  else e.preventDefault()
                }}
              >
                <span className="work-row__art">
                  <ProjectArt project={p} />
                </span>
                <span className="work-row__scrim" />
                <span className="work-row__inner">
                  <span className="work-row__n">{p.index}</span>
                  <span className="work-row__title">
                    {p.title}
                    <span className="work-row__kind">{p.kind}</span>
                  </span>
                  <span className="work-row__meta">
                    <span className="work-row__client">{p.client}</span>
                    <span className="work-row__tags">
                      {p.disciplines.map((d) => (
                        <span className="work-row__tag" key={d}>
                          {d}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="work-row__year">{p.year}</span>
                </span>
              </button>
            </Fade>
          ))}
        </div>

        <div className="work__foot">
          <Fade>
            <p className="t-label">Full case studies available on request</p>
          </Fade>
          <Fade delay={120}>
            <p className="t-label">Hover a piece — the room re-lights</p>
          </Fade>
        </div>
      </div>
    </section>
  )
}
