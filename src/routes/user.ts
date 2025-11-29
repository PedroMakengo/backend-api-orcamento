import { Router } from "express";
import { CreateUserController } from "../controllers/user/CreateUserController";
import { ListUserController } from "../controllers/user/ListUserController";
import { DeleteUsuarioController } from "../controllers/user/DeleteUserController";

const create = new CreateUserController().handle;
const list = new ListUserController().handle;
const remover = new DeleteUsuarioController().handle;

const userRoutes = Router();

userRoutes.get("/", list);
userRoutes.post("/", create);
userRoutes.delete("/:id", remover);

export { userRoutes };
