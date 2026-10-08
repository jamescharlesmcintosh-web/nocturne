import { chromium } from 'playwright'

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
const page = await ctx.newPage()
page.on('console', (m) => { if (m.type() === 'error') console.log('ERR', m.text()) })

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(4500)

const info = await page.evaluate(() => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  const sections = [...document.querySelectorAll('[data-scene], [data-gate]')].map((el) => {
    const r = el.getBoundingClientRect()
    return {
      name: el.getAttribute('data-scene') || el.getAttribute('data-gate') || 'gate',
      top: Math.round(r.top + window.scrollY),
      height: Math.round(el.offsetHeight),
      bottom: Math.round(r.top + window.scrollY + el.offsetHeight),
      topPct: +(((r.top + window.scrollY) / max) * 100).toFixed(1),
      visible: r.bottom > 0 && r.top < window.innerHeight,
    }
  })
  return { max, scrollHeight: document.documentElement.scrollHeight, vh: window.innerHeight, sections, scrollY: window.scrollY }
})
console.log(JSON.stringify(info, null, 2))

const stops = [0, 0.08, 0.16, 0.26, 0.34, 0.42, 0.52, 0.62, 0.74, 0.86, 1]
for (const s of stops.slice(1)) {
  const y = Math.round(info.max * s)
  await page.evaluate((yy) => {
    if (window.__scrollTo) window.__scrollTo(yy)
    else window.scrollTo(0, yy)
    window.dispatchEvent(new Event('scroll'))
  }, y)
  await page.waitForTimeout(400)
  const sample = await page.evaluate(() => {
    const els = [...document.querySelectorAll('[data-scene]')]
    const active = els.find((el) => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight * 0.55 && r.bottom > window.innerHeight * 0.55
    })
    const inView = els.filter((el) => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight && r.bottom > 0
    }).map((el) => ({
      scene: el.getAttribute('data-scene'),
      top: Math.round(el.getBoundingClientRect().top),
      bottom: Math.round(el.getBoundingClientRect().top + el.offsetHeight),
    }))
    const gate = document.querySelector('[data-gate]')
    const gr = gate?.getBoundingClientRect()
    return {
      scrollY: Math.round(window.scrollY),
      lenisY: Math.round(window.scrollY),
      activeScene: active?.getAttribute('data-scene') ?? null,
      railIndex: document.querySelector('[data-rail-index]')?.textContent ?? null,
      railLabel: document.querySelector('[data-rail-label]')?.textContent ?? null,
      navActive: [...document.querySelectorAll('[data-nav-link].is-active')].map((a) => a.getAttribute('data-nav-link')),
      ctaActive: document.querySelector('[data-nav-cta]')?.classList.contains('is-active') ?? null,
      inView,
      gate: gr ? { top: Math.round(gr.top), bottom: Math.round(gr.bottom), g: gate.style.getPropertyValue('--g'), gv: gate.style.getPropertyValue('--gv') } : null,
      workOpacity: (() => {
        const row = document.querySelector('.work-row')
        if (!row) return null
        const fade = row.closest('[style*="opacity"], .reveal, [data-reveal]') || row
        return getComputedStyle(fade).opacity
      })(),
      h2Opacity: (() => {
        const h2 = document.querySelector('.work .t-h2')
        return h2 ? getComputedStyle(h2).opacity : null
      })(),
    }
  })
  console.log(`p${Math.round(s * 100)}`, JSON.stringify(sample))
}

await browser.close()
