import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'solid' | 'ghost'

interface CommonProps {
  variant?: Variant
  /** Trailing arrow; decorative, hidden from assistive tech. */
  arrow?: boolean
  className?: string
  children: ReactNode
}

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'> & { href: string }
type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }

export type ButtonProps = AnchorProps | NativeButtonProps

const base =
  'group inline-flex min-h-[50px] items-center justify-center gap-2 rounded px-[22px] text-base font-bold ' +
  'border transition-[color,background-color,border-color] duration-[160ms] ease-out ' +
  '[&:not(:disabled)]:active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-50 aria-busy:cursor-progress ' +
  'max-sm:w-full'

const variants: Record<Variant, string> = {
  solid: 'bg-amb border-amb text-term [&:not(:disabled)]:hover:bg-amb-hi [&:not(:disabled)]:hover:border-amb-hi',
  ghost: 'bg-transparent border-line text-txt [&:not(:disabled)]:hover:border-mut [&:not(:disabled)]:hover:bg-[rgba(216,225,240,.04)]',
}

const arrowClass =
  'inline-block transition-transform duration-200 ease-[cubic-bezier(.2,.8,.2,1)] group-[&:not(:disabled):hover]:translate-x-[3px]'

export default function Button(props: ButtonProps) {
  const { variant = 'solid', arrow = false, className = '', children, ...rest } = props
  const cls = `${base} ${variants[variant]} ${className}`.trim()
  const content = (
    <>
      {children}
      {arrow && (
        <span aria-hidden="true" className={arrowClass}>
          →
        </span>
      )}
    </>
  )

  if (typeof rest.href === 'string') {
    return (
      <a {...(rest as AnchorProps)} className={cls}>
        {content}
      </a>
    )
  }

  const { type = 'button', ...buttonRest } = rest as NativeButtonProps
  return (
    <button {...buttonRest} type={type} className={cls}>
      {content}
    </button>
  )
}
