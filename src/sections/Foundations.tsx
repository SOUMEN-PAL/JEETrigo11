import { useState } from 'react'
import { FunctionPlot } from '../components/FunctionPlot'
import { ChangeBoard, FormulaCard, GraphFrame, PlotRow, Slider } from '../components/FormulaCard'
import { Tex } from '../components/Tex'
import { UnitCircle } from '../components/UnitCircle'
import { C } from '../lib/plot'

function quadrant(t: number): string {
  const x = ((t % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
  if (x < 1e-6 || Math.abs(x - Math.PI) < 1e-6 || Math.abs(x - 2 * Math.PI) < 1e-6) return 'on an axis'
  if (x < Math.PI / 2) return 'I · all +'
  if (x < Math.PI) return 'II · only sin +'
  if (x < (3 * Math.PI) / 2) return 'III · only tan +'
  return 'IV · only cos +'
}

export function Foundations() {
  const [theta, setTheta] = useState(0.7)
  const [allied, setAllied] = useState(0.6)
  const [astc, setAstc] = useState(0.5)
  const deg = (theta * 180) / Math.PI
  const tanUndef = Math.abs(Math.cos(theta)) < 0.05

  return (
    <section id="foundations" className="section">
      <h2>1. Foundations</h2>
      <p className="section-lead">
        On the unit circle, a point at angle <Tex math="\theta" /> (from the positive x-axis) is{' '}
        <Tex math="(\cos\theta,\ \sin\theta)" />. Everything else is a ratio of those two coordinates.
      </p>

      <FormulaCard
        id="deg-rad"
        title="Degree ↔ radian"
        formula="\pi\ \text{rad}=180^\circ \qquad \theta_{\text{rad}}=\theta^\circ\cdot\frac{\pi}{180}"
        meaning="A full turn is 2π radians. JEE default is radians unless a degree symbol is written."
        tags="degree radian conversion"
      >
        <div className="callout">
          <Tex math="30^\circ=\pi/6,\quad 45^\circ=\pi/4,\quad 60^\circ=\pi/3,\quad 90^\circ=\pi/2" />
        </div>
      </FormulaCard>

      <FormulaCard
        id="unit-defs"
        title="Definitions on the unit circle"
        formula="\sin\theta=y,\quad \cos\theta=x,\quad \tan\theta=\frac{y}{x}=\frac{\sin\theta}{\cos\theta}"
        caveat="tan, cot, sec, csc are undefined where the denominator is 0."
        meaning="The blue segment is sin θ (height). The gold segment is cos θ (x-coordinate). Drag θ and watch both."
        tags="sin cos tan definition unit circle"
      >
        <div className="viz-split">
          <GraphFrame
            caption="The moving point is (cos θ, sin θ). Gold = x-run (cos). Blue = y-rise (sin). Toggle θ to rotate that point."
            legend={[
              { color: C.cos, name: 'gold segment', role: 'cos θ, the x-coordinate' },
              { color: C.sin, name: 'blue segment', role: 'sin θ, the y-coordinate' },
            ]}
          >
            <UnitCircle theta={theta} />
          </GraphFrame>
          <div>
            <Slider
              label="Angle θ (the toggle)"
              value={theta}
              min={-Math.PI}
              max={Math.PI}
              step={0.01}
              onChange={setTheta}
              display={`${theta.toFixed(2)} rad  (${deg.toFixed(0)}°)`}
              does="rotates the radius. Blue height and gold width update. Cross an axis and tan blows up."
              why="this is the definition of every trig value: read coordinates off the unit circle, not a triangle you have to redraw."
            />
            <ChangeBoard
              rows={[
                {
                  control: 'θ now',
                  change: `${theta.toFixed(2)} rad (${deg.toFixed(0)}°) in quadrant ${quadrant(theta)}`,
                  purpose: 'sets which point on the circle you are reading',
                },
                {
                  control: 'sin θ',
                  change: `${Math.sin(theta).toFixed(3)}  (blue height)`,
                  purpose: 'positive above the x-axis, negative below',
                },
                {
                  control: 'cos θ',
                  change: `${Math.cos(theta).toFixed(3)}  (gold width)`,
                  purpose: 'positive to the right of the y-axis, negative to the left',
                },
                {
                  control: 'tan θ',
                  change: tanUndef ? 'undefined (cos ≈ 0)' : (Math.sin(theta) / Math.cos(theta)).toFixed(3),
                  purpose: 'slope of the radius; undefined on the vertical axis',
                },
              ]}
            />
            <p className="meaning">
              Reciprocals: <Tex math="\csc=1/\sin,\ \sec=1/\cos,\ \cot=\cos/\sin" />.
            </p>
          </div>
        </div>
      </FormulaCard>

      <FormulaCard
        id="astc"
        title="Signs in four quadrants (ASTC)"
        formula="\text{I: all}+ \quad \text{II: sin}+ \quad \text{III: tan}+ \quad \text{IV: cos}+"
        meaning="A function is positive in a quadrant only if both of its defining coordinates have the same needed sign. ASTC = All Students Take Coffee."
        tags="quadrant ASTC signs"
      >
        <Slider
          label="Angle θ — pick a quadrant"
          value={astc}
          min={0.15}
          max={2 * Math.PI - 0.15}
          step={0.01}
          onChange={setAstc}
          display={`${astc.toFixed(2)} rad · ${quadrant(astc)}`}
          does="moves the point around the circle and along the sine/cosine graphs. Watch which function stays positive."
          why="ASTC tells you the sign before you compute a value — the first thing JEE wants on a reduction or equation."
        />
        <ChangeBoard
          rows={[
            {
              control: 'This toggle',
              change: `point is in ${quadrant(astc)}`,
              purpose: 'shows which of sin, cos, tan may be positive there',
            },
            {
              control: 'sin / cos now',
              change: `sin ${Math.sin(astc).toFixed(2)},  cos ${Math.cos(astc).toFixed(2)}`,
              purpose: 'blue above axis ⇒ sin +; gold right of axis ⇒ cos +',
            },
          ]}
        />
        <PlotRow>
          <GraphFrame caption="Unit circle with ASTC labels. Drag θ above to park the point in I, II, III, or IV.">
            <UnitCircle theta={astc} labels />
          </GraphFrame>
          <GraphFrame
            caption="Same θ on the graphs: blue = sin (height), gold = cos (x). Vertical dashed lines are the quadrant walls at π/2, π, 3π/2."
            legend={[
              { color: C.sin, name: 'sin', role: 'positive in I and II' },
              { color: C.cos, name: 'cos', role: 'positive in I and IV' },
            ]}
          >
            <FunctionPlot
              title="sin (blue) vs cos (gold)"
              xMin={-0.2}
              xMax={2 * Math.PI + 0.2}
              yMin={-1.6}
              yMax={1.6}
              curves={[
                { f: Math.sin, color: C.sin, label: 'sin' },
                { f: Math.cos, color: C.cos, label: 'cos' },
              ]}
              guides={[
                { x: Math.PI / 2, label: 'II' },
                { x: Math.PI, label: 'III' },
                { x: (3 * Math.PI) / 2, label: 'IV' },
              ]}
              points={[{ x: astc, y: Math.sin(astc), color: C.der, label: 'θ' }]}
            />
          </GraphFrame>
        </PlotRow>
      </FormulaCard>

      <FormulaCard
        id="domain-range"
        title="Domain, range, period, even/odd"
        formula="\sin,\cos:\ \mathbb{R}\to[-1,1]\ \ (2\pi)\qquad \tan:\ \mathbb{R}\setminus\{\tfrac{\pi}{2}+n\pi\}\to\mathbb{R}\ \ (\pi)"
        meaning="Even: f(−x)=f(x) is a mirror across the y-axis (cos). Odd: f(−x)=−f(x) is a 180° rotation about the origin (sin, tan)."
        tags="domain range period even odd"
      >
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>fn</th>
                <th>domain</th>
                <th>range</th>
                <th>period</th>
                <th>parity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Tex math="\sin x" />
                </td>
                <td>
                  <Tex math="\mathbb{R}" />
                </td>
                <td>
                  <Tex math="[-1,1]" />
                </td>
                <td>
                  <Tex math="2\pi" />
                </td>
                <td>odd</td>
              </tr>
              <tr>
                <td>
                  <Tex math="\cos x" />
                </td>
                <td>
                  <Tex math="\mathbb{R}" />
                </td>
                <td>
                  <Tex math="[-1,1]" />
                </td>
                <td>
                  <Tex math="2\pi" />
                </td>
                <td>even</td>
              </tr>
              <tr>
                <td>
                  <Tex math="\tan x" />
                </td>
                <td>
                  <Tex math="x\neq\frac{\pi}{2}+n\pi" />
                </td>
                <td>
                  <Tex math="\mathbb{R}" />
                </td>
                <td>
                  <Tex math="\pi" />
                </td>
                <td>odd</td>
              </tr>
              <tr>
                <td>
                  <Tex math="\cot x" />
                </td>
                <td>
                  <Tex math="x\neq n\pi" />
                </td>
                <td>
                  <Tex math="\mathbb{R}" />
                </td>
                <td>
                  <Tex math="\pi" />
                </td>
                <td>odd</td>
              </tr>
              <tr>
                <td>
                  <Tex math="\sec x" />
                </td>
                <td>
                  <Tex math="x\neq\frac{\pi}{2}+n\pi" />
                </td>
                <td>
                  <Tex math="(-\infty,-1]\cup[1,\infty)" />
                </td>
                <td>
                  <Tex math="2\pi" />
                </td>
                <td>even</td>
              </tr>
              <tr>
                <td>
                  <Tex math="\csc x" />
                </td>
                <td>
                  <Tex math="x\neq n\pi" />
                </td>
                <td>
                  <Tex math="(-\infty,-1]\cup[1,\infty)" />
                </td>
                <td>
                  <Tex math="2\pi" />
                </td>
                <td>odd</td>
              </tr>
            </tbody>
          </table>
        </div>
        <PlotRow>
          <FunctionPlot
            title="odd: sin(−x) = −sin x"
            curves={[
              { f: Math.sin, color: C.sin, label: 'sin x' },
              { f: (x) => Math.sin(-x), color: C.prod, dash: true, label: 'sin(−x)' },
            ]}
          />
          <FunctionPlot
            title="even: cos(−x) = cos x"
            curves={[
              { f: Math.cos, color: C.cos, label: 'cos x' },
              { f: (x) => Math.cos(-x), color: C.prod, dash: true, label: 'cos(−x)' },
            ]}
          />
        </PlotRow>
      </FormulaCard>

      <FormulaCard
        id="allied"
        title="Allied (reduction) angles"
        formula="\sin(\pi-x)=\sin x \qquad \cos(\pi-x)=-\cos x \qquad \sin(\pi+x)=-\sin x"
        meaning="π − x is the second-quadrant partner of x: same height (same sine), opposite x-coordinate (flipped cosine). The two pink/red points on the circle share a horizontal line."
        tags="allied reduction co-function"
      >
        <div className="viz-split">
          <GraphFrame caption="Red point = x. Magenta point = π − x. Same height ⇒ same sine. Opposite x-coordinate ⇒ flipped cosine.">
            <UnitCircle theta={allied} showAllied />
          </GraphFrame>
          <div>
            <Slider
              label="Angle x (first-quadrant partner)"
              value={allied}
              min={0.15}
              max={1.4}
              step={0.01}
              onChange={setAllied}
              does="slides both points. They stay on one horizontal line (equal sine) while cosine of the second point stays negative."
              why="this is the reduction formula sin(π−x)=sin x — how JEE rewrites obtuse angles back to acute ones."
            />
            <ChangeBoard
              rows={[
                {
                  control: 'x',
                  change: `${allied.toFixed(2)} rad,  sin = ${Math.sin(allied).toFixed(2)}`,
                  purpose: 'the acute angle you actually look up',
                },
                {
                  control: 'π − x',
                  change: `${(Math.PI - allied).toFixed(2)} rad,  sin = ${Math.sin(Math.PI - allied).toFixed(2)} (same)`,
                  purpose: 'second-quadrant copy with the same sine',
                },
              ]}
            />
            <GraphFrame caption="Both dots sit at the same height on y = sin θ. Drag x and they move as a pair.">
              <FunctionPlot
                title="same sine, flipped cosine"
                xMin={-0.2}
                xMax={Math.PI + 0.2}
                yMin={-1.5}
                yMax={1.5}
                curves={[{ f: Math.sin, color: C.sin, label: 'sin' }]}
                points={[
                  { x: allied, y: Math.sin(allied), color: C.der, label: 'x' },
                  { x: Math.PI - allied, y: Math.sin(Math.PI - allied), color: C.prod, label: 'π−x' },
                ]}
              />
            </GraphFrame>
          </div>
        </div>
        <div className="callout">
          <Tex math="\sin(\tfrac{\pi}{2}-x)=\cos x,\quad \cos(\tfrac{\pi}{2}-x)=\sin x" /> — co-function: complement on the circle.
        </div>
      </FormulaCard>
    </section>
  )
}
