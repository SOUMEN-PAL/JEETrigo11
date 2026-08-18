import { C } from '../lib/plot'

type Props = {
  theta: number
  highlight?: 'sin' | 'cos' | 'both'
  showAllied?: boolean
  labels?: boolean
}

export function UnitCircle({ theta, highlight = 'both', showAllied = false, labels = true }: Props) {
  const w = 280
  const h = 292
  const cx = 140
  const cy = 150
  const r = 74
  const c = Math.cos(theta)
  const s = Math.sin(theta)
  const px = cx + r * c
  const py = cy - r * s
  const allied = Math.PI - theta
  const ax = cx + r * Math.cos(allied)
  const ay = cy - r * Math.sin(allied)

  return (
    <svg className="fn-plot unit-circle" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="unit circle">
      <rect className="plot-bg" x={0} y={0} width={w} height={h} rx={8} />
      {labels ? (
        <>
          <text className="quad-label" x={w - 10} y={22} textAnchor="end">
            I All +
          </text>
          <text className="quad-label" x={10} y={22}>
            II Sin +
          </text>
          <text className="quad-label" x={10} y={h - 14}>
            III Tan +
          </text>
          <text className="quad-label" x={w - 10} y={h - 14} textAnchor="end">
            IV Cos +
          </text>
        </>
      ) : (
        <text className="plot-title" x={12} y={16}>
          unit circle
        </text>
      )}
      <circle cx={cx} cy={cy} r={r} className="uc-ring" />
      <line className="plot-axis" x1={cx - r - 12} y1={cy} x2={cx + r + 12} y2={cy} />
      <line className="plot-axis" x1={cx} y1={cy - r - 12} x2={cx} y2={cy + r + 12} />
      <text className="plot-tick" x={cx + r + 8} y={cy - 6}>
        1
      </text>
      <text className="plot-tick" x={cx + 6} y={cy - r - 6}>
        1
      </text>

      {highlight !== 'sin' ? (
        <line x1={cx} y1={cy} x2={px} y2={cy} stroke={C.cos} strokeWidth={2.5} />
      ) : null}
      {highlight !== 'cos' ? (
        <line x1={px} y1={cy} x2={px} y2={py} stroke={C.sin} strokeWidth={2.5} />
      ) : null}
      <line x1={cx} y1={cy} x2={px} y2={py} stroke="#c5d0dc" strokeWidth={1.4} strokeDasharray="3 3" />
      <path
        d={`M ${cx + 18} ${cy} A 18 18 0 ${((theta % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) > Math.PI ? 1 : 0} 0 ${cx + 18 * Math.cos(theta)} ${cy - 18 * Math.sin(theta)}`}
        fill="none"
        stroke={C.sum}
        strokeWidth={2}
      />
      <circle cx={px} cy={py} r={5} fill={C.der} />
      {showAllied ? (
        <>
          <circle cx={ax} cy={ay} r={5} fill={C.prod} />
          <line x1={ax} y1={cy} x2={ax} y2={ay} stroke={C.sin} strokeWidth={1.6} strokeDasharray="4 3" />
        </>
      ) : null}
      <text className="plot-tick" x={cx} y={cy + r + 22} textAnchor="middle">
        (cos θ, sin θ)
      </text>
    </svg>
  )
}
