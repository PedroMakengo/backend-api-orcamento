import { prisma } from "../../lib/prisma";
import type { ProductRequest } from "../../models/interfaces/product/ProductRequest";

class CreateProductService {
  async execute({
    nome,
    descricao,
    precoPadrao,
    unidade,
    usuarioId,
  }: ProductRequest) {
    const user = await prisma.usuario.findFirst({
      where: {
        id: usuarioId,
      },
    });

    if (!user) {
      throw new Error("Wrong username or password");
    }

    const save = await prisma.produto.create({
      data: {
        nome,
        descricao,
        precoPadrao,
        unidade,
        usuarioId,
      },
    });

    return save;
  }
}

export { CreateProductService };
