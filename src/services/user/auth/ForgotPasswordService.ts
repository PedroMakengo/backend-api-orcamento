import { v4 as uuid } from "uuid";
import { sendVerificationEmail } from "../../../shared/email";
import { prisma } from "../../../lib/prisma";

class ForgotPasswordService {
  async execute(email: string) {
    const user = await prisma.usuario.findFirst({
      where: { email },
    });

    const token = uuid();

    if (!user) {
      throw new Error("User does not exist");
    }

    await prisma.usuario.update({
      data: { verifyToken: token },
      where: {
        email,
      },
    });

    await sendVerificationEmail(email, token, "FORGOT");

    return "Verification email sent";
  }
}

export { ForgotPasswordService };
