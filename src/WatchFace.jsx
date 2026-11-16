import { useEffect, useState } from "react";

export default function WatchFace() {
    const [now, setNow] = useState(() => new Date())
    const [isAlwaysOn, setIsAlwaysOn] = useState(false)

    useEffect(() => {
        const timer = window.setInterval(() => {
            setNow(new Date())
        }, 1000)
        return () => window.clearInterval(timer)
    }, [])

    const hours = String(now.getHours()).padStart(2,'0')
    const minutes = String(now.getMinutes()).padStart(2,'0')
    const time = `${hours}:${minutes}`

    return (
        <button
        type="button"
        className="watch-face"
        data-mode={isAlwaysOn?'always-on':'awake'}
        aria-label={`Always-on mode. Current time ${time}`}
        aria-pressed={isAlwaysOn}
        onClick={()=> setIsAlwaysOn((previous) => !previous)}
        >
            <span className="watch-face__time" aria-hidden="true">
                <span className="watch-face__hours">{hours}</span>
                <span className="watch-face__minutes">{minutes}</span>
            </span>
            <span className="watch-face__arc" aria-hidden="true"/>
        </button>
    )
}