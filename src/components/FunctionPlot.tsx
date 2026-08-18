import { useId } from 'react'
import {
  C,
  areaPath,
  formatPi,
  pointsToPath,
  sampleSegments,
  signedAreaRuns,
  type Pt,
} from '../lib/plot'

export type Curve = {
  f: (x: number) => number
  color?: string
  dash?: boolean
  width?: number
  label?: string
}

export type Area = {
  f: (x: number) => number
  from: number
  to: number
}

export type Guide = {
  x?: number
  y?: number
  label?: string
  dash?: boolean
  color?: string
}

export type PlotPoint = {
  x: number
  y: number
  label?: string
  color?: string
}

export type Tangent = {
  x0: number
  f: (x: number) => number
  df: (x: number) => number
}

type Props = {
  curves?: Curve[]
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  width?: number
  height?: number
  area?: Area
  guides?: Guide[]
  points?: PlotPoint[]
  tangent?: Tangent
  title?: string
  samples?: number
  xTicks?: number[]
  yTicks?: number[]
}

function toPath(pts: Pt[], mapX: (x: number) => number, mapY: (y: number) => number) {
  return pointsToPath(pts, mapX, mapY)
}

function labelWidth(s: string) {
  return s.length * 6.4
}

function spacedXTicks(xMin: number, xMax: number, mapX: (x: number) => number, padL: number, plotW: number) {
  const span = xMax - xMin
  const step = span > 2.6 * Math.PI ? Math.PI : Math.PI / 2
  const start = Math.ceil((xMin - 1e-9) / step) * step
  const raw: number[] = []
  for (let x = start; x <= xMax + 1e-9; x += step) raw.push(x)

  const kept: { x: number; label: string; cx: number; w: number }[] = []
  for (const x of raw) {
    const label = formatPi(x)
    const cx = mapX(x)
    const w = labelWidth(label)
    if (cx < padL - 2 || cx > padL + plotW + 2) continue
    const hits = kept.some((k) => Math.abs(cx - k.cx) < (w + k.w) / 2 + 8)
    if (!hits) kept.push({ x, label, cx, w })
  }
  return kept
}

function unstick(values: number[], minGap: number, lo: number, hi: number) {
  const out = [...values]
  for (let i = 1; i < out.length; i++) {
    if (out[i] < out[i - 1] + minGap) out[i] = out[i - 1] + minGap
  }
  if (out.length && out[out.length - 1] > hi) {
    out[out.length - 1] = hi
    for (let i = out.length - 2; i >= 0; i--) {
      if (out[i] > out[i + 1] - minGap) out[i] = out[i + 1] - minGap
    }
  }
  if (out.length && out[0] < lo) {
    out[0] = lo
    for (let i = 1; i < out.length; i++) {
      if (out[i] < out[i - 1] + minGap) out[i] = out[i - 1] + minGap
    }
  }
  return out
}

