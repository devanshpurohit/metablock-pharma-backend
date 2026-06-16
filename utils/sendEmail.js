import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, html, text }) => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || '"Roidspharma" <noreply@roidspharma.com>';

  console.log(`\n==================================================`);
  console.log(`[EMAIL] Sending to: ${to}`);
  console.log(`[EMAIL] Subject: ${subject}`);
  console.log(`[EMAIL] SMTP_USER: ${user}`);
  console.log(`[EMAIL] SMTP_HOST: ${host}:${port}`);
  console.log(`[EMAIL] Pass loaded: ${pass ? 'YES (' + pass.length + ' chars)' : 'NO - MISSING!'}`);
  console.log(`==================================================\n`);

  if (!host || !user || !pass) {
    console.error('[EMAIL] ERROR: SMTP credentials missing in .env! Email NOT sent.');
    return { success: false, error: 'SMTP credentials not configured' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,   // true only for port 465 (SSL)
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,    // allow self-signed certs
        ciphers: 'SSLv3'
      }
    });

    // Verify connection before sending
    await transporter.verify();
    console.log('[EMAIL] SMTP connection verified OK');

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    console.log(`[EMAIL] ✅ Sent successfully! MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error(`[EMAIL] ❌ FAILED to send email:`, error.message);
    console.error(`[EMAIL] Full error:`, error);
    return { success: false, error: error.message };
  }
};
