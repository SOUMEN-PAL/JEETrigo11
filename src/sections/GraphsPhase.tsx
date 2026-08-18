import { useState } from 'react'
import { FunctionPlot } from '../components/FunctionPlot'
import { ChangeBoard, FormulaCard, GraphFrame, PlotRow, Slider } from '../components/FormulaCard'
import { Tex } from '../components/Tex'
import { C, formatPi } from '../lib/plot'

export function GraphsPhase() {
  const [a, setA] = useState(1.6)
  const [b, setB] = useState(1)
  const [c, setC] = useState(0.8)
  const [d, setD] = useState(0.4)
  const period = (2 * Math.PI) / Math.abs(b || 1)
  const phase = -c / (b || 1)

  return (
    <section id="graphs" className="section">
      <h2>2. Graphs, periodicity, phase</h2>
      <p className="section-lead">
        A sine wave is a shape. Changing <Tex math="a,b,c,d" /> only stretches, compresses, slides, or lifts that shape — it does not change the identity.
      </p>

      <FormulaCard
        id="six-graphs"
        title="The six standard graphs"
        formula="y=\sin x,\ \cos x,\ \tan x,\ \cot x,\ \sec x,\ \csc x"
        meaning="sin/cos oscillate in [−1,1]. tan/cot shoot through vertical asymptotes every π. sec/csc live outside [−1,1] and blow up where cos/sin vanish."
        tags="graphs tan sec csc cot asymptote"
      >
        <PlotRow>
          <FunctionPlot
            title="sin x"
            xMin={-2 * Math.PI}
            xMax={2 * Math.PI}
            yMin={-1.8}
            yMax={1.8}
            curves={[{ f: Math.sin, color: C.sin }]}
          />
          <FunctionPlot
            title="cos x  =  sin(x+π/2)"
            xMin={-2 * Math.PI}
            xMax={2 * Math.PI}
            yMin={-1.8}
            yMax={1.8}
            curves={[{ f: Math.cos, color: C.cos }]}
          />
        </PlotRow>
        <PlotRow>
          <FunctionPlot
            title="tan x  (period π)"
            xMin={-2 * Math.PI}
            xMax={2 * Math.PI}
            yMin={-4}
            yMax={4}
            yTicks={[-3, -1, 1, 3]}
            curves={[{ f: Math.tan, color: C.prod }]}
            guides={[-3, -1, 1, 3].map((k) => ({ x: (k * Math.PI) / 2, dash: true }))}
          />
          <FunctionPlot
            title="sec x = 1/cos x"
            xMin={-2 * Math.PI}
            xMax={2 * Math.PI}
            yMin={-4}
            yMax={4}
            yTicks={[-3, -1, 1, 3]}
            curves={[{ f: (x) => 1 / Math.cos(x), color: C.sum }]}
          />
        </PlotRow>
      </FormulaCard>

      <FormulaCard
        id="period-traps"
        title="JEE period traps"
        formula="T(\sin nx)=\frac{2\pi}{|n|}\qquad T(|\sin x|)=\pi\qquad T(\sin^2 x)=\pi\qquad T(\tan x)=\pi"
        caveat="Period of f is the smallest T>0 with f(x+T)=f(x) for all x in the domain."
        meaning="Folding the wave (absolute value) or squaring it identifies the bottom with the top, so one hump now repeats every π instead of 2π. Multiplying the input by n squeezes n cycles into 2π."
        tags="period |sin| sin^2 tan fundamental"
      >
        <PlotRow>
          <FunctionPlot
            title="|sin x|  period π"
            xMin={-2 * Math.PI}
            xMax={2 * Math.PI}
            yMin={-0.4}
            yMax={1.6}
            curves={[
              { f: Math.sin, color: C.sin, dash: true, label: 'sin' },
              { f: (x) => Math.abs(Math.sin(x)), color: C.prod, label: '|sin|' },
            ]}
            guides={[{ x: Math.PI }, { x: -Math.PI }]}
          />
          <FunctionPlot
            title="sin² x  period π"
            xMin={-2 * Math.PI}
            xMax={2 * Math.PI}
            yMin={-0.3}
            yMax={1.4}
            curves={[
              { f: (x) => Math.sin(x) ** 2, color: C.sum, label: 'sin²' },
              { f: (x) => (1 - Math.cos(2 * x)) / 2, color: C.cos, dash: true, label: '(1−cos2x)/2' },
            ]}
          />
        </PlotRow>
        <FunctionPlot
          title="sin 2x: two cycles where sin x has one"
          xMin={-0.2}
          xMax={2 * Math.PI + 0.2}
          yMin={-1.6}
          yMax={1.6}
          curves={[
            { f: Math.sin, color: C.sin, dash: true, width: 1.5, label: 'sin x' },
            { f: (x) => Math.sin(2 * x), color: C.der, label: 'sin 2x' },
          ]}
        />
      </FormulaCard>

      <FormulaCard
        id="wave-transform"
        title="Amplitude, period, phase, shift"
        formula="y=a\sin(bx+c)+d"
        caveat="Amplitude |a|, period 2π/|b|, phase shift −c/b (to the right if positive), vertical shift d."
        meaning="a stretches height. b compresses time (more wiggles). c slides the wave horizontally — that slide is the phase. d lifts the whole graph. The gold dashed curve is the unshifted sin x for comparison."
        tags="amplitude period phase shift transformation"
      >
        <p className="control-hint no-print">Four independent toggles. Each one changes only one geometric feature of the same sine.</p>
        <div className="sliders">
          <Slider
            label="a — amplitude toggle"
            value={a}
            min={-2.5}
            max={2.5}
            onChange={setA}
            does={
              a < 0
                ? `flips the wave upside down and sets height |a|=${Math.abs(a).toFixed(2)}`
                : `stretches height to |a|=${Math.abs(a).toFixed(2)}. Peaks sit on the upper dashed rail.`
            }
            why="amplitude is the max distance from the midline — the |A| in JEE range questions."
          />
          <Slider
            label="b — frequency / period toggle"
            value={b}
            min={0.4}
            max={3}
            onChange={setB}
            does={
              b > 1.05
                ? `squeezes the wave: more wiggles, period T=${formatPi(period)} (shorter than 2π)`
                : b < 0.95
                  ? `stretches the wave: fewer wiggles, period T=${formatPi(period)} (longer than 2π)`
                  : 'same period as sin x (T = 2π) — only a reference match'
            }
            why="period = 2π/|b|. This is the T you quote for sin(bx), sin(nx), sin²(nx)."
          />
          <Slider
            label="c — phase toggle"
            value={c}
            min={-Math.PI}
            max={Math.PI}
            onChange={setC}
            does={`slides the whole wave horizontally by −c/b = ${phase.toFixed(2)} (${phase >= 0 ? 'right' : 'left'}). The vertical dashed line marks where x=0 of the original sine moved to.`}
            why="phase is why cos x looks like sin x slid left by π/2, and why a sin x + b cos x is one shifted sine."
          />
          <Slider
            label="d — vertical shift toggle"
            value={d}
            min={-1.5}
            max={1.5}
            onChange={setD}
            does={`lifts the midline to y=${d.toFixed(2)}. The whole wave rides that grey rail — it does not change height or period.`}
            why="range becomes [d−|a|, d+|a|]. JEE max/min of A sin + constant is this shift."
          />
        </div>
        <ChangeBoard
          title="Live readout — what just changed on the graph"
          rows={[
            {
              control: 'a amplitude',
              change: `|a| = ${Math.abs(a).toFixed(2)}${a < 0 ? ' (inverted)' : ''}; peaks at ${(d + Math.abs(a)).toFixed(2)}, troughs at ${(d - Math.abs(a)).toFixed(2)}`,
              purpose: 'sets how tall the blue wave is',
            },
            {
              control: 'b period',
              change: `T = 2π/|b| = ${formatPi(period)}  (${(2 / Math.abs(b)).toFixed(2)} half-turns per 2π)`,
              purpose: 'sets how many cycles fit in the window',
            },
            {
              control: 'c phase',
              change: `shift −c/b = ${phase.toFixed(2)}  ${phase >= 0 ? 'to the right' : 'to the left'}`,
              purpose: 'slides the wave without changing shape',
            },
            {
              control: 'd midline',
              change: `y = ${d.toFixed(2)}  (grey rail)`,
              purpose: 'lifts the oscillation off the x-axis',
            },
          ]}
        />
        <GraphFrame
          caption="Gold dashed = unchanged sin x (the reference). Blue = after a, b, c, d. Grey rails = midline and ± amplitude. Drag any toggle and only that feature should move."
          legend={[
            { color: C.cos, dash: true, name: 'sin x', role: 'original wave, not affected by the toggles' },
            { color: C.sin, name: 'a sin(bx+c)+d', role: 'the transformed wave you are building' },
          ]}
        >
          <FunctionPlot
            title="gold dashed = sin x (reference)"
            xMin={-2 * Math.PI}
            xMax={2 * Math.PI}
            yMin={-4}
            yMax={4}
            yTicks={[-3, -1, 1, 3]}
            curves={[
              { f: Math.sin, color: C.cos, dash: true, width: 1.4, label: 'sin x' },
              { f: (x) => a * Math.sin(b * x + c) + d, color: C.sin, width: 2.4, label: 'a sin(bx+c)+d' },
            ]}
            guides={[
              { y: d, color: C.guide, label: 'midline d' },
              { y: d + Math.abs(a), label: '+|a|' },
              { y: d - Math.abs(a), label: '−|a|' },
              { x: phase, label: 'phase' },
            ]}
          />
        </GraphFrame>
      </FormulaCard>

      <FormulaCard
        id="phase-cos-sin"
        title="Phase: cosine is a shifted sine"
        formula="\cos x=\sin\!\left(x+\frac{\pi}{2}\right)"
        meaning="The cosine graph is the sine graph slid left by π/2. No new shape — only a phase of π/2. This is why a sin x + b cos x can always be written as one sine with a phase."
        tags="phase cosine sine shift"
      >
        <FunctionPlot
          title="slide sine left by π/2 → cosine"
          xMin={-2 * Math.PI}
          xMax={2 * Math.PI}
          yMin={-1.7}
          yMax={1.7}
          curves={[
            { f: Math.sin, color: C.sin, label: 'sin x' },
            { f: Math.cos, color: C.cos, label: 'cos x' },
            { f: (x) => Math.sin(x + Math.PI / 2), color: C.prod, dash: true, label: 'sin(x+π/2)' },
          ]}
          guides={[{ x: -Math.PI / 2 }]}
        />
      </FormulaCard>
    </section>
  )
}
