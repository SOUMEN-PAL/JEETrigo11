import { FunctionPlot } from '../components/FunctionPlot'
import { FormulaCard, PlotRow } from '../components/FormulaCard'
import { Tex } from '../components/Tex'
import { C } from '../lib/plot'

function Bank({ math }: { math: string }) {
  return (
    <div className="bank-item">
      <Tex math={math} display />
    </div>
  )
}

export function JeeBank() {
  return (
    <section id="bank" className="section">
      <h2>7. JEE quick bank</h2>
      <p className="section-lead">Compact formulae. Use the graphs above when you forget what the algebra is doing.</p>

      <FormulaCard
        id="compound"
        title="Compound angles"
        formula="\sin(A\pm B)=\sin A\cos B\pm\cos A\sin B"
        meaning="Adding B is a phase shift on the circle. Algebra expands that shift into the two projections of A."
        tags="compound sin(A+B) cos(A+B) tan(A+B)"
      >
        <div className="bank-grid">
          <Bank math="\cos(A\pm B)=\cos A\cos B\mp\sin A\sin B" />
          <Bank math="\tan(A\pm B)=\dfrac{\tan A\pm\tan B}{1\mp\tan A\tan B}" />
        </div>
        <p className="caveat">tan(A±B) undefined when 1 ∓ tan A tan B = 0.</p>
        <FunctionPlot
          title="sin(x+π/3) is sin x slid left by π/3"
          yMin={-1.6}
          yMax={1.6}
          curves={[
            { f: Math.sin, color: C.sin, label: 'sin x' },
            { f: (x) => Math.sin(x + Math.PI / 3), color: C.prod, label: 'sin(x+π/3)' },
          ]}
          guides={[{ x: -Math.PI / 3 }]}
        />
      </FormulaCard>

      <FormulaCard
        id="multiple"
        title="Double, triple, half"
        formula="\sin 2A=2\sin A\cos A\qquad \cos 2A=\cos^2 A-\sin^2 A=2\cos^2 A-1=1-2\sin^2 A"
        meaning="Double angle is frequency ×2 on the graph (see Identities). Triple angle folds three cycles and is a cubic in sin or cos."
        tags="double triple half angle sin3A cos3A tan2A"
      >
        <div className="bank-grid">
          <Bank math="\tan 2A=\dfrac{2\tan A}{1-\tan^2 A}" />
          <Bank math="\sin 3A=3\sin A-4\sin^3 A" />
          <Bank math="\cos 3A=4\cos^3 A-3\cos A" />
          <Bank math="\tan 3A=\dfrac{3\tan A-\tan^3 A}{1-3\tan^2 A}" />
          <Bank math="\sin^2\frac{A}{2}=\dfrac{1-\cos A}{2}" />
          <Bank math="\cos^2\frac{A}{2}=\dfrac{1+\cos A}{2}" />
          <Bank math="\tan\frac{A}{2}=\dfrac{1-\cos A}{\sin A}=\dfrac{\sin A}{1+\cos A}" />
        </div>
        <PlotRow>
          <FunctionPlot
            title="sin x vs sin 3x"
            yMin={-1.6}
            yMax={1.6}
            curves={[
              { f: Math.sin, color: C.sin, dash: true, label: 'sin' },
              { f: (x) => Math.sin(3 * x), color: C.der, label: 'sin 3x' },
            ]}
          />
        </PlotRow>
      </FormulaCard>

      <FormulaCard
        id="prosthaphaeresis"
        title="Product ↔ sum (all eight)"
        formula="2\sin A\cos B=\sin(A+B)+\sin(A-B)"
        meaning="Left: multiply two waves. Right: add two waves of frequencies A±B. Same curve, two readings."
        tags="Werner product sum 2sin cos"
      >
        <div className="bank-grid">
          <Bank math="2\cos A\sin B=\sin(A+B)-\sin(A-B)" />
          <Bank math="2\cos A\cos B=\cos(A+B)+\cos(A-B)" />
          <Bank math="2\sin A\sin B=\cos(A-B)-\cos(A+B)" />
          <Bank math="\sin C+\sin D=2\sin\frac{C+D}{2}\cos\frac{C-D}{2}" />
          <Bank math="\sin C-\sin D=2\cos\frac{C+D}{2}\sin\frac{C-D}{2}" />
          <Bank math="\cos C+\cos D=2\cos\frac{C+D}{2}\cos\frac{C-D}{2}" />
          <Bank math="\cos C-\cos D=-2\sin\frac{C+D}{2}\sin\frac{C-D}{2}" />
        </div>
      </FormulaCard>

      <FormulaCard
        id="maxmin"
        title="Max / min in one line"
        formula="-\sqrt{a^2+b^2}\le a\sin x+b\cos x\le\sqrt{a^2+b^2}"
        meaning="The rails ±R on the resultant graph. Equality at x + α = π/2 + 2nπ (max) and 3π/2 + 2nπ (min)."
        tags="maximum minimum range R"
      />

      <FormulaCard
        id="pythag-more"
        title="More Pythagorean / factor bits"
        formula="\sin^2 A-\sin^2 B=\sin(A+B)\sin(A-B)=\cos^2 B-\cos^2 A"
        meaning="These are the same product-to-sum idea, written as a difference of squares. Last line is the A+B+C=nπ tangent identity — a JEE favourite."
        tags="sin^2 difference factor"
      >
        <div className="bank-grid">
          <Bank math="\cos^2 A-\sin^2 B=\cos(A+B)\cos(A-B)" />
          <Bank math="\sin A\pm\cos A=\sqrt{2}\sin\!\left(A\pm\frac{\pi}{4}\right)" />
          <Bank math="\text{If }A+B+C=n\pi,\ \tan A+\tan B+\tan C=\tan A\tan B\tan C" />
        </div>
      </FormulaCard>
    </section>
  )
}
