import { prisma } from "../../lib/prisma";

class DeleteUserService {
  async execute(id: string) {
    const user = await prisma.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("Wrong username or password");
    }

    const userDelete = await prisma.usuario.delete({
      where: {
        id,
      },
    });

    return userDelete;
  }
}

export { DeleteUserService };
