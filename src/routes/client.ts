import { Router } from "express";
import { CreateClientController } from "../controllers/clients/CreateClientController";
import { ListClientByUserController } from "../controllers/clients/ListClientByUserController";

const create = new CreateClientController().handle;
const list = new ListClientByUserController().handle;

const clientesRoutes = Router();

clientesRoutes.get("/:usuarioId", list);
clientesRoutes.post("/", create);

export { clientesRoutes };
