import katex from 'katex'
import 'katex/dist/katex.min.css'

type Props = {
  math: string
  display?: boolean
  className?: string
}

export function Tex({ math, display = false, className }: Props) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: display,
  })
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
