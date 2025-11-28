import { prisma } from "../../lib/prisma";

class ListProductByUserService {
  async execute(userId: string) {
    const products = await prisma.produto.findMany({
      where: {
        usuarioId: userId,
      },
    });

    return products;
  }
}

export { ListProductByUserService };
