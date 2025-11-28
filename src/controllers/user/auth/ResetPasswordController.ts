import type { Request, Response } from "express";
import { ResetPasswordService } from "../../../services/user/auth/ResetPasswordService";

class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const { password, token } = request.body;

    const resetPasswordService = new ResetPasswordService();

    const result = await resetPasswordService.execute({ password, token });

    return response.json(result);
  }
}

export { ResetPasswordController };
