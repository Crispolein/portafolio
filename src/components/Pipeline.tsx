import type { CSSProperties } from 'react'

export type Orientation = 'horizontal' | 'vertical'

interface PipelineProps {
  nodes: [string, string][]
  aiNodes: number[]
  ariaLabel: string
  orientation: Orientation
}

const H_X = [36, 178, 320, 462, 604]
const V_Y = [24, 65, 105, 145, 186]

const packetStyle = (path: string): CSSProperties => ({
  offsetPath: `path('${path}')`,
  offsetAnchor: '0 0',
  offsetRotate: '0deg',
})

export default function Pipeline({ nodes, aiNodes, ariaLabel, orientation }: PipelineProps) {
  const vertical = orientation === 'vertical'
  const last = nodes.length - 1
  const stroke = (i: number) => (aiNodes.includes(i) ? 'var(--amb)' : 'var(--cy)')

  return (
    <svg
      viewBox={vertical ? '0 0 358 210' : '0 0 640 120'}
      width="100%"
      role="img"
      aria-label={ariaLabel}
      className="block"
    >
      {vertical ? (
        <line x1="40" y1="24" x2="40" y2="186" stroke="var(--line)" strokeWidth="2" />
      ) : (
        <line x1="24" y1="40" x2="616" y2="40" stroke="var(--line)" strokeWidth="2" />
      )}
      {nodes.map(([name, sub], i) => {
        const ai = aiNodes.includes(i)
        const isEnd = i === last
        const isStart = i === 0
        const circle = isStart || isEnd
        const cx = vertical ? 40 : H_X[i]
        const cy = vertical ? V_Y[i] : 40
        const r = vertical ? 7 : 8
        const side = vertical ? 20 : 28
        const shapeProps = {
          'data-node': i,
          fill: 'var(--term)',
          stroke: isEnd && !ai ? 'var(--ok)' : stroke(i),
          strokeWidth: 2,
          className: isEnd ? 'pipe-end' : undefined,
        }
        return (
          <g key={i}>
            {circle ? (
              <circle cx={cx} cy={cy} r={r} {...shapeProps} />
            ) : (
              <rect x={cx - side / 2} y={cy - side / 2} width={side} height={side} {...shapeProps} />
            )}
            {vertical ? (
              <text x="64" y={cy + 4} fontSize="12" fill={ai ? 'var(--amb)' : 'var(--txt)'}>
                {name} <tspan fill="var(--mut)" fontSize="10.5">{sub}</tspan>
              </text>
            ) : (
              <g textAnchor="middle" fontSize="11.5">
                <text x={cx} y="80" fill={ai ? 'var(--amb)' : 'var(--txt)'}>{name}</text>
                <text x={cx} y="98" fill="var(--mut)" fontSize="10.5">{sub}</text>
              </g>
            )}
          </g>
        )
      })}
      {vertical ? (
        <rect
          className="pipe-packet"
          width="14"
          height="22"
          rx="2"
          fill="var(--amb)"
          style={packetStyle('M33 13 V 175')}
        />
      ) : (
        <rect
          className="pipe-packet"
          width="22"
          height="14"
          rx="2"
          fill="var(--amb)"
          style={packetStyle('M24 33 H 592')}
        />
      )}
    </svg>
  )
}
