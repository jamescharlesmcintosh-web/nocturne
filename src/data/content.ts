export type Project = {
  id: string
  index: string
  title: string
  kind: string
  client: string
  year: string
  accent: string
  disciplines: string[]
  art: 'heliotrope' | 'vesper' | 'cadence' | 'threshold'
}

export const projects: Project[] = [
  {
    id: 'heliotrope',
    index: '01',
    title: 'Heliotrope',
    kind: 'Kinetic identity system',
    client: 'Maison Solène',
    year: '2025',
    accent: '#F2A65A',
    disciplines: ['Direction', 'WebGL', 'Sound'],
    art: 'heliotrope',
  },
  {
    id: 'vesper',
    index: '02',
    title: 'Vesper',
    kind: 'Flagship commerce experience',
    client: 'Atelier Voss',
    year: '2024',
    accent: '#7EB6FF',
    disciplines: ['Design', 'Engineering', 'Motion'],
    art: 'vesper',
  },
  {
    id: 'cadence',
    index: '03',
    title: 'Cadence',
    kind: 'Opening title sequence',
    client: 'Meridian Film Festival',
    year: '2024',
    accent: '#E4D7BE',
    disciplines: ['Type', 'Motion', 'Code'],
    art: 'cadence',
  },
  {
    id: 'threshold',
    index: '04',
    title: 'Threshold',
    kind: 'Immersive product launch',
    client: 'Aurea',
    year: '2023',
    accent: '#C97B4A',
    disciplines: ['Spatial', 'Interaction', 'Build'],
    art: 'threshold',
  },
]

export const practice = [
  {
    n: '01',
    title: 'Direction',
    lead: 'Concept, narrative, art direction, motion language.',
    detail:
      'We settle the idea before the interface — the single mechanic a project will be remembered by, and the rules everything else obeys.',
  },
  {
    n: '02',
    title: 'Design',
    lead: 'Interface systems, typography, spatial layout, prototypes.',
    detail:
      'Layouts are composed, never assembled from parts. Type carries the hierarchy; ornament stays out of the way.',
  },
  {
    n: '03',
    title: 'Engineering',
    lead: 'WebGL, animation architecture, performance budgets.',
    detail:
      'Sixty frames is the floor, not the goal. We build to a budget and measure on mid-tier hardware, not on our own machines.',
  },
  {
    n: '04',
    title: 'Motion',
    lead: 'Choreography, physics, scroll cinematics, sound.',
    detail:
      'Movement is staged like film — entrance, hold, exit. Nothing moves because it was easy to animate.',
  },
]

export const recognition = [
  { year: '2025', body: 'Awwwards', detail: 'Site of the Day', project: 'Heliotrope' },
  { year: '2025', body: 'The FWA', detail: 'Site of the Day', project: 'Heliotrope' },
  { year: '2024', body: 'CSS Design Awards', detail: 'Best UI Design', project: 'Vesper' },
  { year: '2024', body: 'Type Directors Club', detail: 'Certificate of Typographic Excellence', project: 'Cadence' },
  { year: '2023', body: 'D&AD', detail: 'Wood Pencil — Digital Design', project: 'Threshold' },
  { year: '2022', body: 'The Webby Awards', detail: 'Honoree — Experimental & Innovation', project: 'Nocturne Archive' },
]

export const sections = [
  { id: 'prologue', label: 'Prologue', accent: '#F2A65A' },
  { id: 'manifesto', label: 'Manifesto', accent: '#E7D9BE' },
  { id: 'work', label: 'Selected Work', accent: '#7EB6FF' },
  { id: 'practice', label: 'Practice', accent: '#C97B4A' },
  { id: 'index', label: 'Index', accent: '#E4D7BE' },
  { id: 'contact', label: 'Contact', accent: '#F2A65A' },
]
