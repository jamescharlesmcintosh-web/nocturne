import { scrollToTarget } from '../lib/scroll'

const links = [
  { id: 'manifesto', n: '01', label: 'Manifesto' },
  { id: 'work', n: '02', label: 'Work' },
  { id: 'practice', n: '03', label: 'Practice' },
  { id: 'index', n: '04', label: 'Index' },
]

export default function Nav() {
  return (
    <header className="nav">
      <a
        className="nav__brand"
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          scrollToTarget(0)
        }}
      >
        <span className="nav__mark" />
        Nocturne
      </a>

      <nav className="nav__links" aria-label="Primary">
        {links.map((l) => (
          <a
            key={l.id}
            className="nav__link"
            data-nav-link={l.id}
            href={`#${l.id}`}
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById(l.id)
              if (el) scrollToTarget(el, { offset: -40 })
            }}
          >
            <span>{l.n}</span>
            {l.label}
          </a>
        ))}
      </nav>

      <a
        className="nav__cta"
        data-nav-cta
        href="#contact"
        onClick={(e) => {
          e.preventDefault()
          const el = document.getElementById('contact')
          if (el) scrollToTarget(el)
        }}
      >
        Start a project
      </a>
    </header>
  )
}
