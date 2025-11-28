import type { Request, Response } from "express";
import type { ProductRequest } from "../../models/interfaces/product/ProductRequest";
import { CreateProductService } from "../../services/products/CreateProductService";

class CreateProductController {
  async handle(request: Request, response: Response) {
    const { nome, descricao, precoPadrao, unidade, usuarioId }: ProductRequest =
      request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      nome,
      descricao,
      precoPadrao,
      unidade,
      usuarioId,
    });

    response.json(product);
  }
}

export { CreateProductController };
