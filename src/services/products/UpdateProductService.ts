import { prisma } from "../../lib/prisma";
import type { ProductRequest } from "../../models/interfaces/product/ProductRequest";

class UpdateProductService {
  async execute(id: string, data: ProductRequest) {
    const payload = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    const updated = await prisma.produto.update({
      where: { id },
      data: payload,
    });

    return updated;
  }
}

export { UpdateProductService };
