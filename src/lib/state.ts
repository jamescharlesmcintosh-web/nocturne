export type Bounds = {
  manifesto: number
  gateStart: number
  gateEnd: number
  work: number
  practice: number
  index: number
  contact: number
}

export const state = {
  p: 0,
  pointerX: 0,
  pointerY: 0,
  sx: 0,
  sy: 0,
  reveal: 0,
  loaded: false,
  reduced: false,
  coarse: false,
  bounds: {
    manifesto: 0.12,
    gateStart: 0.24,
    gateEnd: 0.34,
    work: 0.4,
    practice: 0.55,
    index: 0.68,
    contact: 0.84,
  } as Bounds,
}

export const accent = { r: 242, g: 166, b: 90 }

export function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

export function smoothstep(a: number, b: number, x: number) {
  const t = clamp01((x - a) / (b - a || 1e-6))
  return t * t * (3 - 2 * t)
}

export function track(p: number, keys: [number, number][]) {
  if (p <= keys[0][0]) return keys[0][1]
  const last = keys[keys.length - 1]
  if (p >= last[0]) return last[1]
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i]
    const b = keys[i + 1]
    if (p >= a[0] && p <= b[0]) {
      const k = b[0] === a[0] ? 1 : (p - a[0]) / (b[0] - a[0])
      const e = k * k * (3 - 2 * k)
      return a[1] + (b[1] - a[1]) * e
    }
  }
  return last[1]
}
