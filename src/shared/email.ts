// import nodemailer from "nodemailer";
import { Resend } from "resend";

export async function sendVerificationEmail(
  email: string,
  token: string,
  type?: string,
  otp?: String
) {
  // const resend = new Resend(process.env);
  const resend = new Resend("re_h3kP9ags_PzkHMTxUK1iucLR38FDGEWBL");

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });

  const frontendUrl =
    process.env.FRONTEND_URL || "https://crm-orcamento.vercel.app";
  let subject = "";
  let html = "";

  switch (type) {
    case "REGISTER":
      const verificationUrl = `${frontendUrl}/verify?token=${token}`;
      subject = "Confirme sua conta - CRM Orçamento";
      html = `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação de Conta</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
      <td style="padding: 20px 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #51a2ff; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-family: Arial, sans-serif;">
                CRM Orçamento
              </h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 22px; font-family: Arial, sans-serif;">
                Bem-vindo à nossa plataforma!
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.5; font-family: Arial, sans-serif;">
                Obrigado por se registrar. Para ativar sua conta, use o código de verificação abaixo:
              </p>
              
              <!-- OTP Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td style="text-align: center;">
                    <div style="display: inline-block; background-color: #f8f9fa; border: 2px dashed ##51a2ff; border-radius: 8px; padding: 20px 40px;">
                      <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: ##51a2ff; font-family: 'Courier New', monospace;">
                        ${otp}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 30px 0; color: #666666; font-size: 14px; text-align: center; font-family: Arial, sans-serif;">
                Este código expira em <strong>10 minutos</strong>
              </p>
              
              <p style="margin: 30px 0 0 0; color: #999999; font-size: 14px; line-height: 1.5; font-family: Arial, sans-serif;">
                Copie e cole este link no seu navegador:
              </p>
              
              <p style="margin: 10px 0 0 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px; word-break: break-all; font-size: 12px; color: #666666; font-family: 'Courier New', monospace;">
                ${verificationUrl}
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="margin: 0 0 10px 0; color: #999999; font-size: 13px; font-family: Arial, sans-serif;">
                Se você não criou esta conta, ignore este e-mail.
              </p>
              
              <p style="margin: 10px 0 0 0; color: #999999; font-size: 12px; font-family: Arial, sans-serif;">
                © ${new Date().getFullYear()} CRM Orçamento. Todos os direitos reservados.
              </p>
              
              <p style="margin: 10px 0 0 0; color: #bbbbbb; font-size: 11px; font-family: Arial, sans-serif;">
                Sua Empresa Lda. | Endereço da Empresa | Luanda, Angola
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
      break;
    case "FORGOT":
      const forgotUrl = `${frontendUrl}/reset-password?token=${token}`;
      subject = "Redefinição de senha";
      html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #FF9800;">Solicitação de Senha</h2>
      <p style="margin-bottom: 20px;">Você solicitou a redefinição de senha para a sua conta.</p>
      
      <p style="margin-bottom: 30px;">Clique no link abaixo para **criar uma nova senha**:</p>
      
      <a 
        href="${forgotUrl}"
        style="
          display: inline-block; 
          padding: 10px 20px; 
          font-size: 16px; 
          color: #ffffff; 
          background-color: #FF9800; 
          border-radius: 5px; 
          text-decoration: none;
        "
      >
        Redefinir Senha
      </a>
      
      <p style="margin-top: 40px; font-size: 12px; color: #888;">
        Este link expirará em breve. Se você não solicitou esta alteração, ignore este e-mail.
      </p>
    </div>
  `;
      break;
    case "SEND-NOTIFICATION-ORCAMENTO":
      subject = "Redefinição de senha";
      html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #FF9800;">Solicitação de Senha</h2>
            <p style="margin-bottom: 20px;">Você solicitou a redefinição de senha para a sua conta.</p>
            
            <p style="margin-bottom: 30px;">Clique no link abaixo para **criar uma nova senha**:</p>
            
            <p style="margin-top: 40px; font-size: 12px; color: #888;">
              Este link expirará em breve. Se você não solicitou esta alteração, ignore este e-mail.
            </p>
          </div>
        `;
      break;
  }

  // await transporter.sendMail({
  //   from: '"CRM - ORÇAMENTO" <no-reply@seudominio.com>',
  //   to: email,
  //   subject,
  //   html,
  // });

  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject,
  //   html,
  // });

  await resend.emails.send({
    from: '"CRM - ORÇAMENTO" <onboarding@resend.dev>',
    to: email,
    subject: subject,
    html: html,
  });
}
