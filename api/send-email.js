import tls from 'node:tls';

/**
 * Standard Library TLS Gmail SMTP Client
 * Authenticates with uxhub09@gmail.com via port 465 (implicit TLS)
 */
function sendSmtpEmail({ to = 'uxhub09@gmail.com', replyTo, subject, text }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(465, 'smtp.gmail.com', {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2'
    });

    let step = 0;
    let buffer = '';

    const send = (str) => {
      socket.write(str + '\r\n');
    };

    socket.setEncoding('utf-8');

    socket.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const lastLine = lines[lines.length - 1] || '';

      const match = lastLine.match(/^(\d{3})\s/);
      if (!match) return;

      const code = parseInt(match[1], 10);
      buffer = '';

      if (code >= 400) {
        socket.destroy();
        return reject(new Error(`SMTP Error ${code}: ${lastLine}`));
      }

      if (step === 0 && code === 220) {
        step = 1;
        send('EHLO localhost');
      } else if (step === 1 && code === 250) {
        step = 2;
        send('AUTH LOGIN');
      } else if (step === 2 && code === 334) {
        step = 3;
        send(Buffer.from('uxhub09@gmail.com').toString('base64'));
      } else if (step === 3 && code === 334) {
        step = 4;
        send(Buffer.from('jbhrdwhzmrmkahdh').toString('base64'));
      } else if (step === 4 && code === 235) {
        step = 5;
        send('MAIL FROM:<uxhub09@gmail.com>');
      } else if (step === 5 && code === 250) {
        step = 6;
        send(`RCPT TO:<${to}>`);
      } else if (step === 6 && code === 250) {
        step = 7;
        send('DATA');
      } else if (step === 7 && code === 354) {
        step = 8;
        const rfcDate = new Date().toUTCString();
        const b64Subject = Buffer.from(subject || 'New Form Submission').toString('base64');
        const cleanText = (text || '').replace(/^\./gm, '..').replace(/\r?\n/g, '\r\n');
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
        ].filter(Boolean).join('\r\n');

        send(mailContent);
      } else if (step === 8 && code === 250) {
        step = 9;
        send('QUIT');
        socket.end();
        resolve({ success: true });
      }
    });

    socket.on('error', (err) => {
      reject(err);
    });

    socket.setTimeout(15000, () => {
      socket.destroy();
      reject(new Error('SMTP connection timed out after 15s'));
    });
  });
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    body = body || {};

    await sendSmtpEmail({
      to: 'uxhub09@gmail.com',
      replyTo: body.replyTo || (body.formData && body.formData.email),
      subject: body.subject || '[UX Hub Lead] Form Submission',
      text: body.text || JSON.stringify(body.formData || body, null, 2)
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully via Gmail SMTP' });
  } catch (error) {
    console.error('[SMTP Send Error]:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
