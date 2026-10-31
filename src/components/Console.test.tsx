import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Console from './Console'
import Pipeline from './Pipeline'
import { systems } from '../data/systems'

afterEach(cleanup)

function stubMatchMedia(matches: boolean) {
  const listeners = new Set<(e: { matches: boolean }) => void>()
  const mql = {
    matches,
    addEventListener: (_: string, cb: (e: { matches: boolean }) => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: (e: { matches: boolean }) => void) => listeners.delete(cb),
  }
  vi.stubGlobal('matchMedia', vi.fn(() => mql))
  return { fire: (m: boolean) => listeners.forEach((cb) => cb({ matches: m })) }
}

beforeEach(() => {
  stubMatchMedia(false)
})

describe('systems data', () => {
  it('lists the four systems in order', () => {
    expect(systems.map((s) => s.id)).toEqual(['telemetria', 'automatizacion', 'cvOptimizer', 'jobHunter'])
    expect(systems.every((s) => s.aiNodes.every((i) => i >= 0 && i < 5))).toBe(true)
  })
})

describe('Console', () => {
  it('renders 4 radios with the first checked', () => {
    render(<Console />)
    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(4)
    expect(radios[0]).toHaveAttribute('aria-checked', 'true')
    expect(radios[1]).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    expect(radios.map((r) => r.getAttribute('tabindex'))).toEqual(['0', '-1', '-1', '-1'])
  })

  it('ArrowRight checks the second radio and focuses it', () => {
    render(<Console />)
    const radios = screen.getAllByRole('radio')
    fireEvent.keyDown(radios[0], { key: 'ArrowRight' })
    expect(radios[1]).toHaveAttribute('aria-checked', 'true')
    expect(radios[1]).toHaveFocus()
    expect(radios[1]).toHaveAttribute('tabindex', '0')
  })

  it('End checks the last, ArrowRight wraps, ArrowLeft and Home work', () => {
    render(<Console />)
    const radios = screen.getAllByRole('radio')
    fireEvent.keyDown(radios[0], { key: 'End' })
    expect(radios[3]).toHaveAttribute('aria-checked', 'true')
    fireEvent.keyDown(radios[3], { key: 'ArrowRight' })
    expect(radios[0]).toHaveAttribute('aria-checked', 'true')
    fireEvent.keyDown(radios[0], { key: 'ArrowLeft' })
    expect(radios[3]).toHaveAttribute('aria-checked', 'true')
    fireEvent.keyDown(radios[3], { key: 'Home' })
    expect(radios[0]).toHaveAttribute('aria-checked', 'true')
  })

  it('changes the pipeline aria-label, what and log with the system', () => {
    render(<Console />)
    const first = screen.getByRole('img').getAttribute('aria-label')
    const firstWhat = screen.getByText('Backend en producción · Migtra')
    expect(firstWhat).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('radio')[3])
    const last = screen.getByRole('img').getAttribute('aria-label')
    expect(last).not.toBe(first)
    expect(last).toMatch(/Celery/)
    expect(screen.getByText('FastAPI · 116+ endpoints')).toBeInTheDocument()
    expect(screen.queryByText('Backend en producción · Migtra')).not.toBeInTheDocument()
  })

  it('switches to vertical when the media query changes', () => {
    const mm = stubMatchMedia(false)
    const { container } = render(<Console />)
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 640 120')
    mm.fire(true)
    return Promise.resolve().then(() => {
      expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 358 210')
    })
  })
})

describe('Pipeline', () => {
  const nodes: [string, string][] = [['a', 'a1'], ['b', 'b1'], ['c', 'c1'], ['d', 'd1'], ['e', 'e1']]
  it('is an img with aria-label and marks AI nodes amber', () => {
    const { container } = render(<Pipeline nodes={nodes} aiNodes={[3]} ariaLabel="demo" orientation="horizontal" />)
    expect(screen.getByRole('img', { name: 'demo' })).toBeInTheDocument()
    expect(container.querySelectorAll('[stroke="var(--amb)"]').length).toBe(1)
    expect(container.querySelector('[data-node="3"]')).toHaveAttribute('stroke', 'var(--amb)')
    expect(container.querySelector('[data-node="1"]')).toHaveAttribute('stroke', 'var(--cy)')
  })
})
