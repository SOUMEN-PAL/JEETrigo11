import { FunctionPlot } from '../components/FunctionPlot'
import { FormulaCard, PlotRow } from '../components/FormulaCard'
import { Tex } from '../components/Tex'
import { C } from '../lib/plot'

const alpha = Math.PI / 6
const k = Math.sin(alpha)

function markSinSolutions() {
  const pts = []
  for (let n = -2; n <= 2; n++) {
    pts.push({
      x: n * Math.PI + ((-1) ** n) * alpha,
      y: k,
      color: C.der,
    })
  }
  return pts.filter((p) => p.x >= -2 * Math.PI - 0.01 && p.x <= 2 * Math.PI + 0.01)
}

export function Equations() {
  return (
    <section id="equations" className="section">
      <h2>4. Equations (roots of the graph)</h2>
      <p className="section-lead">
        Solving <Tex math="f(\theta)=k" /> is finding where the curve meets the horizontal line{' '}
        <Tex math="y=k" />. Periodicity then copies those hits forever.
      </p>

      <FormulaCard
        id="eq-sin"
        title="Sine equation"
        formula="\sin\theta=\sin\alpha \;\Rightarrow\; \theta=n\pi+(-1)^n\alpha,\quad n\in\mathbb{Z}"
        caveat="If |k|>1 there is no real solution of sin θ = k."
        meaning="The line y = sin α cuts sine twice per 2π period: once on the way up (α) and once on the way down (π−α). The general formula walks those two families."
        tags="equation sin general solution"
      >
        <FunctionPlot
          title="y = sin(π/6) cutting sin θ"
          xMin={-2 * Math.PI}
          xMax={2 * Math.PI}
          yMin={-1.6}
          yMax={1.6}
          curves={[{ f: Math.sin, color: C.sin, label: 'sin θ' }]}
          guides={[{ y: k, color: C.der, dash: false }]}
          points={markSinSolutions()}
        />
      </FormulaCard>

      <FormulaCard
        id="eq-cos"
        title="Cosine equation"
        formula="\cos\theta=\cos\alpha \;\Rightarrow\; \theta=2n\pi\pm\alpha,\quad n\in\mathbb{Z}"
        meaning="Cosine is even about 0, so +α and −α are both hits, then copy every 2π. Graph: the line y = cos α meets cosine at a symmetric pair around each multiple of 2π."
        tags="equation cos general solution"
      >
        <FunctionPlot
          title="y = cos(π/3) cutting cos θ"
          xMin={-2 * Math.PI}
          xMax={2 * Math.PI}
          yMin={-1.6}
          yMax={1.6}
          curves={[{ f: Math.cos, color: C.cos, label: 'cos θ' }]}
          guides={[{ y: 0.5, color: C.der, dash: false }]}
          points={[
            { x: Math.PI / 3, y: 0.5, color: C.der },
            { x: -Math.PI / 3, y: 0.5, color: C.der },
            { x: 2 * Math.PI - Math.PI / 3, y: 0.5, color: C.der },
            { x: -2 * Math.PI + Math.PI / 3, y: 0.5, color: C.der },
          ]}
        />
      </FormulaCard>

      <FormulaCard
        id="eq-tan"
        title="Tangent equation"
        formula="\tan\theta=\tan\alpha \;\Rightarrow\; \theta=n\pi+\alpha,\quad n\in\mathbb{Z}"
        caveat="Exclude points where cos θ = 0. One solution per period π, not 2π."
        meaning="tan repeats every π, so there is only one intersection with y = tan α in each (asymptote, asymptote) gap. Dots sit one period apart."
        tags="equation tan general solution"
      >
        <PlotRow>
          <FunctionPlot
            title="y = 1 cutting tan θ  (α=π/4)"
            xMin={-2 * Math.PI}
            xMax={2 * Math.PI}
            yMin={-4}
            yMax={4}
            yTicks={[-3, -1, 1, 3]}
            curves={[{ f: Math.tan, color: C.prod, label: 'tan' }]}
            guides={[{ y: 1, color: C.der, dash: false }]}
            points={[-2, -1, 0, 1, 2].map((n) => ({
              x: n * Math.PI + Math.PI / 4,
              y: 1,
              color: C.der,
            }))}
          />
        </PlotRow>
      </FormulaCard>
    </section>
  )
}
