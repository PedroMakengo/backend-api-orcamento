import type { ClientRequest } from "../../models/interfaces/client/ClientRequest";
import type { Request, Response } from "express";
import { CreateClientService } from "../../services/clients/CreateClientService";

class CreateClientController {
  async handle(request: Request, response: Response) {
    const { nome, email, endereco, telefone, usuarioId }: ClientRequest =
      request.body;

    const createClientService = new CreateClientService();

    const client = await createClientService.execute({
      nome,
      email,
      endereco,
      telefone,
      usuarioId,
    });

    response.json(client);
  }
}

export { CreateClientController };
