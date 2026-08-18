import { useState } from 'react'
import { SearchContext } from './search'
import { Differentiation } from './sections/Differentiation'
import { Equations } from './sections/Equations'
import { Foundations } from './sections/Foundations'
import { GraphsPhase } from './sections/GraphsPhase'
import { Identities } from './sections/Identities'
import { Integration } from './sections/Integration'
import { JeeBank } from './sections/JeeBank'

const SECTIONS = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'graphs', label: 'Graphs & phase' },
  { id: 'identities', label: 'Identities' },
  { id: 'equations', label: 'Equations' },
  { id: 'diff', label: 'Differentiation' },
  { id: 'integral', label: 'Integration' },
  { id: 'bank', label: 'JEE bank' },
]

export default function App() {
  const [search, setSearch] = useState('')

  return (
    <SearchContext.Provider value={search}>
      <div className="app">
        <header className="topbar no-print">
          <div>
            <p className="eyebrow">Class 11 · JEE</p>
            <h1>Trigonometry cheat sheet</h1>
            <p className="tagline">
              Every formula with the graph it describes: phase, products, slope, and signed area.
            </p>
          </div>
          <div className="top-actions">
            <input
              className="search"
              type="search"
              placeholder="Search formulae…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search formulae"
            />
            <button type="button" className="print-btn" onClick={() => window.print()}>
              Print / PDF
            </button>
          </div>
        </header>

        <nav className="nav no-print" aria-label="Sections">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.label}
            </a>
          ))}
        </nav>

        <header className="print-only print-banner">
          <h1>JEE trigonometry cheat sheet</h1>
          <p>Class 11 · graphs show phase, products, slope, and signed area</p>
        </header>

        <main>
          <Foundations />
          <GraphsPhase />
          <Identities />
          <Equations />
          <Differentiation />
          <Integration />
          <JeeBank />
        </main>
      </div>
    </SearchContext.Provider>
  )
}
