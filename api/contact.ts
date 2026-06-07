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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body as {
    name: string
    email: string
    message: string
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
    await resend.emails.send({
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
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
