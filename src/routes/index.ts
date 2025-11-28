import { Router } from "express";
import { authRoutes } from "./auth";
import { userRoutes } from "./user";

import { authenticateToken } from "../middlewares/authMiddleware";
import { productsRoutes } from "./product";
import { orcamentoRoutes } from "./orcamento";
import { clientesRoutes } from "./client";

const router = Router();

router.use("/autenticacao", authRoutes);
router.use("/usuario", userRoutes);
router.use("/produto", authenticateToken, productsRoutes);
router.use("/cliente", authenticateToken, clientesRoutes);
router.use("/orcamento", authenticateToken, orcamentoRoutes);
// router.use("/department", authenticateToken, departmentRoutes);

export { router };
