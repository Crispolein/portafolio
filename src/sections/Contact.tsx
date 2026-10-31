import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon, { type IconName } from '../components/Icons'

type FormState = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' })
  const [state, setState] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setState('success')
      setForm({ name: '', email: '', message: '', website: '' })
    } catch {
      setState('error')
    }
  }

  const inputCls = `w-full bg-surface-2 border border-white/[0.07] text-white
                    px-4 py-3 rounded-lg text-[15px]
                    focus:border-[rgba(240,165,0,0.4)] transition-colors`
  const labelCls = 'text-[13px] font-medium text-[#d6d3d1]'

  const LINKS: { icon: IconName; text: string; href: string; variant: 'amber' | 'sky' }[] = [
    { icon: 'mail', text: 'chris.rangel.intriago@gmail.com', href: 'mailto:chris.rangel.intriago@gmail.com', variant: 'amber' },
    { icon: 'linkedin', text: 'linkedin.com/in/christianrangelintriago', href: 'https://cl.linkedin.com/in/christian-elias-rangel-intriago-85a8a1293', variant: 'sky' },
    { icon: 'github', text: 'github.com/Crispolein', href: 'https://github.com/Crispolein', variant: 'amber' },
  ]

  return (
    <section
      id="contact"
      className="px-8 py-16"
      style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(240,165,0,0.04), transparent)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-4xl font-bold text-white mb-3">{t('contact.title')}</h2>
            <p className="text-[15px] text-muted leading-[1.7] mb-6">{t('contact.sub')}</p>

            <div className="flex flex-col gap-3">
              {LINKS.map(({ icon, text, href, variant }) => (
                <a key={href} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                   className="flex items-center gap-3 text-[14px] text-muted hover:text-white transition-colors">
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    variant === 'amber'
                      ? 'bg-amber-dim border border-amber text-amber'
                      : 'bg-sky-dim border border-sky text-sky-accent'
                  }`}>
                    <Icon name={icon} size={16} />
                  </span>
                  {text}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} aria-busy={state === 'sending'} className="flex flex-col gap-4 relative">
            {/* Honeypot anti-bots: invisible para usuarios, los bots lo llenan */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className={labelCls}>{t('contact.name')}</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                className={inputCls}
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className={labelCls}>{t('contact.email')}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                className={inputCls}
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className={labelCls}>{t('contact.message')}</label>
              <textarea
                id="contact-message"
                name="message"
                className={`${inputCls} min-h-[110px] resize-y`}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
              />
            </div>

            <button
              type="submit"
              disabled={state === 'sending'}
              className="w-full bg-amber text-black py-3 rounded-lg font-bold text-[14px]
                         hover:bg-[rgba(240,165,0,0.9)] disabled:opacity-60 transition duration-150
                         active:scale-[0.98] disabled:active:scale-100"
            >
              {state === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`text-[13px] text-center min-h-[1.25rem] ${
                state === 'error' ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {state === 'success' && t('contact.success')}
              {state === 'error' && t('contact.error')}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
