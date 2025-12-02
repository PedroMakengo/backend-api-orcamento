import nodemailer from "nodemailer";
// import { Resend } from "resend";

export async function sendVerificationEmail(
  email: string,
  token: string,
  type?: string,
  otp?: String
) {
  // const resend = new Resend(process.env);
  // const resend = new Resend("re_h3kP9ags_PzkHMTxUK1iucLR38FDGEWBL");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

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
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #51a2ff 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif; letter-spacing: 0.5px;">
                CRM Orçamento
              </h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 50px 40px;">
              <h2 style="margin: 0 0 24px 0; color: #1f2937; font-size: 24px; font-family: Arial, sans-serif; font-weight: 600;">
                Bem-vindo à nossa plataforma! 🎉
              </h2>
              
              <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                Obrigado por se registrar no <strong>CRM Orçamento</strong>. Estamos felizes em tê-lo conosco!
              </p>
              
              <p style="margin: 0 0 32px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                Para ativar sua conta, use o código de verificação abaixo:
              </p>
              
              <!-- OTP Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0;">
                <tr>
                  <td style="text-align: center;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 3px dashed #51a2ff; border-radius: 12px; padding: 24px 48px;">
                      <tr>
                        <td style="text-align: center;">
                          <span style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #51a2ff; font-family: 'Courier New', Courier, monospace; display: inline-block;">
                            ${otp}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0;">
                <tr>
                  <td style="text-align: center; background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px 20px; border-radius: 8px;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; font-family: Arial, sans-serif;">
                      ⏱️ Este código expira em <strong>10 minutos</strong>
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0;">
                <tr>
                  <td style="border-top: 1px solid #e5e7eb; padding: 20px 0;">
                    <p style="margin: 0 0 16px 0; color: #6b7280; font-size: 14px; font-family: Arial, sans-serif; text-align: center;">
                      Ou clique no link abaixo para verificar:
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Link -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 16px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <p style="display: block; word-break: break-all; font-size: 13px; color: #51a2ff; text-decoration: none; font-family: 'Courier New', Courier, monospace; line-height: 1.6;">
                      ${verificationUrl}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 40px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px; font-family: Arial, sans-serif; line-height: 1.5;">
                      Se você não criou esta conta, pode ignorar este e-mail com segurança.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 13px; font-family: Arial, sans-serif;">
                      © ${new Date().getFullYear()} CRM Orçamento. Todos os direitos reservados.
                    </p>
                    <p style="margin: 0; color: #d1d5db; font-size: 12px; font-family: Arial, sans-serif;">
                      Sua Empresa Lda. | Luanda, Angola
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
        
        <!-- Extra spacing for mobile -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 20px auto 0;">
          <tr>
            <td style="text-align: center; padding: 20px;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px; font-family: Arial, sans-serif;">
                Este é um e-mail automático, por favor não responda.
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

  await transporter.sendMail({
    from: '"CRM - ORÇAMENTO" <no-reply@seudominio.com>',
    to: email,
    subject,
    html,
  });

  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject,
  //   html,
  // });

  // await resend.emails.send({
  //   from: '"CRM - ORÇAMENTO" <onboarding@resend.dev>',
  //   to: email,
  //   subject: subject,
  //   html: html,
  // });
}
