import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { CreateUserRequest } from "../../models/interfaces/user/CreateUserRequest";
import { v4 as uuid } from "uuid";
import { sendVerificationEmail } from "../../shared/email";

class CreateUserService {
  async execute({ nome, email, senha, activo, perfil }: CreateUserRequest) {
    const password = await bcrypt.hash(senha, 10);

    const token = uuid();

    const otp = crypto.randomInt(0, 10000).toString().padStart(5, "0");

    // Se o email foi enviado com sucesso, cria o usuário
    const userExists = await prisma.usuario.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new Error("Já existe uma conta criada com este e-mail");
    }

    const user = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: password,
        activo: false,
        perfil,
        verifyToken: token,
        codigoOTP: otp,
      },
    });

    // Tenta enviar o email ANTES de criar o usuário
    await sendVerificationEmail(email, token, "REGISTER", otp);

    return user;
  }
}

export { CreateUserService };
