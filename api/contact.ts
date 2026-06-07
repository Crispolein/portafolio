import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const esc = (s: string) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

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

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const safeName = esc(name)
  const safeEmail = esc(email)
  const safeMessage = esc(message).replace(/\n/g, '<br/>')

  try {
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'chris.rangel.intriago@gmail.com',
      replyTo: email,
      subject: `Contacto portafolio — ${safeName}`,
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
