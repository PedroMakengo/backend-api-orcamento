import { prisma } from "../../../lib/prisma";

class VerifyUserTokenService {
  async execute(token: string, otp: string) {
    if (!token) {
      throw new Error("Token missing");
    }

    const user = await prisma.usuario.findFirst({
      where: { verifyToken: token },
    });

    if (!user) {
      throw new Error("Invalid token");
    }

    await prisma.usuario.update({
      where: { id: user.id, codigoOTP: otp },
      data: { verifyToken: "null", activo: true, codigoOTP: "null" },
    });

    return "Token verified successfully";
  }
}

export { VerifyUserTokenService };
