import { act, cleanup, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react'
import { createElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { linkClickHandler, navigate, useRoute } from './route'

beforeEach(() => {
  window.history.replaceState(null, '', '/')
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('route', () => {
  it('useRoute reads the current pathname', () => {
    window.history.replaceState(null, '', '/proyectos/job-hunter')
    const { result } = renderHook(() => useRoute())
    expect(result.current).toBe('/proyectos/job-hunter')
  })

  it('navigate pushes state, updates useRoute and scrolls to top', () => {
    const push = vi.spyOn(window.history, 'pushState')
    const { result } = renderHook(() => useRoute())
    act(() => navigate('/proyectos/cv-optimizer'))
    expect(push).toHaveBeenCalledWith(null, '', '/proyectos/cv-optimizer')
    expect(result.current).toBe('/proyectos/cv-optimizer')
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })

  it('popstate updates useRoute', () => {
    const { result } = renderHook(() => useRoute())
    act(() => {
      window.history.pushState(null, '', '/proyectos/job-hunter')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(result.current).toBe('/proyectos/job-hunter')
  })

  it('moves focus to the h1 after navigating', async () => {
    render(createElement('h1', { tabIndex: -1 }, 'Título'))
    act(() => navigate('/proyectos/cv-optimizer'))
    await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveFocus())
  })
})

describe('linkClickHandler', () => {
  const click = (init: MouseEventInit) => {
    const { getByText } = render(
      createElement('a', { href: '/proyectos/job-hunter', onClick: linkClickHandler('/proyectos/job-hunter') }, 'go'),
    )
    fireEvent.click(getByText('go'), init)
  }

  it('navigates on a plain click', () => {
    const push = vi.spyOn(window.history, 'pushState')
    click({ button: 0 })
    expect(push).toHaveBeenCalledWith(null, '', '/proyectos/job-hunter')
  })

  it.each([{ metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { button: 1 }])(
    'does not navigate with %o',
    (init) => {
      const push = vi.spyOn(window.history, 'pushState')
      click(init)
      expect(push).not.toHaveBeenCalled()
    },
  )
})
