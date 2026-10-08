import type { CSSProperties } from 'react'

const WORD = 'NOCTURNE'

export default function Hero() {
  return (
    <section
      className="hero section"
      id="top"
      data-scene="prologue"
      data-label="Prologue"
      data-rail-n="00"
      data-accent="#F2A65A"
    >
      <div className="container hero__top">
        <p className="t-label">Independent digital experience studio</p>
        <p className="t-label">Est. 2016 — London / Kyoto</p>
      </div>

      <div className="container hero__mid">
        <h1 className="hero__word" aria-label="Nocturne">
          {WORD.split('').map((ch, i) => (
            <span
              className="hero__letter"
              key={i}
              aria-hidden="true"
              style={{ '--i': i } as CSSProperties}
            >
              <i>{ch}</i>
            </span>
          ))}
        </h1>
      </div>

      <div className="container hero__bottom">
        <div className="hero__cue">
          <span className="t-label">Scroll</span>
          <span className="hero__cue-line" />
          <span className="t-label">00 — Prologue</span>
        </div>

        <div className="hero__desc">
          <p className="t-body" style={{ color: 'rgba(236,229,217,.78)' }}>
            We direct and build interactive work for brands that intend to be remembered —
            spatial, deliberate, and lit with intent.
          </p>
        </div>
      </div>
    </section>
  )
}
