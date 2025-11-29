import type { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUsuarioController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteUsuarioService = new DeleteUserService();

    const client = await deleteUsuarioService.execute(id);

    return response.json(client);
  }
}

export { DeleteUsuarioController };
