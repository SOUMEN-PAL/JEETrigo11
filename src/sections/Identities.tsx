import { useState } from 'react'
import { FunctionPlot } from '../components/FunctionPlot'
import { ChangeBoard, FormulaCard, GraphFrame, PlotRow, Slider } from '../components/FormulaCard'
import { Tex } from '../components/Tex'
import { C } from '../lib/plot'

export function Identities() {
  const [aa, setAa] = useState(3)
  const [bb, setBb] = useState(4)
  const [n, setN] = useState(8)
  const [m, setM] = useState(7)
  const R = Math.hypot(aa, bb)
  const alpha = Math.atan2(bb, aa)
  const diff = n - m
  const sumF = n + m

  return (
    <section id="identities" className="section">
      <h2>3. Identities as graph operations</h2>
      <p className="section-lead">
        An identity is two different recipes for the same curve. Below, each algebraic move is shown as what it does to the picture: square, multiply, add, or re-phase.
      </p>

      <FormulaCard
        id="pythagoras"
        title="Squares add to a constant"
        formula="\sin^2 x+\cos^2 x=1"
        meaning="sin²x (blue fill of a squared wave) and cos²x (gold) always sum to the flat line y=1. The two dashed squares trade height: when one is 0 the other is 1."
        tags="pythagorean identity sin^2 cos^2"
      >
        <FunctionPlot
          title="sin² + cos² = 1 (teal flat)"
          xMin={-Math.PI}
          xMax={Math.PI}
          yMin={-0.2}
          yMax={1.4}
          yTicks={[1]}
          curves={[
            { f: (x) => Math.sin(x) ** 2, color: C.sin, label: 'sin²' },
            { f: (x) => Math.cos(x) ** 2, color: C.cos, label: 'cos²' },
            {
              f: (x) => Math.sin(x) ** 2 + Math.cos(x) ** 2,
              color: C.sum,
              width: 2.4,
              label: 'sum',
            },
          ]}
        />
        <div className="callout">
          Divide by cos² or sin²: <Tex math="1+\tan^2 x=\sec^2 x,\quad 1+\cot^2 x=\csc^2 x" />.
        </div>
      </FormulaCard>

      <FormulaCard
        id="double-product"
        title="Product of sin and cos doubles the frequency"
        formula="2\sin x\cos x=\sin 2x"
        meaning="Left: sin x and cos x separately. Right: their product (then ×2) is a sine that wiggles twice as fast, with amplitude 1. Multiplication of two period-2π waves of this pair produces period-π."
        tags="double angle product 2sin cos sin2x"
      >
        <PlotRow>
          <GraphFrame
            caption="The two factors before multiplying. Drag nothing here — this is the before picture."
            legend={[
              { color: C.sin, name: 'sin x', role: 'first factor' },
              { color: C.cos, name: 'cos x', role: 'second factor' },
            ]}
          >
            <FunctionPlot
              title="factors"
              yMin={-1.6}
              yMax={1.6}
              curves={[
                { f: Math.sin, color: C.sin, label: 'sin' },
                { f: Math.cos, color: C.cos, label: 'cos' },
              ]}
            />
          </GraphFrame>
          <GraphFrame
            caption="After multiplying: magenta is sin·cos (half as tall). Teal dashed ×2 recovers orange sin 2x — frequency doubled. That is what the product did to the graph."
            legend={[
              { color: C.prod, name: 'sin·cos', role: 'product: amplitude 1/2, period π' },
              { color: C.sum, dash: true, name: '2 sin cos', role: 'scaled product, matches sin 2x' },
            ]}
          >
            <FunctionPlot
              title="product vs sin 2x"
              yMin={-1.6}
              yMax={1.6}
              curves={[
                { f: (x) => Math.sin(x) * Math.cos(x), color: C.prod, label: 'sin·cos' },
                { f: (x) => Math.sin(2 * x), color: C.der, dash: true, label: 'sin 2x' },
                { f: (x) => 2 * Math.sin(x) * Math.cos(x), color: C.sum, width: 1.4, dash: true, label: '2 sin cos' },
              ]}
            />
          </GraphFrame>
        </PlotRow>
        <p className="meaning">
          The magenta product has amplitude 1/2. Scaling by 2 (teal dash) lands exactly on sin 2x (orange dash). That is the graph of the double-angle formula.
        </p>
      </FormulaCard>

      <FormulaCard
        id="beats"
        title="Product-to-sum (beats / envelope)"
        formula="\sin A\sin B=\frac{1}{2}\bigl[\cos(A-B)-\cos(A+B)\bigr]"
        caveat="Pink (product) and teal (sum form) are the same y-values. Purple is only one term inside the sum — not a second envelope around the x-axis."
        meaning="Multiplying graphs means multiplying heights at each x. The identity then splits that product into a slow cosine plus a fast cosine. The slow cosine runs through the middle of the ripple; it does not hug the peaks."
        tags="product to sum beats envelope Werner"
      >
        <ol className="teach-steps">
          <li>
            <b>Multiply:</b> at each x, pink height = (blue height)×(gold height). That is the only operation.
          </li>
          <li>
            <b>Rewrite:</b> those same pink heights equal ½ cos((n−m)x) − ½ cos((n+m)x). Teal is that rewrite, so teal must copy pink.
          </li>
          <li>
            <b>Slow part:</b> ½ cos((n−m)x) is the <em>middle</em> of the fast ripple, not the outer cage. Peaks sit about ½ above and below it (the grey tube).
          </li>
        </ol>
        <div className="sliders">
          <Slider
            label="n — first frequency (A = nx)"
            value={n}
            min={2}
            max={10}
            step={1}
            display={String(n)}
            onChange={setN}
            does={`blue factor becomes sin(${n}x).`}
            why="A in the formula. |n−m| is how slow the middle cosine is."
          />
          <Slider
            label="m — second frequency (B = mx)"
            value={m}
            min={2}
            max={10}
            step={1}
            display={String(m)}
            onChange={setM}
            does={`gold factor becomes sin(${m}x), then the product is rebuilt.`}
            why="keep n and m close (8 and 7) so the slow middle is easy to see."
          />
        </div>
        <ChangeBoard
          title="Three different curves — do not mix them"
          rows={[
            {
              control: 'Product (pink)',
              change: `sin(${n}x) · sin(${m}x)   — heights multiplied`,
              purpose: 'the actual graph of the product',
            },
            {
              control: 'Sum form (teal)',
              change: `½ [cos(${diff}x) − cos(${sumF}x)]   — same numbers, rewritten`,
              purpose: 'must match pink. If it does, the identity is true',
            },
            {
              control: 'Slow part (purple)',
              change: `½ cos(${diff}x)   — only the first term`,
              purpose: 'runs through the middle of pink; peaks are ~½ away, not on this line',
            },
          ]}
        />
        <PlotRow>
          <GraphFrame
            caption="Factor A. Its y-value will be multiplied by gold’s y-value."
            legend={[{ color: C.sin, name: `sin ${n}x`, role: 'first factor' }]}
          >
            <FunctionPlot
              title={`sin ${n}x`}
              xMin={-Math.PI}
              xMax={Math.PI}
              yMin={-1.5}
              yMax={1.5}
              curves={[{ f: (x) => Math.sin(n * x), color: C.sin, label: `sin ${n}x` }]}
            />
          </GraphFrame>
          <GraphFrame
            caption="Factor B. Where this is 0, the product is 0."
            legend={[{ color: C.cos, name: `sin ${m}x`, role: 'second factor' }]}
          >
            <FunctionPlot
              title={`sin ${m}x`}
              xMin={-Math.PI}
              xMax={Math.PI}
              yMin={-1.5}
              yMax={1.5}
              curves={[{ f: (x) => Math.sin(m * x), color: C.cos, label: `sin ${m}x` }]}
            />
          </GraphFrame>
        </PlotRow>
        <PlotRow>
          <GraphFrame
            caption="Only the product. No teal overlay — so you can see what multiplication did, by itself."
            legend={[{ color: C.prod, name: 'product', role: 'y = sin(nx) · sin(mx)' }]}
          >
            <FunctionPlot
              title="1. product only  (multiply y-values)"
              xMin={-Math.PI}
              xMax={Math.PI}
              yMin={-1.35}
              yMax={1.35}
              curves={[{ f: (x) => Math.sin(n * x) * Math.sin(m * x), color: C.prod, width: 2.2, label: 'product' }]}
            />
          </GraphFrame>
          <GraphFrame
            caption="Only the sum form. Compare with the pink graph on the left — they should look identical. That match is the identity."
            legend={[{ color: C.sum, dash: true, name: 'sum form', role: 'y = ½[cos((n−m)x) − cos((n+m)x)]' }]}
          >
            <FunctionPlot
              title="2. sum form only  (rewrite, same y)"
              xMin={-Math.PI}
              xMax={Math.PI}
              yMin={-1.35}
              yMax={1.35}
              curves={[
                {
                  f: (x) => 0.5 * (Math.cos(diff * x) - Math.cos(sumF * x)),
                  color: C.sum,
                  dash: true,
                  width: 2.2,
                  label: 'sum form',
                },
              ]}
            />
          </GraphFrame>
        </PlotRow>
        <GraphFrame
          caption="Slow part is the purple midline, not the outer cage. Grey tube = purple ± ½, and that tube is what the fast peaks actually reach (up to ±1)."
          legend={[
            { color: C.prod, name: 'product', role: 'fast ripple (the thing you multiplied)' },
            { color: C.env, dash: true, name: 'slow part  ½ cos((n−m)x)', role: 'middle of the ripple — one term of the sum' },
            { color: C.guide, dash: true, name: 'tube  slow ± ½', role: 'where the fast cosine can push the product' },
          ]}
        >
          <FunctionPlot
            title="3. where the slow part sits (middle, not the peaks)"
            xMin={-Math.PI}
            xMax={Math.PI}
            yMin={-1.35}
            yMax={1.35}
            height={260}
            curves={[
              { f: (x) => Math.sin(n * x) * Math.sin(m * x), color: C.prod, width: 2.2, label: 'product' },
              { f: (x) => 0.5 * Math.cos(diff * x), color: C.env, dash: true, width: 2.2, label: 'slow midline' },
              { f: (x) => 0.5 * Math.cos(diff * x) + 0.5, color: C.guide, dash: true, width: 1.2, label: 'slow + ½' },
              { f: (x) => 0.5 * Math.cos(diff * x) - 0.5, color: C.guide, dash: true, width: 1.2, label: 'slow − ½' },
            ]}
          />
        </GraphFrame>
        <div className="why-grid">
          <div className="why-card">
            <h4>Why peaks go to 1 while slow part only goes to ½</h4>
            <p>
              Slow term amplitude is ½. Fast term amplitude is also ½. When they line up, ½+½=1. The old ±½ cos x cage stopped at ½, so the pink peaks stuck out. The grey tube (slow ± ½) is the cage that actually fits.
            </p>
          </div>
          <div className="why-card">
            <h4>Why pink and teal looked like one line</h4>
            <p>
              They are the same function, drawn twice. Overlaying them does not prove two things — it proves they match. They are now on two separate graphs so you can compare instead of blending.
            </p>
          </div>
        </div>
      </FormulaCard>

      <FormulaCard
        id="sum-to-product"
        title="Sum of two sines (interference) — adding, not multiplying"
        formula="\sin A+\sin B=2\sin\frac{A+B}{2}\cos\frac{A-B}{2}"
        meaning="This card adds heights (y₁+y₂). The previous card multiplied them (y₁·y₂). Addition stacks the two waves; the identity then writes that sum as a fast sine whose height is modulated by a slower cosine."
        tags="sum to product interference"
      >
        <PlotRow>
          <FunctionPlot
            title="sin 5x and sin 3x"
            xMin={-Math.PI}
            xMax={Math.PI}
            yMin={-2.4}
            yMax={2.4}
            curves={[
              { f: (x) => Math.sin(5 * x), color: C.sin, label: 'sin 5x' },
              { f: (x) => Math.sin(3 * x), color: C.cos, label: 'sin 3x' },
            ]}
          />
          <FunctionPlot
            title="sum vs 2 sin(4x) cos x"
            xMin={-Math.PI}
            xMax={Math.PI}
            yMin={-2.4}
            yMax={2.4}
            curves={[
              { f: (x) => Math.sin(5 * x) + Math.sin(3 * x), color: C.prod, label: 'sum' },
              {
                f: (x) => 2 * Math.sin(4 * x) * Math.cos(x),
                color: C.sum,
                dash: true,
                label: '2 sin4x cos x',
              },
            ]}
          />
        </PlotRow>
      </FormulaCard>

      <FormulaCard
        id="resultant"
        title="Resultant: a sin x + b cos x"
        formula="a\sin x+b\cos x=R\sin(x+\alpha),\quad R=\sqrt{a^2+b^2},\ \tan\alpha=\frac{b}{a}"
        caveat="Write R cos α = a, R sin α = b so α = atan2(b, a). Max = R, min = −R."
        meaning="Two waves of the same period add to one sine of larger amplitude R, shifted by phase α. The graph never exceeds the dashed ±R rails."
        tags="resultant R amplitude max min a sin b cos"
      >
        <div className="sliders">
          <Slider
            label="a — weight of sin x"
            value={aa}
            min={-5}
            max={5}
            step={0.1}
            onChange={setAa}
            does={`scales the blue sine to height ${aa.toFixed(1)}. The sum’s amplitude R grows with |a|.`}
            why="a is the coefficient in a sin x + b cos x. Together with b it fixes R = √(a²+b²), the max value."
          />
          <Slider
            label="b — weight of cos x"
            value={bb}
            min={-5}
            max={5}
            step={0.1}
            onChange={setBb}
            does={`scales the gold cosine to height ${bb.toFixed(1)}. Changing b also rotates the phase α of the resultant.`}
            why="b is the other piece of the resultant. tan α = b/a tells you how far the combined wave is shifted."
          />
        </div>
        <ChangeBoard
          rows={[
            {
              control: 'a (blue)',
              change: `a = ${aa.toFixed(1)}  →  blue wave height`,
              purpose: 'how much sine you pour into the mix',
            },
            {
              control: 'b (gold)',
              change: `b = ${bb.toFixed(1)}  →  gold wave height`,
              purpose: 'how much cosine you pour into the mix',
            },
            {
              control: 'Result R, α',
              change: `R = ${R.toFixed(2)},  α = ${alpha.toFixed(2)} rad. Max ${R.toFixed(2)}, min ${(-R).toFixed(2)}`,
              purpose: 'one sine of amplitude R, shifted by α — the form JEE wants',
            },
          ]}
        />
        <PlotRow>
          <GraphFrame
            caption="The two ingredients. Drag a or b: only that colour’s height should change."
            legend={[
              { color: C.sin, name: 'a sin x', role: 'sine piece, height |a|' },
              { color: C.cos, name: 'b cos x', role: 'cosine piece, height |b|' },
            ]}
          >
            <FunctionPlot
              title="pieces"
              yMin={-6}
              yMax={6}
              yTicks={[-4, -2, 2, 4]}
              curves={[
                { f: (x) => aa * Math.sin(x), color: C.sin, label: 'a sin' },
                { f: (x) => bb * Math.cos(x), color: C.cos, label: 'b cos' },
              ]}
            />
          </GraphFrame>
          <GraphFrame
            caption="Magenta = actual sum. Teal dashed = R sin(x+α), the same curve rewritten. Grey rails are ±R — the graph cannot cross them."
            legend={[
              { color: C.prod, name: 'a sin + b cos', role: 'adding the two pieces' },
              { color: C.sum, dash: true, name: 'R sin(x+α)', role: 'same wave, one sine with a phase' },
            ]}
          >
            <FunctionPlot
              title="sum = R sin(x+α)"
              yMin={-6}
              yMax={6}
              yTicks={[-4, -2, 2, 4]}
              curves={[
                { f: (x) => aa * Math.sin(x) + bb * Math.cos(x), color: C.prod, label: 'sum' },
                { f: (x) => R * Math.sin(x + alpha), color: C.sum, dash: true, label: 'R sin(x+α)' },
              ]}
              guides={[
                { y: R, label: '+R max' },
                { y: -R, label: '−R min' },
              ]}
            />
          </GraphFrame>
        </PlotRow>
      </FormulaCard>
    </section>
  )
}
