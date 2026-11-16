import { useState } from 'react'
import WatchFace from './WatchFace.jsx'

export default function App() {
  const [isAlwaysOn, setIsAlwaysOn] = useState(false)

  function toggleDisplay() {
    setIsAlwaysOn((previous) => !previous)
  }

  return (
    <main className="studio" data-mode={isAlwaysOn ? 'always-on' : 'awake'}>
      <h1>Watch Studio</h1>
      <WatchFace isAlwaysOn={isAlwaysOn} onToggle={toggleDisplay} />
    </main>
  )
}