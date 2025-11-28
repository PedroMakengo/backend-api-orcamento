import { Request, Response } from "express";
import { VerifyUserTokenService } from "../../../services/user/auth/VerifyUserTokenService";

class VerifyUserTokenController {
  async handle(request: Request, response: Response) {
    const { token } = request?.query as any;

    const verifyUserTokenService = new VerifyUserTokenService();

    const result = await verifyUserTokenService.execute(token);

    return response.json(result);
  }
}

export { VerifyUserTokenController };
