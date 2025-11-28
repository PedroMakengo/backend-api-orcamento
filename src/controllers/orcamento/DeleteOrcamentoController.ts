import type { Request, Response } from "express";
import { DeleteOrcamentoService } from "../../services/orcamento/DeleteOrcamentoService";

class DeleteOrcamentoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteOrcamentoService = new DeleteOrcamentoService();

    const client = await deleteOrcamentoService.execute(id);

    return response.json(client);
  }
}

export { DeleteOrcamentoController };
