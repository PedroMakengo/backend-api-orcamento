import { prisma } from "../../lib/prisma";

class DeleteOrcamentoService {
  async execute(id: string) {
    const deleteOrcamento = await prisma.orcamento.delete({
      where: {
        id,
      },
    });

    const orcamento = deleteOrcamento.id;

    await prisma.orcamentoItem.deleteMany({
      where: {
        orcamentoId: orcamento,
      },
    });

    return deleteOrcamento;
  }
}

export { DeleteOrcamentoService };
