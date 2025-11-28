import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { AuthUserRequest } from "../../../models/interfaces/user/AuthUserRequest";
import { prisma } from "../../../lib/prisma";

class AuthUserService {
  async execute({ email, senha }: AuthUserRequest) {
    const user = await prisma.usuario.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("Wrong username or password");
    }

    const passwordMatch = await compare(senha, user?.senha);

    if (!passwordMatch) {
      throw new Error("Wrong password");
    }

    const token = sign(
      {
        id: user.id,
        nome: user.nome,
        passwordHash: user.senha,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user?.nome,
        expiresIn: "30d",
      }
    );

    return {
      id: user?.id,
      nome: user?.nome,
      email: user?.email,
      activo: user?.activo,
      perfil: user?.perfil,
      token,
    };
  }
}

export { AuthUserService };
