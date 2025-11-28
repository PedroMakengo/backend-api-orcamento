import type { Request, Response } from "express";
import { DeleteProductService } from "../../services/products/DeleteProductService";

class DeleteProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteProductService = new DeleteProductService();

    const client = await deleteProductService.execute(id);

    return response.json(client);
  }
}

export { DeleteProductController };
