import { useSyncExternalStore, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'

const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('popstate', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('popstate', listener)
  }
}

const getPath = () => window.location.pathname

export function useRoute(): string {
  return useSyncExternalStore(subscribe, getPath, () => '/')
}

function apply(path: string) {
  if (path !== window.location.pathname) {
    window.history.pushState(null, '', path)
    // Render now: a view transition snapshots the DOM right after this callback.
    flushSync(emit)
  }
  window.scrollTo(0, 0)
  // Wait for the new view to render so the announced h1 exists.
  setTimeout(() => document.querySelector<HTMLElement>('h1')?.focus(), 0)
}

const canTransition = () =>
  typeof document.startViewTransition === 'function' &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function navigate(path: string) {
  if (path !== window.location.pathname && canTransition()) {
    document.startViewTransition(() => apply(path))
  } else {
    apply(path)
  }
}

/** onClick for an internal <a href>: plain clicks navigate, modified clicks keep native behavior. */
export function linkClickHandler(path: string) {
  return (event: MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return
    }
    event.preventDefault()
    navigate(path)
  }
}
