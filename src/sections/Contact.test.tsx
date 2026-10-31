import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Contact from './Contact'
import Footer from '../components/Footer'
import es from '../locales/es/translation.json'

const fetchMock = vi.fn()

beforeEach(() => {
  fetchMock.mockReset()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

function fill() {
  fireEvent.change(screen.getByLabelText(es.contact.name), { target: { value: 'Ana' } })
  fireEvent.change(screen.getByLabelText(es.contact.email), { target: { value: 'ana@example.com' } })
  fireEvent.change(screen.getByLabelText(es.contact.message), { target: { value: 'Hola' } })
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: es.contact.send }))
}

describe('Contact', () => {
  it('has labelled required fields and an email input', () => {
    render(<Contact />)
    expect(screen.getByLabelText(es.contact.name)).toBeRequired()
    const email = screen.getByLabelText(es.contact.email)
    expect(email).toBeRequired()
    expect(email).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText(es.contact.message)).toBeRequired()
  })

  it('disables the button and sets aria-busy while sending', async () => {
    fetchMock.mockReturnValue(new Promise(() => {}))
    render(<Contact />)
    fill()
    submit()
    const btn = await screen.findByRole('button', { name: es.contact.sending })
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
  })

  it('posts the same payload and shows success, clearing the form', async () => {
    fetchMock.mockResolvedValue({ ok: true })
    render(<Contact />)
    fill()
    submit()
    expect(await screen.findByRole('status')).toHaveTextContent(es.contact.success)
    expect(fetchMock).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Ana', email: 'ana@example.com', message: 'Hola', website: '' }),
    })
    expect(screen.getByLabelText(es.contact.name)).toHaveValue('')
  })

  it('shows an alert and keeps the data on HTTP 500', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 })
    render(<Contact />)
    fill()
    submit()
    expect(await screen.findByRole('alert')).toHaveTextContent(es.contact.error)
    expect(screen.getByLabelText(es.contact.name)).toHaveValue('Ana')
  })

  it('shows an alert and keeps the data on network rejection', async () => {
    fetchMock.mockRejectedValue(new TypeError('network'))
    render(<Contact />)
    fill()
    submit()
    expect(await screen.findByRole('alert')).toHaveTextContent(es.contact.error)
    expect(screen.getByLabelText(es.contact.email)).toHaveValue('ana@example.com')
  })

  it('does not call fetch when the honeypot is filled', async () => {
    const { container } = render(<Contact />)
    fill()
    const trap = container.querySelector('input[name="website"]') as HTMLInputElement
    expect(trap).toHaveAttribute('aria-hidden', 'true')
    expect(trap).toHaveAttribute('tabindex', '-1')
    fireEvent.change(trap, { target: { value: 'http://spam' } })
    await act(async () => {
      submit()
    })
    await waitFor(() => expect(fetchMock).not.toHaveBeenCalled())
  })
})

describe('Footer', () => {
  it('shows updated, source link and contact channels without phone', () => {
    render(<Footer />)
    expect(screen.getByText(new RegExp(es.footer.updated))).toBeInTheDocument()
    expect(screen.getByRole('link', { name: new RegExp(es.footer.source) })).toHaveAttribute(
      'href',
      'https://github.com/Crispolein/portafolio',
    )
    expect(screen.getAllByText(es.contact.links).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link').some((a) => a.getAttribute('href')?.startsWith('tel:'))).toBe(false)
  })
})
