import nodemailer from "nodemailer";

export async function sendVerificationEmail(
  email: string,
  token: string,
  type?: string,
  products?: any
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  let subject = "";
  let html = "";

  switch (type) {
    case "REGISTER":
      const verificationUrl = `${frontendUrl}/verify?token=${token}`;
      subject = "Confirme sua conta";
      html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #4CAF50;">Bem-vindo(a)!</h2>
      <p style="margin-bottom: 20px;">Obrigado por se registrar!</p>
      
      <p style="margin-bottom: 30px;">Clique no link abaixo para **ativar sua conta**:</p>
      
      <a 
        href="${verificationUrl}" 
        style="
          display: inline-block; 
          padding: 10px 20px; 
          font-size: 16px; 
          color: #ffffff; 
          background-color: #4CAF50; 
          border-radius: 5px; 
          text-decoration: none;
        "
      >
        Confirmar E-mail
      </a>
      
      <p style="margin-top: 40px; font-size: 12px; color: #888;">
        Se você não se cadastrou em nosso serviço, ignore este e-mail.
      </p>
    </div>
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
  }

  await transporter.sendMail({
    from: '"CRM - ORÇAMENTO" <no-reply@seudominio.com>',
    to: email,
    subject,
    html,
  });
}
