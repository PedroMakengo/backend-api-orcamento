import type { Request, Response } from "express";
import { ListClientByUserService } from "../../services/clients/ListClientByUserService";

class ListClientByUserController {
  async handle(request: Request, response: Response) {
    const { usuarioId } = request.params;

    const listClientByUserService = new ListClientByUserService();

    const clients = await listClientByUserService.execute(usuarioId);

    response.json(clients);
  }
}

export { ListClientByUserController };
