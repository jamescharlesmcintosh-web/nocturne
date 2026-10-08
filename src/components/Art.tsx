import type { Project } from '../data/content'

function Heliotrope() {
  const rings = Array.from({ length: 9 }, (_, i) => 34 + i * 36)
  return (
    <svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id="h-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F2A65A" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#F2A65A" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#F2A65A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="340" fill="#08070b" />
      <circle cx="640" cy="170" r="300" fill="url(#h-glow)" />
      <g transform="translate(640 170)" fill="none" stroke="#F2A65A" strokeWidth="1">
        {rings.map((r, i) => (
          <circle
            key={r}
            r={r}
            strokeOpacity={0.55 - i * 0.045}
            strokeDasharray={i % 2 ? '3 9' : 'none'}
            style={{ animation: `spin ${40 + i * 14}s linear infinite`, transformOrigin: 'center' }}
            transform={`rotate(${i * 7})`}
          />
        ))}
      </g>
      <g transform="translate(640 170)" stroke="#FFE9CF" strokeWidth="1.2" strokeOpacity="0.7">
        <line x1="-420" y1="0" x2="420" y2="0" />
        <line x1="0" y1="-170" x2="0" y2="170" />
      </g>
      <circle cx="640" cy="170" r="6" fill="#FFE9CF" />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </svg>
  )
}

function Vesper() {
  const bars = Array.from({ length: 46 }, (_, i) => i)
  return (
    <svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id="v-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1424" />
          <stop offset="100%" stopColor="#07070b" />
        </linearGradient>
        <linearGradient id="v-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7EB6FF" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#7EB6FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1200" height="340" fill="url(#v-sky)" />
      <g>
        {bars.map((i) => {
          const x = 20 + i * 26
          const h = 90 + Math.abs(Math.sin(i * 0.7)) * 220
          return (
            <rect
              key={i}
              x={x}
              y={0}
              width={i % 3 === 0 ? 7 : 3}
              height={h}
              fill="url(#v-beam)"
              opacity={0.35 + (i % 5) * 0.12}
              style={{
                animation: `beam ${4.4 + (i % 7) * 0.5}s ease-in-out ${i * 0.06}s infinite alternate`,
                transformOrigin: 'top',
              }}
            />
          )
        })}
      </g>
      <line x1="0" y1="256" x2="1200" y2="256" stroke="#7EB6FF" strokeOpacity="0.5" strokeWidth="1" />
      <style>{`@keyframes beam{from{transform:scaleY(.72)}to{transform:scaleY(1.06)}}`}</style>
    </svg>
  )
}

function Cadence() {
  const bars = Array.from({ length: 74 }, (_, i) => i)
  return (
    <svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="1200" height="340" fill="#08080a" />
      <g>
        {bars.map((i) => {
          const x = 16 + i * 16
          const base = Math.abs(Math.sin(i * 0.34) * Math.cos(i * 0.11))
          const h = 16 + base * 240
          return (
            <rect
              key={i}
              x={x}
              y={170 - h / 2}
              width={6}
              height={h}
              fill="#E4D7BE"
              opacity={0.2 + base * 0.7}
              style={{
                animation: `cad ${1.9 + (i % 9) * 0.18}s ease-in-out ${i * 0.035}s infinite alternate`,
                transformOrigin: 'center',
              }}
            />
          )
        })}
      </g>
      <line x1="0" y1="170" x2="1200" y2="170" stroke="#E4D7BE" strokeOpacity="0.35" />
      <style>{`@keyframes cad{from{transform:scaleY(.38)}to{transform:scaleY(1.12)}}`}</style>
    </svg>
  )
}

function Threshold() {
  return (
    <svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id="t-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0f0a" />
          <stop offset="70%" stopColor="#0a0709" />
          <stop offset="100%" stopColor="#070709" />
        </linearGradient>
        <linearGradient id="t-slab" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2a1a12" />
          <stop offset="50%" stopColor="#0c0a0b" />
          <stop offset="100%" stopColor="#C97B4A" />
        </linearGradient>
      </defs>
      <rect width="1200" height="340" fill="url(#t-sky)" />
      <rect x="0" y="248" width="1200" height="1" fill="#C97B4A" fillOpacity="0.55" />
      <g style={{ animation: 'rise 7s cubic-bezier(.16,1,.3,1) infinite alternate' }}>
        <rect x="558" y="70" width="84" height="178" fill="url(#t-slab)" />
        <rect x="558" y="70" width="84" height="178" fill="none" stroke="#C97B4A" strokeOpacity="0.7" />
        <rect x="642" y="70" width="2" height="178" fill="#FFD9B5" fillOpacity="0.9" />
      </g>
      <g opacity="0.35" transform="translate(0 496) scale(1 -1)">
        <rect x="558" y="70" width="84" height="178" fill="url(#t-slab)" />
      </g>
      <g stroke="#C97B4A" strokeOpacity="0.28">
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={0} y1={268 + i * 6} x2={1200} y2={268 + i * 6} />
        ))}
      </g>
      <style>{`@keyframes rise{from{transform:translateY(26px)}to{transform:translateY(-14px)}}`}</style>
    </svg>
  )
}

export default function ProjectArt({ project }: { project: Project }) {
  switch (project.art) {
    case 'heliotrope':
      return <Heliotrope />
    case 'vesper':
      return <Vesper />
    case 'cadence':
      return <Cadence />
    default:
      return <Threshold />
  }
}
