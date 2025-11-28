import { Router } from "express";

import { CreateProductController } from "../controllers/products/CreateProductController";
import { ListProductByUserController } from "../controllers/products/ListProductByUserController";

const create = new CreateProductController().handle;
const list = new ListProductByUserController().handle;

const productsRoutes = Router();

productsRoutes.get("/:usuarioId", list);
productsRoutes.post("/", create);

export { productsRoutes };
