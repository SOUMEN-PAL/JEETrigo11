export type Pt = { x: number; y: number }

export function gcd(a: number, b: number): number {
  let x = Math.abs(a)
  let y = Math.abs(b)
  while (y) {
    const t = y
    y = x % y
    x = t
  }
  return x || 1
}

export function formatPi(x: number): string {
  const r = x / Math.PI
  if (Math.abs(r) < 1e-8) return '0'
  const denoms = [1, 2, 3, 4, 6]
  for (const d of denoms) {
    const n = Math.round(r * d)
    if (Math.abs(r - n / d) < 1e-5) {
      const sign = n < 0 ? '−' : ''
      const an = Math.abs(n)
      const g = gcd(an, d)
      const nn = an / g
      const dd = d / g
      if (dd === 1) return nn === 1 ? `${sign}π` : `${sign}${nn}π`
      if (nn === 1) return `${sign}π/${dd}`
      return `${sign}${nn}π/${dd}`
    }
  }
  return String(Number(x.toFixed(2)))
}

export function linspace(a: number, b: number, n: number): number[] {
  const count = Math.max(2, n)
  const xs: number[] = []
  for (let i = 0; i < count; i++) xs.push(a + ((b - a) * i) / (count - 1))
  return xs
}

export function sampleSegments(
  f: (x: number) => number,
  xMin: number,
  xMax: number,
  samples: number,
  yLimit: number,
  jump: number,
): Pt[][] {
  const xs = linspace(xMin, xMax, samples)
  const segments: Pt[][] = []
  let current: Pt[] = []
  let prevY: number | null = null
  for (const x of xs) {
    const y = f(x)
    const bad = !Number.isFinite(y) || Math.abs(y) > yLimit
    if (bad) {
      if (current.length > 1) segments.push(current)
      current = []
      prevY = null
      continue
    }
    if (prevY !== null && Math.abs(y - prevY) > jump) {
      if (current.length > 1) segments.push(current)
      current = [{ x, y }]
    } else {
      current.push({ x, y })
    }
    prevY = y
  }
  if (current.length > 1) segments.push(current)
  return segments
}

export function pointsToPath(
  pts: Pt[],
  mapX: (x: number) => number,
  mapY: (y: number) => number,
): string {
  return pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${mapX(p.x).toFixed(2)},${mapY(p.y).toFixed(2)}`)
    .join(' ')
}

export type AreaRun = { sign: 1 | -1; pts: Pt[] }

export function signedAreaRuns(
  f: (x: number) => number,
  from: number,
  to: number,
  samples: number,
): AreaRun[] {
  const xs = linspace(from, to, samples)
  const runs: AreaRun[] = []
  let pts: Pt[] = []
  let sign: 1 | -1 | 0 = 0

  const flush = () => {
    if (pts.length >= 2 && sign !== 0) runs.push({ sign, pts })
    pts = []
  }

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i]
    let y = f(x)
    if (!Number.isFinite(y)) {
      flush()
      sign = 0
      continue
    }
    const s: 1 | -1 | 0 = y > 1e-12 ? 1 : y < -1e-12 ? -1 : 0
    if (s === 0) {
      pts.push({ x, y: 0 })
      continue
    }
    if (sign === 0) {
      sign = s
      pts.push({ x, y })
      continue
    }
    if (s !== sign) {
      const prev = pts[pts.length - 1] ?? { x, y }
      const t = prev.y / (prev.y - y)
      const xz = prev.x + t * (x - prev.x)
      pts.push({ x: xz, y: 0 })
      flush()
      sign = s
      pts = [
        { x: xz, y: 0 },
        { x, y },
      ]
    } else {
      pts.push({ x, y })
    }
  }
  flush()
  return runs
}

export function areaPath(
  run: AreaRun,
  mapX: (x: number) => number,
  mapY: (y: number) => number,
  y0: number,
): string {
  const body = pointsToPath(run.pts, mapX, mapY)
  const last = run.pts[run.pts.length - 1]
  const first = run.pts[0]
  return `${body} L${mapX(last.x).toFixed(2)},${y0.toFixed(2)} L${mapX(first.x).toFixed(2)},${y0.toFixed(2)} Z`
}

export const C = {
  sin: '#6cb6ff',
  cos: '#f0b429',
  prod: '#e879c8',
  sum: '#7dd3c0',
  der: '#ff8a65',
  guide: '#8b9bb0',
  pos: 'rgba(61, 184, 122, 0.38)',
  neg: 'rgba(232, 88, 88, 0.36)',
  env: '#c4b5fd',
}
