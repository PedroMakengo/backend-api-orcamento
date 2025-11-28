import type { Request, Response } from "express";
import { ListOrcamentoByUserService } from "../../services/orcamento/ListOrcamentoByUserService";

class ListOrcamentoByUserController {
  async handle(request: Request, response: Response) {
    const { usuarioId } = request.params;

    const listOrcamentoService = new ListOrcamentoByUserService();

    const orcamentos = await listOrcamentoService.execute(usuarioId);

    response.json(orcamentos);
  }
}

export { ListOrcamentoByUserController };