export function FunctionPlot({
  curves = [],
  xMin = -Math.PI,
  xMax = Math.PI,
  yMin = -2.4,
  yMax = 2.4,
  width = 440,
  height = 220,
  area,
  guides = [],
  points = [],
  tangent,
  title,
  samples = 420,
  xTicks,
  yTicks,
}: Props) {
  const hasYLabels = guides.some((g) => g.y !== undefined && g.label)
  const padL = 36
  const padR = hasYLabels ? 56 : 14
  const padT = title ? 24 : 12
  const padB = 28
  const plotW = width - padL - padR
  const plotH = height - padT - padB
  const y0 = padT + ((yMax - 0) / (yMax - yMin)) * plotH

  const mapX = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * plotW
  const mapY = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * plotH

  const yLimit = Math.max(Math.abs(yMin), Math.abs(yMax)) * 6
  const jump = (yMax - yMin) * 1.6

  const xTickMarks = xTicks
    ? xTicks
        .filter((x) => x >= xMin - 1e-6 && x <= xMax + 1e-6)
        .map((x) => ({ x, label: formatPi(x), cx: mapX(x), w: labelWidth(formatPi(x)) }))
    : spacedXTicks(xMin, xMax, mapX, padL, plotW)

  const yTickMarks = (yTicks ?? [-2, -1, 1, 2]).filter((y) => y > yMin + 1e-9 && y < yMax - 1e-9)

  const clipId = useId().replace(/:/g, '')
  const legendCurves = curves.filter((c) => c.label)

  const yGuides = guides
    .filter((g): g is Guide & { y: number; label: string } => g.y !== undefined && typeof g.label === 'string')
    .sort((a, b) => mapY(a.y) - mapY(b.y))
  const yGuideYs = unstick(
    yGuides.map((g) => mapY(g.y)),
    13,
    padT + 10,
    padT + plotH - 6,
  )

  const xGuides = guides.filter((g) => g.x !== undefined && g.label)

  return (
    <div className="plot-block">
      <svg
        className="fn-plot"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={title ?? 'function graph'}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={padL} y={padT} width={plotW} height={plotH} />
          </clipPath>
        </defs>
        <rect className="plot-bg" x={0} y={0} width={width} height={height} rx={8} />
        {title ? (
          <text className="plot-title" x={padL} y={15}>
            {title}
          </text>
        ) : null}

        {xTickMarks.map((t) => (
          <line
            key={`gx-${t.x}`}
            className="plot-grid"
            x1={t.cx}
            y1={padT}
            x2={t.cx}
            y2={padT + plotH}
          />
        ))}
        {yTickMarks.map((y) => (
          <line
            key={`gy-${y}`}
            className="plot-grid"
            x1={padL}
            y1={mapY(y)}
            x2={padL + plotW}
            y2={mapY(y)}
          />
        ))}

        <line className="plot-axis" x1={padL} y1={y0} x2={padL + plotW} y2={y0} />
        <line className="plot-axis" x1={mapX(0)} y1={padT} x2={mapX(0)} y2={padT + plotH} />

        <g clipPath={`url(#${clipId})`}>
          {area
            ? signedAreaRuns(area.f, area.from, area.to, samples).map((run, i) => (
                <path
                  key={`a-${i}`}
                  d={areaPath(run, mapX, mapY, y0)}
                  fill={run.sign > 0 ? C.pos : C.neg}
                  stroke="none"
                />
              ))
            : null}

          {guides.map((g, i) =>
            g.x !== undefined ? (
              <line
                key={`g-${i}`}
                x1={mapX(g.x)}
                y1={padT}
                x2={mapX(g.x)}
                y2={padT + plotH}
                stroke={g.color ?? C.guide}
                strokeWidth={1.2}
                strokeDasharray={g.dash === false ? undefined : '4 3'}
              />
            ) : g.y !== undefined ? (
              <line
                key={`g-${i}`}
                x1={padL}
                y1={mapY(g.y)}
                x2={padL + plotW}
                y2={mapY(g.y)}
                stroke={g.color ?? C.guide}
                strokeWidth={1.2}
                strokeDasharray={g.dash === false ? undefined : '4 3'}
              />
            ) : null,
          )}

          {tangent
            ? (() => {
                const m = tangent.df(tangent.x0)
                const b = tangent.f(tangent.x0)
                const line = (x: number) => b + m * (x - tangent.x0)
                const pts: Pt[] = [
                  { x: xMin, y: line(xMin) },
                  { x: xMax, y: line(xMax) },
                ]
                return (
                  <path
                    d={toPath(pts, mapX, mapY)}
                    fill="none"
                    stroke={C.der}
                    strokeWidth={1.6}
                    strokeDasharray="5 4"
                  />
                )
              })()
            : null}

          {curves.map((c, i) =>
            sampleSegments(c.f, xMin, xMax, samples, yLimit, jump).map((seg, j) => (
              <path
                key={`c-${i}-${j}`}
                d={toPath(seg, mapX, mapY)}
                fill="none"
                stroke={c.color ?? C.sin}
                strokeWidth={c.width ?? 2}
                strokeDasharray={c.dash ? '6 4' : undefined}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            )),
          )}

          {points.map((p, i) => {
            const px = Math.min(padL + plotW - 8, Math.max(padL + 8, mapX(p.x)))
            const py = mapY(p.y)
            const labelBelow = py < padT + 18
            const labelLeft = px > padL + plotW - 36
            return (
              <g key={`pt-${i}`}>
                <circle cx={mapX(p.x)} cy={py} r={4} fill={p.color ?? C.der} />
                {p.label ? (
                  <text
                    className="plot-label"
                    x={labelLeft ? px - 6 : px + 6}
                    y={labelBelow ? py + 14 : py - 7}
                    textAnchor={labelLeft ? 'end' : 'start'}
                  >
                    {p.label}
                  </text>
                ) : null}
              </g>
            )
          })}
        </g>

        {yGuides.map((g, i) => (
          <text
            key={`yl-${g.label}-${i}`}
            className="plot-label guide-label"
            x={padL + plotW + 4}
            y={yGuideYs[i] + 3}
            textAnchor="start"
          >
            {g.label}
          </text>
        ))}

        {xGuides.map((g) => (
          <text
            key={`xl-${g.label}-${g.x}`}
            className="plot-label guide-label"
            x={mapX(g.x!)}
            y={padT + 11}
            textAnchor="middle"
          >
            {g.label}
          </text>
        ))}

        {xTickMarks.map((t) => (
          <text key={`xt-${t.x}`} className="plot-tick" x={t.cx} y={height - 8} textAnchor="middle">
            {t.label}
          </text>
        ))}
        {yTickMarks.map((y) => (
          <text key={`yt-${y}`} className="plot-tick" x={padL - 6} y={mapY(y) + 3} textAnchor="end">
            {y}
          </text>
        ))}
      </svg>
      {legendCurves.length > 0 ? (
        <ul className="plot-legend-row">
          {legendCurves.map((c) => (
            <li key={c.label}>
              <span
                className={c.dash ? 'swatch dash' : 'swatch'}
                style={{
                  ['--sw' as string]: c.color ?? C.sin,
                  background: c.dash ? undefined : (c.color ?? C.sin),
                  borderColor: c.color ?? C.sin,
                }}
              />
              {c.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
