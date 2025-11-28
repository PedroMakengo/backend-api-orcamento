import type { Request, Response } from "express";
import type { OrcamentoRequest } from "../../models/interfaces/orcamento/OrcamentoRequest";
import { CreateOrcamentoService } from "../../services/orcamento/CreateOrcamentoService";

class CreateOrcamentoController {
  async handle(request: Request, response: Response) {
    const {
      usuarioId,
      clienteId,
      estado,
      total,
      observacoes,
      dataValidade,
      itens,
    }: OrcamentoRequest = request.body;

    const createOrcamentoService = new CreateOrcamentoService();

    const orcamentos = await createOrcamentoService.execute({
      usuarioId,
      clienteId,
      estado,
      total,
      observacoes,
      dataValidade,
      itens,
    });

    response.json(orcamentos);
  }
}

export { CreateOrcamentoController };
