import { prisma } from "../../lib/prisma";

import type { OrcamentoRequest } from "../../models/interfaces/orcamento/OrcamentoRequest";
import { enviarOrcamentoEmail } from "../../shared/enviarOrcamentoEmail";
import { gerarPdfOrcamento } from "../../shared/pdfOrcamento";

class CreateOrcamentoService {
  async execute({
    usuarioId,
    clienteId,
    estado,
    observacoes,
    dataValidade,
    itens,
  }: OrcamentoRequest) {
    const user = await prisma.usuario.findFirst({
      where: { id: usuarioId },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const dataValidadeFormatada = new Date(dataValidade);

    // ========================================================
    // 1️⃣ REPROCESSA TODAS AS LINHAS NO BACKEND (SEGURANÇA)
    // ========================================================
    const itensCalculados = itens.map((linha) => {
      const valorSemIVA = linha.quantidade * linha.precoUnit;
      const valorIVA = valorSemIVA * 0.14; // IVA de 14%
      const valorComIVA = valorSemIVA + valorIVA;

      const valorDesconto = valorComIVA * (linha.desconto / 100);
      const totalLinha = valorComIVA - valorDesconto;

      return {
        produtoId: linha.produtoId,
        quantidade: linha.quantidade,
        precoUnit: linha.precoUnit,
        desconto: linha.desconto,
        totalLinha,
      };
    });

    // Soma total do documento
    const totalDocumento = itensCalculados.reduce(
      (acc, item) => acc + item.totalLinha,
      0
    );

    // ========================================================
    // 2️⃣ TRANSAÇÃO: CRIA ORÇAMENTO + LINHAS
    // ========================================================
    const result = await prisma.$transaction(async (tx) => {
      // Criar orçamento já com o total REAL calculado
      const orcamento = await tx.orcamento.create({
        data: {
          usuarioId,
          clienteId,
          estado,
          total: totalDocumento,
          observacoes,
          dataValidade: dataValidadeFormatada,
        },
        include: {
          cliente: true,
        },
      });

      // Inserir as linhas já recalculadas
      await tx.orcamentoItem.createMany({
        data: itensCalculados.map((item) => ({
          ...item,
          orcamentoId: orcamento.id,
        })),
      });

      return orcamento;
    });

    // ========================================================
    // 3️⃣ Busca os itens já criados
    // ========================================================
    const itensCriados = await prisma.orcamentoItem.findMany({
      where: { orcamentoId: result.id },
      include: { produto: true },
    });

    // ========================================================
    // 4️⃣ Geração do PDF
    // ========================================================
    const pdfPath = await gerarPdfOrcamento(
      result,
      result.cliente,
      itensCriados
    );

    // ========================================================
    // 5️⃣ Envio do e-mail
    // ========================================================
    await enviarOrcamentoEmail({
      to: result.cliente.email,
      subject: `Seu orçamento Nº ${result.id}`,
      html: `
        <div style="font-family: Arial; color: #333;">
          <h2>Seu Orçamento Está Pronto</h2>
          <p>Olá ${result.cliente.nome},</p>
          <p>Segue em anexo o orçamento solicitado.</p>
          <p>Caso tenha dúvidas, estamos disponíveis.</p>
        </div>
      `,
      pdfPath,
    });

    // ========================================================
    // 6️⃣ Retorno final
    // ========================================================
    return {
      message: "Orçamento criado e enviado com sucesso",
      orcamento: result,
      itens: itensCriados,
    };
  }
}

export { CreateOrcamentoService };
