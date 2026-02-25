import nodemailer from "nodemailer";

type MailParams = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  from?: string;
  replyTo?: string;
};

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendEmail(params: MailParams) {
  const transporter = getTransporter();
  const defaultFrom = process.env.MAIL_FROM || process.env.SMTP_USER;
  const from = params.from || defaultFrom;

  if (!transporter || !from) {
    return { ok: false, error: "Mailer not configured" };
  }

  try {
    await transporter.sendMail({
      from,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
      replyTo: params.replyTo,
    });
    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Send failed" };
  }
}
