import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import WatchFace from './WatchFace.jsx'
import StrapPicker from './StrapPicker.jsx'

gsap.registerPlugin(useGSAP)

export default function App() {
  const [isAlwaysOn, setIsAlwaysOn] = useState(false)
  const [selectedStrap, setSelectedStrap] = useState('orange')
  const studio = useRef(null)
  const intro = useRef(null)
  const ripple = useRef(null)

  useGSAP(() => {
    const motion = gsap.matchMedia()

    motion.add('(prefers-reduced-motion: no-preference)', () => {
      intro.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.studio__art', { scale: 0.55, rotation: -28, opacity: 0 }, {
          scale: 1, rotation: 0, opacity: 1, duration: 0.95,
          clearProps: 'transform,opacity',
        })
        .fromTo('.watch-face', { scale: 0.65, y: 22, opacity: 0 }, {
          scale: 1, y: 0, opacity: 1, duration: 0.82, ease: 'back.out(1.25)',
          clearProps: 'transform,opacity',
        }, 0.07)

      ripple.current = gsap.fromTo('.studio__pulse', { scale: 0.54, opacity: 0.9 }, {
        scale: 1.08, opacity: 0, duration: 0.65, ease: 'power2.out',
        paused: true, immediateRender: false,
      })

      return () => {
        intro.current = null
        ripple.current = null
      }
    }, studio)

    return () => motion.revert()
  }, { scope: studio })

  function toggleDisplay() {
    intro.current?.progress(1)
    setIsAlwaysOn((previous) => !previous)
    ripple.current?.restart()
  }

  function replayIntro() {
    setIsAlwaysOn(false)
    ripple.current?.progress(1).pause()
    intro.current?.restart()
  }

  return (
    <main ref={studio} className="studio" data-mode={isAlwaysOn ? 'always-on' : 'awake'} data-strap={selectedStrap}>
      <div className="studio__frame">
        <header className="studio__header">
          <h1>Watch Studio</h1>
          <button type="button" className="studio__replay" onClick={replayIntro}>
            Replay intro <span aria-hidden="true">↻</span>
          </button>
        </header>

        <div className="studio__stage">
          <div className="studio__art" aria-hidden="true">
            <div className="studio__ring studio__ring--outer" />
            <div className="studio__ring studio__ring--middle" />
            <div className="studio__ring studio__ring--ticks" />
            <div className="studio__sweep" />
            <div className="studio__orbit"><span /><span /></div>
            <div className="studio__bars">
              <span /><span /><span /><span /><span /><span /><span />
            </div>
            <div className="studio__scan" />
            <span className="studio__cross studio__cross--left">+</span>
            <span className="studio__cross studio__cross--right">+</span>
          </div>
          <div className="studio__pulse" aria-hidden="true" />
          <div className="watch-body">
            <span
              className="watch-body__strap watch-body__strap--top"
              aria-hidden="true"
            />
            <span
              className="watch-body__strap watch-body__strap--bottom"
              aria-hidden="true"
            />
            <span className="watch-body__case" aria-hidden="true" />
            <span className="watch-body__crown" aria-hidden="true" />

            <WatchFace
              isAlwaysOn={isAlwaysOn}
              onToggle={toggleDisplay}
            />
          </div>
        </div>

        <StrapPicker
          selectedStrap={selectedStrap}
          onSelect={setSelectedStrap}
        />

        <footer className="studio__footer">
          <output>{isAlwaysOn ? 'Always-on' : 'Awake'}</output>
          <span>{isAlwaysOn ? 'Tap the dial to wake it' : 'Tap the dial to dim it'}</span>
        </footer>
      </div>
    </main>
  )
}
