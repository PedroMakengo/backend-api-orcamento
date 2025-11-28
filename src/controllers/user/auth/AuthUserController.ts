import { Request, Response } from "express";
import { AuthUserService } from "../../../services/user/auth/AuthUserService";

class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, senha } = request.body;

    const authUserService = new AuthUserService();

    const logged = await authUserService.execute({
      email,
      senha,
    });

    return response.json(logged);
  }
}

export { AuthUserController };
