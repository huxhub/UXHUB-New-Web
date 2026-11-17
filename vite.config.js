import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tls from 'node:tls'

/**
 * Standard Library TLS Gmail SMTP Client
 * Authenticates with uxhub09@gmail.com via port 465 (implicit TLS)
 */
function sendSmtpEmail({ to = 'uxhub09@gmail.com', replyTo, subject, text }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(465, 'smtp.gmail.com', {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2'
    })

    let step = 0
    let buffer = ''

    const send = (str) => {
      socket.write(str + '\r\n')
    }

    socket.setEncoding('utf-8')

    socket.on('data', (chunk) => {
      buffer += chunk
      const lines = buffer.split(/\r?\n/).filter(Boolean)
      const lastLine = lines[lines.length - 1] || ''

      // Complete SMTP response line starts with 3 digits followed by a space
      const match = lastLine.match(/^(\d{3})\s/)
      if (!match) return

      const code = parseInt(match[1], 10)
      buffer = ''

      if (code >= 400) {
        socket.destroy()
        return reject(new Error(`SMTP Error ${code}: ${lastLine}`))
      }

      if (step === 0 && code === 220) {
        step = 1
        send('EHLO localhost')
      } else if (step === 1 && code === 250) {
        step = 2
        send('AUTH LOGIN')
      } else if (step === 2 && code === 334) {
        step = 3
        send(Buffer.from('uxhub09@gmail.com').toString('base64'))
      } else if (step === 3 && code === 334) {
        step = 4
        send(Buffer.from('jbhrdwhzmrmkahdh').toString('base64'))
      } else if (step === 4 && code === 235) {
        step = 5
        send('MAIL FROM:<uxhub09@gmail.com>')
      } else if (step === 5 && code === 250) {
        step = 6
        send(`RCPT TO:<${to}>`)
      } else if (step === 6 && code === 250) {
        step = 7
        send('DATA')
      } else if (step === 7 && code === 354) {
        step = 8
        const rfcDate = new Date().toUTCString()
        const b64Subject = Buffer.from(subject || 'New Form Submission').toString('base64')
        const cleanText = (text || '').replace(/^\./gm, '..').replace(/\r?\n/g, '\r\n')
        const mailContent = [
          'From: "UX Hub System" <uxhub09@gmail.com>',
          `To: <${to}>`,
          replyTo ? `Reply-To: <${replyTo}>` : '',
          `Subject: =?UTF-8?B?${b64Subject}?=`,
          `Date: ${rfcDate}`,
          'MIME-Version: 1.0',
          'Content-Type: text/plain; charset=UTF-8',
          'Content-Transfer-Encoding: 8bit',
          '',
          cleanText,
          '.'
        ].filter(Boolean).join('\r\n')

        send(mailContent)
      } else if (step === 8 && code === 250) {
        step = 9
        send('QUIT')
        socket.end()
        resolve({ success: true })
      }
    })

    socket.on('error', (err) => {
      reject(err)
    })

    socket.setTimeout(15000, () => {
      socket.destroy()
      reject(new Error('SMTP connection timed out after 15s'))
    })
  })
}

function smtpEmailPlugin() {
  const handleApiRequest = (req, res, next) => {
    const url = req.url ? req.url.split('?')[0] : ''
    if (url === '/api/send-email' && req.method === 'POST') {
      let raw = ''
      req.on('data', (chunk) => {
        raw += chunk
      })
      req.on('end', async () => {
        try {
          const body = JSON.parse(raw || '{}')
          await sendSmtpEmail({
            to: 'uxhub09@gmail.com',
            replyTo: body.replyTo || (body.formData && body.formData.email),
            subject: body.subject || '[UX Hub Lead] Form Submission',
            text: body.text || JSON.stringify(body.formData || body, null, 2)
          })
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true, message: 'Email sent successfully via Gmail SMTP' }))
        } catch (error) {
          console.error('[SMTP Send Error]:', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: false, error: error.message }))
        }
      })
      return
    }
    next()
  }

  return {
    name: 'vite-smtp-email-api',
    configureServer(server) {
      server.middlewares.use(handleApiRequest)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleApiRequest)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), smtpEmailPlugin()],
})

