export interface OrcamentoRequest {
  usuarioId: string;
  clienteId: string;
  dataValidade: string;
  estado: "PENDENTE" | "ENVIADO" | "ACEITO";
  total: number;
  observacoes: string;
  itens: OrcamentoItem[];
}

interface OrcamentoItem {
  orcamentoId: string;
  produtoId: string;
  quantidade: number;
  precoUnit: number;
  desconto: number;
  totalLinha: number;
}
