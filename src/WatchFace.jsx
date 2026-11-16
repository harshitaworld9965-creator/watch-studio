import { useEffect, useState } from 'react'

export default function WatchFace({ isAlwaysOn, onToggle }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  return (
    <button
      type="button"
      className="watch-face"
      data-mode={isAlwaysOn ? 'always-on' : 'awake'}
      aria-label={`Always-on mode. Current time ${hours}:${minutes}`}
      aria-pressed={isAlwaysOn}
      onClick={onToggle}
    >
      <span className="watch-face__time" aria-hidden="true">
        <span className="watch-face__hours">{hours}</span>
        <span className="watch-face__minutes">{minutes}</span>
      </span>

      <span className="watch-face__arc" aria-hidden="true" />
    </button>
  )
}