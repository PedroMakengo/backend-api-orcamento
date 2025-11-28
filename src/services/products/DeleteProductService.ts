import { prisma } from "../../lib/prisma";

class DeleteProductService {
  async execute(id: string) {
    const deleteProduct = await prisma.produto.delete({
      where: {
        id,
      },
    });

    return deleteProduct;
  }
}

export { DeleteProductService };
