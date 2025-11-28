import type { Request, Response } from "express";
import { ListProductByUserService } from "../../services/products/ListProductByUserService";

class ListProductByUserController {
  async handle(request: Request, response: Response) {
    const { usuarioId } = request.params;

    const listProductService = new ListProductByUserService();

    const products = await listProductService.execute(usuarioId);

    response.json(products);
  }
}

export { ListProductByUserController };
