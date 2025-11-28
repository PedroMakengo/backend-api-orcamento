import type { Request, Response } from "express";
import { DeleteClientService } from "../../services/clients/DeleteClienteService";

class DeleteClientController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteClientService = new DeleteClientService();

    const client = await deleteClientService.execute(id);

    return response.json(client);
  }
}

export { DeleteClientController };
