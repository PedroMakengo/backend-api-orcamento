import PDFDocument from "pdfkit";
import fs from "fs";

export async function gerarPdfOrcamento(
  orcamento: any,
  cliente: any,
  itens: any
) {
  return new Promise((resolve, reject) => {
    const filePath = `./tmp/orcamento-${orcamento.id}.pdf`;

    const doc = new PDFDocument({ margin: 40 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const pageWidth = doc.page.width - 80;

    const hr = () => {
      doc
        .strokeColor("#D6D6D6")
        .lineWidth(1)
        .moveTo(40, doc.y)
        .lineTo(40 + pageWidth, doc.y)
        .stroke();
      doc.moveDown(0.7);
    };

    const drawBox = (
      x: number,
      y: number,
      width: number,
      height: number,
      title?: string // <-- title opcional
    ): void => {
      doc
        .roundedRect(x, y, width, height, 6)
        .strokeColor("#999")
        .lineWidth(1)
        .stroke();

      if (title) {
        doc
          .fontSize(10)
          .font("Helvetica-Bold")
          .fillColor("#333")
          .text(title, x + 10, y - 12);
      }
    };

    // ================================
    // CABEÇALHO
    // ================================
    doc
      .fontSize(26)
      .font("Helvetica-Bold")
      .text("ORÇAMENTO", { align: "center" })
      .moveDown(1.2);

    hr();

    // ================================
    // CLIENTE
    // ================================
    const yCliente = doc.y;
    drawBox(40, yCliente, pageWidth, 90, "Cliente");

    doc.moveDown(1);
    doc.fontSize(11).font("Helvetica");
    doc.text(`Nome: ${cliente.nome}`, 55, yCliente + 20);
    doc.text(`Email: ${cliente.email || "-"}`, 55, doc.y + 5);
    doc.text(`Telefone: ${cliente.telefone || "-"}`, 55, doc.y + 5);

    doc.moveDown(3);

    // ================================
    // INFORMAÇÕES DO DOCUMENTO
    // ================================
    const yInfo = doc.y;
    drawBox(40, yInfo, pageWidth, 70, "Informações");

    doc.moveDown(1);
    doc.fontSize(11).font("Helvetica");
    doc.text(
      `Data de Emissão: ${new Date(orcamento.criadoEm).toLocaleDateString()}`,
      55,
      yInfo + 20
    );
    doc.text(`Validade: ${orcamento.dataValidade || "-"}`, 55, doc.y + 5);

    doc.moveDown(4);

    // ================================
    // TABELA DE ITENS
    // ================================
    doc.font("Helvetica-Bold").fontSize(13).text("Itens do Orçamento");
    doc.moveDown(0.5);

    const tableTop = doc.y + 10;

    // Cabeçalho
    doc.rect(40, tableTop, pageWidth, 25).fill("#F2F2F2");

    doc.fillColor("#000").font("Helvetica-Bold").fontSize(11);
    doc.text("Produto", 50, tableTop + 7);
    doc.text("Qtd", 250, tableTop + 7, { width: 50, align: "center" });
    doc.text("Preço Unit.", 320, tableTop + 7, { width: 80, align: "right" });
    doc.text("Total", 450, tableTop + 7, { width: 120, align: "right" });

    let y = tableTop + 35;
    let lineHeight = 24;

    // Totais agregados
    let subtotalSemIVA = 0;
    let totalIVA = 0;
    let totalDescontos = 0;
    let totalFinal = 0;

    itens.forEach((item: any, index: number) => {
      const bg = index % 2 === 0 ? "#FAFAFA" : "#FFFFFF";
      doc.rect(40, y - 2, pageWidth, lineHeight).fill(bg);

      const valorSemIVA = item.quantidade * item.precoUnit;
      const valorIVA = valorSemIVA * 0.14;
      const valorComIVA = valorSemIVA + valorIVA;
      const valorDesconto = valorComIVA * (item.desconto / 100);

      subtotalSemIVA += valorSemIVA;
      totalIVA += valorIVA;
      totalDescontos += valorDesconto;
      totalFinal += item.totalLinha;

      doc.fillColor("#333").font("Helvetica").fontSize(10);

      doc.text(item.produto.nome, 50, y);
      doc.text(item.quantidade.toString(), 250, y, {
        width: 50,
        align: "center",
      });
      doc.text(Number(item.precoUnit).toFixed(2), 320, y, {
        width: 80,
        align: "right",
      });
      doc.text(Number(item.totalLinha).toFixed(2), 450, y, {
        width: 120,
        align: "right",
      });

      y += lineHeight;
    });

    doc.moveDown(2);

    // ================================
    // RESUMO FINAL – estilo Primavera
    // ================================
    const yResumo = y + 20;
    drawBox(40, yResumo, pageWidth, 140, "Resumo Financeiro");

    doc.fontSize(11).font("Helvetica");

    const lineY = yResumo + 25;

    doc.text("Subtotal (sem IVA):", 55, lineY);
    doc.text(subtotalSemIVA.toFixed(2) + " Kz", 0, lineY, {
      align: "right",
      width: pageWidth + 30,
    });

    doc.text("IVA (14%):", 55, lineY + 20);
    doc.text(totalIVA.toFixed(2) + " Kz", 0, lineY + 20, {
      align: "right",
      width: pageWidth + 30,
    });

    doc.text("Descontos aplicados:", 55, lineY + 40);
    doc.text("-" + totalDescontos.toFixed(2) + " Kz", 0, lineY + 40, {
      align: "right",
      width: pageWidth + 30,
    });

    // divisor interno
    doc
      .strokeColor("#DDD")
      .lineWidth(1)
      .moveTo(55, lineY + 65)
      .lineTo(55 + pageWidth - 30, lineY + 65)
      .stroke();

    // TOTAL FINAL
    doc.font("Helvetica-Bold").fontSize(15);
    doc.text("Total Geral:", 55, lineY + 80);
    doc.text(orcamento.total.toFixed(2) + " Kz", 0, lineY + 80, {
      align: "right",
      width: pageWidth + 30,
    });

    // Finaliza
    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
}
