import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Button from './Button'
import CardLink from './CardLink'

// globals are off, so RTL does not auto-clean between tests
afterEach(cleanup)

describe('Button', () => {
  it('renders a button with type=button when there is no href', () => {
    render(<Button>Enviar</Button>)
    const el = screen.getByRole('button', { name: 'Enviar' })
    expect(el.tagName).toBe('BUTTON')
    expect(el).toHaveAttribute('type', 'button')
  })

  it('respects an explicit type', () => {
    render(<Button type="submit">Enviar</Button>)
    expect(screen.getByRole('button', { name: 'Enviar' })).toHaveAttribute('type', 'submit')
  })

  it('renders an anchor with href', () => {
    render(<Button href="/caso">Ver caso</Button>)
    const el = screen.getByRole('link', { name: 'Ver caso' })
    expect(el.tagName).toBe('A')
    expect(el).toHaveAttribute('href', '/caso')
    expect(el).not.toHaveAttribute('type')
  })

  it('passes download, target and rel to the anchor', () => {
    render(
      <Button href="/cv.pdf" download target="_blank" rel="noopener noreferrer">
        CV
      </Button>,
    )
    const el = screen.getByRole('link', { name: 'CV' })
    expect(el).toHaveAttribute('download')
    expect(el).toHaveAttribute('target', '_blank')
    expect(el).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('hides the arrow from assistive tech and keeps the accessible name', () => {
    const { container } = render(
      <Button href="/x" arrow>
        Ir
      </Button>,
    )
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
    expect(screen.getByRole('link', { name: 'Ir' })).toBeInTheDocument()
  })

  it('supports disabled and aria-busy on the button', () => {
    render(
      <Button disabled aria-busy="true">
        Enviando
      </Button>,
    )
    const el = screen.getByRole('button', { name: 'Enviando' })
    expect(el).toBeDisabled()
    expect(el).toHaveAttribute('aria-busy', 'true')
  })

  it('uses amber for solid and line border for ghost', () => {
    render(
      <>
        <Button variant="solid">A</Button>
        <Button variant="ghost">B</Button>
      </>,
    )
    expect(screen.getByRole('button', { name: 'A' }).className).toContain('bg-amb')
    expect(screen.getByRole('button', { name: 'B' }).className).toContain('border-line')
  })
})

describe('CardLink', () => {
  it('renders a block anchor with its accessible name', () => {
    render(<CardLink href="/caso/a">Sistema A</CardLink>)
    const el = screen.getByRole('link', { name: 'Sistema A' })
    expect(el.tagName).toBe('A')
    expect(el).toHaveAttribute('href', '/caso/a')
  })

  it('calls onNavigate on a plain click and prevents default', () => {
    const onNavigate = vi.fn()
    render(
      <CardLink href="/caso/a" onNavigate={onNavigate}>
        Sistema A
      </CardLink>,
    )
    const notPrevented = fireEvent.click(screen.getByRole('link', { name: 'Sistema A' }))
    expect(onNavigate).toHaveBeenCalledTimes(1)
    expect(notPrevented).toBe(false)
  })

  it.each([
    ['ctrl', { ctrlKey: true }],
    ['meta', { metaKey: true }],
  ])('does not call onNavigate with %s click', (_n, mod) => {
    const onNavigate = vi.fn()
    render(
      <CardLink href="/caso/a" onNavigate={onNavigate}>
        Sistema A
      </CardLink>,
    )
    fireEvent.click(screen.getByRole('link', { name: 'Sistema A' }), mod)
    expect(onNavigate).not.toHaveBeenCalled()
  })

  it('marks the trailing arrow aria-hidden', () => {
    const { container } = render(<CardLink href="/x">X</CardLink>)
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
  })
})
