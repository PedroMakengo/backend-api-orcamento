import { Router } from "express";
import { CreateUserController } from "../controllers/user/CreateUserController";
import { ListUserController } from "../controllers/user/ListUserController";

const create = new CreateUserController().handle;
const list = new ListUserController().handle;

const userRoutes = Router();

userRoutes.get("/", list);
userRoutes.post("/", create);

export { userRoutes };
