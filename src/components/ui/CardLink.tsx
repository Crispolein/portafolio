import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'

interface CardLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  /** Lets the router handle a plain click; modified clicks keep native behavior. */
  onNavigate?: () => void
  children: ReactNode
}

export default function CardLink({
  href,
  onNavigate,
  onClick,
  className = '',
  children,
  ...rest
}: CardLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (
      !onNavigate ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    onNavigate()
  }

  return (
    <a
      {...rest}
      href={href}
      onClick={handleClick}
      className={`group flex items-end justify-between gap-4 border border-line transition-[color,border-color] duration-[160ms] ease-out hover:border-amb focus-visible:border-amb ${className}`.trim()}
    >
      <span className="block min-w-0 flex-1">{children}</span>
      <span
        aria-hidden="true"
        className="inline-block text-amb transition-transform duration-200 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1"
      >
        →
      </span>
    </a>
  )
}
