import { useEffect, useRef, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import Carousel, { type Slide } from './Carousel'

interface LightboxProps {
  open: boolean
  onClose: () => void
  label: string
  slides: Slide[]
  returnFocus: RefObject<HTMLElement | null>
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function Lightbox({ open, onClose, label, slides, returnFocus }: LightboxProps) {
  const { t } = useTranslation()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const trigger = returnFocus.current
    return () => {
      document.body.style.overflow = previous
      trigger?.focus()
    }
  }, [open, returnFocus])

  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // Listen on document: clicking a non-focusable area moves focus to body, outside the dialog.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        // Carousel handles arrows itself when focus is inside it; otherwise forward to its buttons.
        if (event.defaultPrevented) return
        const name = t(event.key === 'ArrowRight' ? 'carousel.next' : 'carousel.prev')
        dialogRef.current?.querySelector<HTMLButtonElement>(`button[aria-label="${name}"]`)?.click()
        event.preventDefault()
        return
      }
      if (event.key !== 'Tab') return
      const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      const outside = !dialogRef.current?.contains(active)
      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, t])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 transition-opacity duration-[160ms] ease-out motion-reduce:transition-none"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="max-h-full w-full max-w-4xl overflow-y-auto rounded-lg border border-line bg-bg p-4"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-ac">
            {t('lightbox.demoBadge')}
          </span>
          <button
            ref={closeRef}
            type="button"
            aria-label={t('lightbox.close')}
            onClick={onClose}
            className="grid size-11 place-items-center rounded-md border border-line font-mono text-lg text-txt transition-[color,border-color] duration-[160ms] ease-out hover:border-ac hover:text-ac motion-reduce:transition-none"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <Carousel label={label} slides={slides} />
      </div>
    </div>,
    document.body,
  )
}
