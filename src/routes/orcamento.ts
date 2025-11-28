import { Router } from "express";
import { CreateOrcamentoController } from "../controllers/orcamento/CreateOrcamentoController";
import { ListOrcamentoByUserController } from "../controllers/orcamento/ListOrcamentoByUserController";

const create = new CreateOrcamentoController().handle;
const list = new ListOrcamentoByUserController().handle;

const orcamentoRoutes = Router();

orcamentoRoutes.get("/:usuarioId", list);
orcamentoRoutes.post("/", create);

export { orcamentoRoutes };
