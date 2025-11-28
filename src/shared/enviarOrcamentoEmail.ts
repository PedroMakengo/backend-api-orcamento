import nodemailer from "nodemailer";

interface EnviarOrcamentoEmailProps {
  to: any;
  subject: string;
  html: string;
  pdfPath: any;
}

export async function enviarOrcamentoEmail({
  to,
  subject,
  html,
  pdfPath,
}: EnviarOrcamentoEmailProps) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  return transporter.sendMail({
    from: `"${process.env.APP_NAME}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    attachments: [
      {
        filename: "orcamento.pdf",
        path: pdfPath,
        contentType: "application/pdf",
      },
    ],
  });
}
