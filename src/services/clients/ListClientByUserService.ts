import { prisma } from "../../lib/prisma";

class ListClientByUserService {
  async execute(userId: string) {
    const clients = await prisma.cliente.findMany({
      where: {
        usuarioId: userId,
      },
    });

    return clients;
  }
}

export { ListClientByUserService };
