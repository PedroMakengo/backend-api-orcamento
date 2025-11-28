import { Request, Response } from "express";
import { CreateUserRequest } from "../../models/interfaces/user/CreateUserRequest";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { nome, email, senha, activo, perfil }: CreateUserRequest =
      request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      nome,
      email,
      senha,
      activo,
      perfil,
    });

    return response.json(user);
  }
}

export { CreateUserController };
