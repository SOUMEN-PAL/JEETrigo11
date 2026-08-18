import { useState } from 'react'
import { FunctionPlot } from '../components/FunctionPlot'
import { ChangeBoard, FormulaCard, GraphFrame, PlotRow, Slider } from '../components/FormulaCard'
import { C } from '../lib/plot'

export function Differentiation() {
  const [x0, setX0] = useState(0.7)
  const [x1, setX1] = useState(0.5)
  const [k, setK] = useState(2)

  return (
    <section id="diff" className="section">
      <h2>5. Differentiation (slope of the graph)</h2>
      <p className="section-lead">
        The derivative at a point is the slope of the tangent. The derivative <em>function</em> is the graph of those slopes. For sine, that slope-graph is cosine.
      </p>

      <FormulaCard
        id="d-sin"
        title="Slope of sine is cosine"
        formula="\frac{d}{dx}\sin x=\cos x"
        meaning="Orange dashed line: tangent to sin x at the movable point. Its slope equals the height of the gold cosine at that same x. When sine is at a peak, the tangent is flat and cosine is 0."
        tags="derivative sin cos slope tangent"
      >
        <Slider
          label="x₀ — point of tangency"
          value={x0}
          min={-Math.PI}
          max={Math.PI}
          step={0.02}
          onChange={setX0}
          does="slides the orange dot along sine and redraws the tangent. The gold cosine’s height at that x is exactly this tangent’s slope."
          why="the derivative at a point is a slope. This toggle lets you check: peak of sine ⇒ flat tangent ⇒ cos = 0."
        />
        <ChangeBoard
          rows={[
            {
              control: 'x₀',
              change: `${x0.toFixed(2)}  on the sine curve (orange dot)`,
              purpose: 'where you are measuring slope',
            },
            {
              control: 'What changed',
              change: `tangent slope = cos(${x0.toFixed(2)}) = ${Math.cos(x0).toFixed(3)}`,
              purpose: 'that number is the y-value of the gold cosine graph',
            },
          ]}
        />
        <GraphFrame
          caption="Blue = sin x. Gold dashed = cos x (the slope graph). Orange dashed = tangent at x₀. Drag x₀: when the tangent is flat, gold is on the axis."
          legend={[
            { color: C.sin, name: 'sin x', role: 'the curve you differentiate' },
            { color: C.cos, dash: true, name: 'cos x', role: 'height = slope of sine at that x' },
            { color: C.der, dash: true, name: 'tangent', role: 'local linear picture of the derivative' },
          ]}
        >
          <FunctionPlot
            title="sin (blue), tangent (orange), cos (gold)"
            curves={[
              { f: Math.sin, color: C.sin, label: 'sin' },
              { f: Math.cos, color: C.cos, dash: true, label: 'cos = slope' },
            ]}
            tangent={{ x0, f: Math.sin, df: Math.cos }}
            points={[{ x: x0, y: Math.sin(x0), color: C.der, label: 'x₀' }]}
          />
        </GraphFrame>
      </FormulaCard>

      <FormulaCard
        id="d-cos"
        title="Slope of cosine is −sine"
        formula="\frac{d}{dx}\cos x=-\sin x"
        meaning="Cosine is sine slid left; its slopes are sine’s slopes slid the same way, which is −sin x. At a cosine peak the tangent is still flat."
        tags="derivative cos -sin"
      >
        <Slider
          label="x₀ — point of tangency"
          value={x1}
          min={-Math.PI}
          max={Math.PI}
          step={0.02}
          onChange={setX1}
          does="moves the tangent along cosine. Slope equals −sin(x₀), the magenta graph’s height."
          why="same idea as sine, shifted: cosine’s derivative is −sine, not sine."
        />
        <ChangeBoard
          rows={[
            {
              control: 'x₀',
              change: `${x1.toFixed(2)}  on cosine`,
              purpose: 'where the orange tangent sits',
            },
            {
              control: 'What changed',
              change: `slope = −sin(${x1.toFixed(2)}) = ${(-Math.sin(x1)).toFixed(3)}`,
              purpose: 'matches the magenta −sin x curve at this x',
            },
          ]}
        />
        <GraphFrame
          caption="Gold = cos x. Magenta dashed = −sin x (its slope graph). Drag x₀ onto a cosine peak: tangent goes flat, magenta hits 0."
          legend={[
            { color: C.cos, name: 'cos x', role: 'the curve' },
            { color: C.prod, dash: true, name: '−sin x', role: 'the derivative graph' },
          ]}
        >
          <FunctionPlot
            title="cos (gold), tangent, −sin (magenta)"
            curves={[
              { f: Math.cos, color: C.cos, label: 'cos' },
              { f: (x) => -Math.sin(x), color: C.prod, dash: true, label: '−sin' },
            ]}
            tangent={{ x0: x1, f: Math.cos, df: (x) => -Math.sin(x) }}
            points={[{ x: x1, y: Math.cos(x1), color: C.der, label: 'x₀' }]}
          />
        </GraphFrame>
      </FormulaCard>

      <FormulaCard
        id="d-rest"
        title="The rest of the six"
        formula="(\tan x)'=\sec^2 x,\ (\cot x)'=-\csc^2 x,\ (\sec x)'=\sec x\tan x,\ (\csc x)'=-\csc x\cot x"
        meaning="Where tan is steep (near an asymptote), sec² is huge — the derivative graph blows up at the same walls. The picture is: steeper original ⇒ taller derivative."
        tags="derivative tan sec cot csc"
      >
        <PlotRow>
          <FunctionPlot
            title="tan and sec² (slope)"
            yMin={-6}
            yMax={6}
            yTicks={[-4, -2, 2, 4]}
            curves={[
              { f: Math.tan, color: C.prod, label: 'tan' },
              { f: (x) => 1 / Math.cos(x) ** 2, color: C.der, dash: true, label: 'sec²' },
            ]}
          />
          <FunctionPlot
            title="sec and sec tan"
            yMin={-6}
            yMax={6}
            yTicks={[-4, -2, 2, 4]}
            curves={[
              { f: (x) => 1 / Math.cos(x), color: C.sum, label: 'sec' },
              {
                f: (x) => (1 / Math.cos(x)) * Math.tan(x),
                color: C.der,
                dash: true,
                label: "sec'",
              },
            ]}
          />
        </PlotRow>
      </FormulaCard>

      <FormulaCard
        id="d-chain"
        title="Chain rule: faster wave, taller slope"
        formula="\frac{d}{dx}\sin(ax+b)=a\cos(ax+b)"
        meaning="Increasing a squeezes the sine (more wiggles in the same window) so each rise/fall is steeper. The derivative’s amplitude is |a|, not 1. Extra factor a is that steepness."
        tags="chain rule sin(ax+b)"
      >
        <Slider
          label="a — inner frequency (chain-rule toggle)"
          value={k}
          min={0.5}
          max={4}
          step={0.1}
          onChange={setK}
          does={`squeezes sin(${k.toFixed(1)}x) into more cycles, so each rise is steeper. The orange derivative’s height becomes ${k.toFixed(1)}, not 1.`}
          why="chain rule: d/dx sin(ax) = a cos(ax). The extra factor a is visible as a taller slope graph."
        />
        <ChangeBoard
          rows={[
            {
              control: 'a',
              change: `a = ${k.toFixed(1)}  →  period of sine is ${((2 * Math.PI) / k).toFixed(2)}`,
              purpose: 'how fast the inner angle ax runs',
            },
            {
              control: 'What changed',
              change: `derivative amplitude = ${k.toFixed(1)}  (was 1 when a = 1)`,
              purpose: 'steeper wave ⇒ taller derivative — that is the chain-rule factor',
            },
          ]}
        />
        <GraphFrame
          caption="Blue = sin(ax). Orange dashed = a cos(ax). Drag a up: blue gets more wiggles, orange gets taller. That extra height is the a in the chain rule."
          legend={[
            { color: C.sin, name: 'sin(ax)', role: 'faster oscillation when a grows' },
            { color: C.der, dash: true, name: 'a cos(ax)', role: 'slope graph; amplitude = a' },
          ]}
        >
          <FunctionPlot
            title={`sin(${k.toFixed(1)}x) and ${k.toFixed(1)} cos(${k.toFixed(1)}x)`}
            xMin={-Math.PI}
            xMax={Math.PI}
            yMin={-5}
            yMax={5}
            yTicks={[-4, -2, 2, 4]}
            curves={[
              { f: (x) => Math.sin(k * x), color: C.sin, label: 'sin(ax)' },
              { f: (x) => k * Math.cos(k * x), color: C.der, dash: true, label: 'a cos(ax)' },
            ]}
          />
        </GraphFrame>
      </FormulaCard>
    </section>
  )
}
