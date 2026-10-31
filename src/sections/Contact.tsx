import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'

type FormState = 'idle' | 'sending' | 'success' | 'error'

const EMPTY = { name: '', email: '', message: '', website: '' }

const fieldCls =
  'min-h-6 w-full rounded border border-line bg-term p-3 font-sans text-[15px] text-txt ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-amb'
const labelCls = 'flex flex-col gap-1.5 text-[13px] text-mut'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState(EMPTY)
  const [state, setState] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Honeypot filled: a bot. Pretend success without hitting the API.
    if (form.website) {
      setState('success')
      setForm(EMPTY)
      return
    }
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setState('success')
      setForm(EMPTY)
    } catch {
      setState('error')
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="rv mt-[72px] sm:mt-[120px]">
      <div className="flex items-baseline justify-between gap-4 font-mono text-[13px] text-mut">
        <span>{t('contact.label')}</span>
        <span>{t('contact.side')}</span>
      </div>
      <div className="mt-7 grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h2
            id="contact-title"
            className="m-0 text-[40px] font-extrabold leading-none tracking-[-.03em] sm:text-[56px] [font-variation-settings:'wdth'_80]"
          >
            {t('contact.title')}
          </h2>
          <p className="mt-4 text-base leading-[1.6] text-mut">{t('contact.sub')}</p>
        </div>

        <form onSubmit={handleSubmit} className="relative flex flex-col gap-3.5">
          {/* Honeypot: hidden from assistive tech and keyboard; bots fill it */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <label className={labelCls}>
            {t('contact.name')}
            <input
              name="name"
              autoComplete="name"
              className={fieldCls}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </label>
          <label className={labelCls}>
            {t('contact.email')}
            <input
              name="email"
              type="email"
              autoComplete="email"
              className={fieldCls}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </label>
          <label className={labelCls}>
            {t('contact.message')}
            <textarea
              name="message"
              rows={5}
              className={`${fieldCls} resize-y`}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              required
            />
          </label>

          <Button
            type="submit"
            arrow={state !== 'sending'}
            disabled={state === 'sending'}
            aria-busy={state === 'sending'}
            className="self-start"
          >
            {state === 'sending' ? t('contact.sending') : t('contact.send')}
          </Button>

          <p role="status" className="m-0 min-h-5 font-mono text-[13px] text-ok">
            {state === 'success' && t('contact.success')}
          </p>
          {state === 'error' && (
            <p role="alert" className="m-0 font-mono text-[13px] text-amb">
              {t('contact.error')}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
