import { prisma } from "../../lib/prisma";
import type { OrcamentoRequest } from "../../models/interfaces/orcamento/OrcamentoRequest";

class CreateOrcamentoService {
  async execute({
    usuarioId,
    clienteId,
    estado,
    total,
    observacoes,
    dataValidade,
    itens,
  }: OrcamentoRequest) {
    const user = await prisma.usuario.findFirst({
      where: {
        id: usuarioId,
      },
    });

    if (!user) {
      throw new Error("Wrong username or password");
    }

    // ✅ Converte a string para Date
    const dataValidadeFormatada = new Date(dataValidade);

    // Cria o orçamento e seus itens em uma transação
    const result = await prisma.$transaction(async (tx: any) => {
      // Cria o orçamento
      const orcamento = await tx.orcamento.create({
        data: {
          usuarioId,
          clienteId,
          estado,
          total,
          observacoes,
          dataValidade: dataValidadeFormatada,
        },
      });

      // Cria os itens do orçamento
      await tx.orcamentoItem.createMany({
        data: itens.map(({ orcamentoId, ...item }) => ({
          orcamentoId: orcamento.id,
          ...item,
        })),
      });

      // Busca os itens criados para retornar
      const itemsCriados = await tx.orcamentoItem.findMany({
        where: {
          orcamentoId: orcamento.id,
        },
      });

      return {
        orcamento,
        items: itemsCriados,
      };
    });

    return result;
  }
}

export { CreateOrcamentoService };
