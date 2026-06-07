import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

type FormState = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
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
      setForm({ name: '', email: '', message: '' })
    } catch {
      setState('error')
    }
  }

  const inputCls = `w-full bg-[#161b22] border border-white/[0.07] text-white
                    px-4 py-3 rounded-lg text-[14px] outline-none
                    focus:border-[rgba(240,165,0,0.4)] transition-colors placeholder:text-[#4b5563]`

  const LINKS = [
    { icon: '📧', text: 'chris.rangel.intriago@gmail.com', href: 'mailto:chris.rangel.intriago@gmail.com', variant: 'amber' as const },
    { icon: '💼', text: 'linkedin.com/in/christianrangelintriago', href: 'https://cl.linkedin.com/in/christian-elias-rangel-intriago-85a8a1293', variant: 'sky' as const },
    { icon: '🐙', text: 'github.com/Crispolein', href: 'https://github.com/Crispolein', variant: 'amber' as const },
  ]

  return (
    <section
      id="contact"
      className="px-8 py-16"
      style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(240,165,0,0.05), transparent)' }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] text-amber uppercase tracking-[3px] mb-2">{t('contact.label')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-white mb-3">{t('contact.title')}</h2>
            <p className="text-[15px] text-[#6b7280] leading-[1.7] mb-6">{t('contact.sub')}</p>

            <div className="flex flex-col gap-3">
              {LINKS.map(({ icon, text, href, variant }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer"
                   className="flex items-center gap-3 text-[14px] text-[#6b7280] hover:text-white transition-colors">
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${
                    variant === 'amber'
                      ? 'bg-amber-dim border border-amber'
                      : 'bg-sky-dim border border-sky'
                  }`}>
                    {icon}
                  </span>
                  {text}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <input
              className={inputCls}
              placeholder={t('contact.name')}
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <input
              type="email"
              className={inputCls}
              placeholder={t('contact.email')}
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <textarea
              className={`${inputCls} min-h-[110px] resize-y`}
              placeholder={t('contact.message')}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              required
            />

            <button
              type="submit"
              disabled={state === 'sending'}
              className="w-full bg-amber text-black py-3 rounded-lg font-bold text-[14px]
                         hover:bg-[rgba(240,165,0,0.9)] disabled:opacity-60 transition-colors"
            >
              {state === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>

            {state === 'success' && (
              <p className="text-green-400 text-[13px] text-center">{t('contact.success')}</p>
            )}
            {state === 'error' && (
              <p className="text-red-400 text-[13px] text-center">{t('contact.error')}</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
