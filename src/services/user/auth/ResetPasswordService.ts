import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";

interface ResetPasswordRequest {
  password: string;
  token: string;
}

class ResetPasswordService {
  async execute({ password, token }: ResetPasswordRequest) {
    const user = await prisma.usuario.findFirst({
      where: { verifyToken: token },
    });

    if (!user) {
      throw new Error("User not exists token");
    }

    const hashed = await bcrypt.hash(password, 10);

    const udpate = await prisma.usuario.update({
      data: { senha: hashed, activo: true, verifyToken: "null" },

      where: {
        email: user.email,
      },
    });

    return udpate;
  }
}

export { ResetPasswordService };
