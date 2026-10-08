import { useCallback, useEffect, useState } from 'react'
import Cursor from './components/Cursor'
import { Grain, Letterbox, Rail } from './components/Chrome'
import Loader from './components/Loader'
import MonolithCanvas from './components/Monolith'
import Nav from './components/Nav'
import { useCoarsePointer, usePrefersReducedMotion } from './lib/hooks'
import { initScroll, setAccent, startScroll, stopScroll } from './lib/scroll'
import { state } from './lib/state'
import Contact, { Footer } from './sections/Contact'
import Gate from './sections/Gate'
import Hero from './sections/Hero'
import IndexTable from './sections/IndexTable'
import Manifesto from './sections/Manifesto'
import Practice from './sections/Practice'
import Work from './sections/Work'

export default function App() {
  const reduced = usePrefersReducedMotion()
  const coarse = useCoarsePointer()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    state.reduced = reduced
    state.coarse = coarse
  }, [reduced, coarse])

  useEffect(() => {
    const cleanup = initScroll(reduced)
    stopScroll()
    return cleanup
  }, [reduced])

  const onLoaded = useCallback(() => {
    setReady(true)
    state.loaded = true
    document.body.classList.add('is-loaded')
    startScroll()
    setAccent('#F2A65A')
  }, [])

  useEffect(() => {
    if (!ready) return
    let raf = 0
    const loop = () => {
      state.reveal += (1 - state.reveal) * 0.05
      if (state.reveal > 0.999) state.reveal = 1
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [ready])

  return (
    <>
      <Loader onDone={onLoaded} />
      <MonolithCanvas reduced={reduced} />
      <Letterbox />
      <Nav />
      <Rail />
      <Cursor enabled={!coarse && !reduced} />
      <Grain />

      <main>
        <Hero />
        <Manifesto />
        <Gate />
        <Work />
        <Practice />
        <IndexTable />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
