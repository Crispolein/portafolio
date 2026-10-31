import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import Carousel from './Carousel'
import i18n from '../i18n'

afterEach(cleanup)

const slides = [1, 2, 3, 4].map((n) => ({ src: `/shots/x-${n}.webp`, alt: `Pantalla ${n}` }))
const setup = () => render(<Carousel label="Capturas del sistema" slides={slides} />)
const visible = () => screen.getAllByRole('img').filter((img) => !img.closest('[hidden]') && !img.closest('button'))

describe('Carousel', () => {
  it('es una región carrusel con una sola captura visible y la insignia de datos ficticios', () => {
    setup()
    const region = screen.getByRole('region', { name: 'Capturas del sistema' })
    expect(region).toHaveAttribute('aria-roledescription', 'carousel')
    expect(visible().map((i) => i.getAttribute('alt'))).toEqual(['Pantalla 1'])
    expect(within(region).getByText(i18n.t('carousel.demo'))).toBeInTheDocument()
    expect(screen.getByText('01 / 04')).toBeInTheDocument()
  })

  it('siguiente y anterior avanzan y dan la vuelta', async () => {
    const user = userEvent.setup()
    setup()
    await user.click(screen.getByRole('button', { name: i18n.t('carousel.next') }))
    expect(visible().map((i) => i.getAttribute('alt'))).toEqual(['Pantalla 2'])
    expect(screen.getByText('02 / 04')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: i18n.t('carousel.prev') }))
    await user.click(screen.getByRole('button', { name: i18n.t('carousel.prev') }))
    expect(visible().map((i) => i.getAttribute('alt'))).toEqual(['Pantalla 4'])
  })

  it('las miniaturas saltan a su captura y marcan aria-current', async () => {
    const user = userEvent.setup()
    setup()
    const thumbs = within(screen.getByRole('group', { name: i18n.t('carousel.thumbs') })).getAllByRole('button')
    expect(thumbs).toHaveLength(4)
    await user.click(thumbs[2])
    expect(visible().map((i) => i.getAttribute('alt'))).toEqual(['Pantalla 3'])
    expect(thumbs[2]).toHaveAttribute('aria-current', 'true')
    expect(thumbs[0]).not.toHaveAttribute('aria-current')
  })

  it('las flechas del teclado cambian de captura con el foco dentro', async () => {
    const user = userEvent.setup()
    setup()
    screen.getByRole('button', { name: i18n.t('carousel.next') }).focus()
    await user.keyboard('{ArrowRight}')
    expect(visible().map((i) => i.getAttribute('alt'))).toEqual(['Pantalla 2'])
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(visible().map((i) => i.getAttribute('alt'))).toEqual(['Pantalla 4'])
  })

  it('anuncia el cambio en una región polite', () => {
    setup()
    expect(screen.getByText('01 / 04')).toHaveAttribute('aria-live', 'polite')
  })
})
