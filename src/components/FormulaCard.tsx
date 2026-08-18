import { useContext, type CSSProperties, type ReactNode } from 'react'
import { SearchContext } from '../search'
import { Tex } from './Tex'

type Props = {
  id: string
  title: string
  formula: string
  meaning: string
  caveat?: string
  tags?: string
  children?: ReactNode
}

export function FormulaCard({ id, title, formula, meaning, caveat, tags = '', children }: Props) {
  const q = useContext(SearchContext).trim().toLowerCase()
  const hay = `${title} ${formula} ${meaning} ${caveat ?? ''} ${tags}`.toLowerCase()
  const match = !q || hay.includes(q)
  return (
    <article id={id} className={match ? 'formula-card' : 'formula-card card-filtered'}>
      <header className="card-head">
        <h3>{title}</h3>
        <div className="card-formula">
          <Tex math={formula} display />
        </div>
      </header>
      {caveat ? <p className="caveat">{caveat}</p> : null}
      <p className="meaning">{meaning}</p>
      {children ? <div className="card-viz">{children}</div> : null}
    </article>
  )
}

type SliderProps = {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  display?: string
  does?: string
  why?: string
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 0.05,
  onChange,
  display,
  does,
  why,
}: SliderProps) {
  return (
    <label className="slider control no-print">
      <span className="control-head">
        <span className="control-badge">Drag</span>
        <span className="control-name">{label}</span>
        <strong>{display ?? value.toFixed(2)}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {does ? (
        <p className="control-does">
          <b>On the graph:</b> {does}
        </p>
      ) : null}
      {why ? (
        <p className="control-why">
          <b>What it is for:</b> {why}
        </p>
      ) : null}
    </label>
  )
}

export function PlotRow({ children }: { children: ReactNode }) {
  return <div className="plot-row">{children}</div>
}

type LegendItem = {
  color: string
  dash?: boolean
  name: string
  role: string
}

type GraphFrameProps = {
  caption: string
  legend?: LegendItem[]
  children: ReactNode
}

export function GraphFrame({ caption, legend, children }: GraphFrameProps) {
  return (
    <figure className="graph-frame">
      {children}
      {legend && legend.length > 0 ? (
        <ul className="graph-legend">
          {legend.map((item) => (
            <li key={item.name}>
              <span
                className={item.dash ? 'swatch dash' : 'swatch'}
                style={
                  {
                    '--sw': item.color,
                    background: item.dash ? undefined : item.color,
                    borderColor: item.color,
                  } as CSSProperties
                }
              />
              <span>
                <b>{item.name}</b> — {item.role}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      <figcaption className="graph-caption">{caption}</figcaption>
    </figure>
  )
}

type ChangeRow = {
  control: string
  change: string
  purpose: string
}

export function ChangeBoard({ title, rows }: { title?: string; rows: ChangeRow[] }) {
  return (
    <div className="change-board">
      <p className="change-board-title">{title ?? 'What each control is doing right now'}</p>
      <div className="change-board-grid">
        {rows.map((row) => (
          <div key={row.control} className="change-row">
            <span className="change-control">{row.control}</span>
            <span className="change-change">{row.change}</span>
            <span className="change-purpose">{row.purpose}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
