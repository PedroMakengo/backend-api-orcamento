import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";

import { CreateUserRequest } from "../../models/interfaces/user/CreateUserRequest";
import { v4 as uuid } from "uuid";
import { sendVerificationEmail } from "../../shared/email";

class CreateUserService {
  async execute({ nome, email, senha, activo, perfil }: CreateUserRequest) {
    const password = await bcrypt.hash(senha, 10);

    const token = uuid();

    const user = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: password,
        activo,
        perfil,
        verifyToken: token,
      },
    });

    await sendVerificationEmail(email, token, "REGISTER");

    return user;
  }
}

export { CreateUserService };
