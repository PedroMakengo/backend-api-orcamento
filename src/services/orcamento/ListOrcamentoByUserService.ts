import { prisma } from "../../lib/prisma";

class ListOrcamentoByUserService {
  async execute(userId: string) {
    const orcamentos = await prisma.orcamento.findMany({
      where: {
        usuarioId: userId,
      },
      include: {
        itens: true,
      },
    });

    return orcamentos;
  }
}

export { ListOrcamentoByUserService };
