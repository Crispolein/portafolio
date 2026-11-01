import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef, useState } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import Lightbox from './Lightbox'
import i18n from '../i18n'

afterEach(cleanup)

const slides = [1, 2, 3].map((n) => ({ src: `/shots/x-${n}.webp`, alt: `Pantalla ${n}` }))

function Harness({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen)
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <>
      <button ref={ref} onClick={() => setOpen(true)}>
        abrir
      </button>
      <Lightbox open={open} onClose={() => setOpen(false)} label="Visor" slides={slides} returnFocus={ref} />
    </>
  )
}

const visible = () =>
  screen
    .getAllByRole('img')
    .filter((img) => !img.closest('[hidden]') && !img.closest('button'))
    .map((i) => i.getAttribute('alt'))

describe('Lightbox', () => {
  it('cerrado no renderiza nada', () => {
    render(<Harness />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('abierto es un dialog modal con insignia y botón cerrar, y bloquea el scroll del fondo', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'abrir' }))
    const dialog = screen.getByRole('dialog', { name: 'Visor' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByText(i18n.t('lightbox.demoBadge'))).toBeInTheDocument()
    expect(screen.getByRole('button', { name: i18n.t('lightbox.close') })).toHaveFocus()
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('Esc cierra, devuelve el foco al disparador y restaura el scroll', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const trigger = screen.getByRole('button', { name: 'abrir' })
    await user.click(trigger)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(trigger).toHaveFocus()
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('las flechas navegan aunque el foco esté en el botón cerrar', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'abrir' }))
    expect(visible()).toEqual(['Pantalla 1'])
    await user.keyboard('{ArrowRight}')
    expect(visible()).toEqual(['Pantalla 2'])
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(visible()).toEqual(['Pantalla 3'])
  })

  it('el foco queda atrapado dentro del dialog', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'abrir' }))
    const dialog = screen.getByRole('dialog')
    for (let i = 0; i < 15; i++) {
      await user.tab()
      expect(dialog.contains(document.activeElement)).toBe(true)
    }
    for (let i = 0; i < 15; i++) {
      await user.tab({ shift: true })
      expect(dialog.contains(document.activeElement)).toBe(true)
    }
  })

  it('el botón cerrar cierra', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'abrir' }))
    await user.click(screen.getByRole('button', { name: i18n.t('lightbox.close') }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('Esc, flechas y Tab siguen funcionando tras hacer clic en un área no enfocable', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'abrir' }))
    const dialog = screen.getByRole('dialog')
    await user.click(dialog)
    await user.keyboard('{ArrowRight}')
    expect(visible()).toEqual(['Pantalla 2'])
    await user.click(dialog)
    await user.tab()
    expect(dialog.contains(document.activeElement)).toBe(true)
    await user.click(dialog)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('clic en el fondo cierra; clic dentro del dialog no', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'abrir' }))
    await user.click(screen.getByRole('dialog'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await user.click(screen.getByRole('dialog').parentElement as HTMLElement)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('respeta reduced motion: sin transiciones en el fondo ni en el botón cerrar', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'abrir' }))
    expect(screen.getByRole('dialog').parentElement?.className).toContain('motion-reduce:transition-none')
    expect(screen.getByRole('button', { name: i18n.t('lightbox.close') }).className).toContain(
      'motion-reduce:transition-none',
    )
  })
})
