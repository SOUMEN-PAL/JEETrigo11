import { FunctionPlot } from '../components/FunctionPlot'
import { FormulaCard, PlotRow } from '../components/FormulaCard'
import { Tex } from '../components/Tex'
import { C } from '../lib/plot'

export function Integration() {
  return (
    <section id="integral" className="section">
      <h2>6. Integration (signed area)</h2>
      <p className="section-lead">
        A definite integral is the signed area between the curve and the x-axis: green above, red below. Amplitude is height; the integral is how much “ink” is trapped, not that height.
      </p>

      <FormulaCard
        id="int-sin"
        title="Area under sine, 0 to π"
        formula="\int_0^{\pi}\sin x\,dx=\bigl[-\cos x\bigr]_0^{\pi}=2"
        meaning="One hump of sine has height 1 but area 2. The antiderivative −cos x reads off that accumulated area: it goes from −1 to +1, a net change of 2."
        tags="integral sin area definite"
      >
        <PlotRow>
          <FunctionPlot
            title="shaded area = 2  (not the amplitude 1)"
            xMin={-0.4}
            xMax={2 * Math.PI + 0.3}
            yMin={-1.6}
            yMax={1.6}
            curves={[{ f: Math.sin, color: C.sin, label: 'sin' }]}
            area={{ f: Math.sin, from: 0, to: Math.PI }}
            guides={[{ x: 0 }, { x: Math.PI }]}
          />
          <FunctionPlot
            title="running integral ≈ 1 − cos x"
            xMin={-0.4}
            xMax={2 * Math.PI + 0.3}
            yMin={-0.3}
            yMax={2.4}
            yTicks={[1, 2]}
            curves={[
              { f: (x) => 1 - Math.cos(x), color: C.sum, label: '1−cos x' },
            ]}
            guides={[{ y: 2 }, { x: Math.PI }]}
          />
        </PlotRow>
      </FormulaCard>

      <FormulaCard
        id="int-full"
        title="Full period: areas cancel"
        formula="\int_0^{2\pi}\sin x\,dx=0"
        meaning="Green hump (+2) and red trough (−2) cancel. Signed area is 0 even though the geometric ink is 4. JEE: ‘net area’ vs ‘total area’ are different questions."
        tags="signed area cancel period"
      >
        <FunctionPlot
          title="green +2, red −2, net 0"
          xMin={-0.3}
          xMax={2 * Math.PI + 0.3}
          yMin={-1.7}
          yMax={1.7}
          curves={[{ f: Math.sin, color: C.sin }]}
          area={{ f: Math.sin, from: 0, to: 2 * Math.PI }}
        />
        <div className="callout">
          Total geometric area = <Tex math="\int_0^{2\pi}|\sin x|\,dx=4" />.
        </div>
      </FormulaCard>

      <FormulaCard
        id="int-odd-even"
        title="Odd / even over a symmetric interval"
        formula="\int_{-\pi}^{\pi}\sin x\,dx=0\qquad \int_{-\pi}^{\pi}\cos x\,dx=0"
        meaning="sin is odd: left red cancels right green. cos is even, but over a full number of periods the positive and negative lobes still cancel. Odd integrand on [−a,a] dies; even one doubles the [0,a] piece — here that piece itself nets to 0."
        tags="odd even definite integral symmetric"
      >
        <PlotRow>
          <FunctionPlot
            title="odd sin on [−π, π] nets 0"
            yMin={-1.7}
            yMax={1.7}
            curves={[{ f: Math.sin, color: C.sin }]}
            area={{ f: Math.sin, from: -Math.PI, to: Math.PI }}
          />
          <FunctionPlot
            title="even cos, still net 0 over full periods"
            yMin={-1.7}
            yMax={1.7}
            curves={[{ f: Math.cos, color: C.cos }]}
            area={{ f: Math.cos, from: -Math.PI, to: Math.PI }}
          />
        </PlotRow>
      </FormulaCard>

      <FormulaCard
        id="int-table"
        title="Standard antiderivatives"
        formula="\int\sin x=-\cos x,\ \int\cos x=\sin x,\ \int\sec^2 x=\tan x,\ \int\csc^2 x=-\cot x"
        meaning="∫ tan x = −ln|cos x| = ln|sec x|. ∫ sec x = ln|sec x + tan x|. ∫ csc x = ln|csc x − cot x|. ∫ cot x = ln|sin x|. (constants omitted)"
        tags="integral table tan sec csc cot"
      >
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>integrand</th>
                <th>antiderivative</th>
                <th>graph meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Tex math="\sin x" />
                </td>
                <td>
                  <Tex math="-\cos x" />
                </td>
                <td>area of sine = drop in cosine</td>
              </tr>
              <tr>
                <td>
                  <Tex math="\cos x" />
                </td>
                <td>
                  <Tex math="\sin x" />
                </td>
                <td>area of cosine = rise in sine</td>
              </tr>
              <tr>
                <td>
                  <Tex math="\sec x\tan x" />
                </td>
                <td>
                  <Tex math="\sec x" />
                </td>
                <td>undoes (sec x)′</td>
              </tr>
              <tr>
                <td>
                  <Tex math="\csc x\cot x" />
                </td>
                <td>
                  <Tex math="-\csc x" />
                </td>
                <td>undoes (csc x)′</td>
              </tr>
            </tbody>
          </table>
        </div>
      </FormulaCard>

      <FormulaCard
        id="int-sin2"
        title="Power-reduce before integrating"
        formula="\int\sin^2 x\,dx=\int\frac{1-\cos 2x}{2}\,dx=\frac{x}{2}-\frac{\sin 2x}{4}+C"
        meaning="sin²x is always ≥ 0, so its area on [0, π] is the green region — no cancellation. Average height of sin² over a period is 1/2, so area over [0, π] is π/2."
        tags="sin^2 power reduce integral"
      >
        <FunctionPlot
          title="area of sin² on [0, π] = π/2"
          xMin={-0.3}
          xMax={2 * Math.PI + 0.3}
          yMin={-0.2}
          yMax={1.3}
          yTicks={[0.5, 1]}
          curves={[
            { f: (x) => Math.sin(x) ** 2, color: C.sin, label: 'sin²' },
            { f: () => 0.5, color: C.cos, dash: true, label: 'avg 1/2' },
          ]}
          area={{ f: (x) => Math.sin(x) ** 2, from: 0, to: Math.PI }}
          guides={[{ x: 0 }, { x: Math.PI }]}
        />
      </FormulaCard>
    </section>
  )
}
