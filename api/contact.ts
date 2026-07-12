import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// RFC-5321 email, no CR/LF/angle brackets/commas, max 254 chars
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
const LIMITS = { name: 100, email: 254, message: 4000 }

const esc = (s: string) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

// Strip characters that could be used for email-header injection in the subject
const stripHeaderChars = (s: string) => s.replace(/[\r\n<>,]/g, ' ').trim()

// ponytail: throttle per-instancia (se resetea en cold start); subir a KV/Upstash solo si el spam persiste
const RATE = { max: 3, windowMs: 10 * 60 * 1000 }
const hits = new Map<string, number[]>()

const isRateLimited = (ip: string) => {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE.windowMs)
  if (recent.length >= RATE.max) return true
  recent.push(now)
  hits.set(ip, recent)
  return false
}

const isAllowedOrigin = (origin: string | undefined) => {
  if (!origin) return true // curl/same-origin sin header: lo cubren honeypot + throttle
  const allowed = process.env.SITE_ORIGIN
  if (allowed && origin === allowed) return true
  try {
    return new URL(origin).hostname.endsWith('.vercel.app')
  } catch {
    return false
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!isAllowedOrigin(req.headers.origin as string | undefined)) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const ip =
    (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0].trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' })
  }

  const { name, email, message, website } = req.body as {
    name: string
    email: string
    message: string
    website?: string
  }

  // Honeypot: campo oculto que solo los bots llenan — responder OK sin enviar
  if (website) {
    return res.status(200).json({ ok: true })
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return res.status(400).json({ error: 'Field too long' })
  }

  if (!EMAIL_RE.test(email) || /[\r\n<>,]/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const safeName = esc(name)
  const safeEmail = esc(email)
  const safeMessage = esc(message).replace(/\n/g, '<br/>')
  const safeSubjectName = stripHeaderChars(name)

  try {
    // Resend v4 no lanza en errores de API: devuelve { data, error }
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'chris.rangel.intriago@gmail.com',
      replyTo: email,
      subject: `Contacto portafolio — ${safeSubjectName}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>Nuevo mensaje desde el portafolio</h2>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${safeMessage}</p>
      `,
    })
    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
