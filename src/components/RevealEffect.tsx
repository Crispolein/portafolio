import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

/** Reveals every [data-reveal] inside `scope` once, when it enters the viewport.
 *  Lazy-loaded by CasePage only when the visitor allows motion, so GSAP stays out of the main chunk. */
export default function RevealEffect({ scope, slug }: { scope: RefObject<HTMLElement>; slug: string }) {
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope, dependencies: [slug], revertOnUpdate: true },
  )
  return null
}
