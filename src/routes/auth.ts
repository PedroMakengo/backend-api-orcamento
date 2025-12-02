import { Router } from "express";
import { AuthUserController } from "../controllers/user/auth/AuthUserController";
import { ForgotPasswordController } from "../controllers/user/auth/ForgotPasswordController";
import { ResetPasswordController } from "../controllers/user/auth/ResetPasswordController";
import { VerifyUserTokenController } from "../controllers/user/auth/VerifyUserTokenController";

const authController = new AuthUserController().handle;
const forgotController = new ForgotPasswordController().handle;
const resetController = new ResetPasswordController().handle;
const verifyController = new VerifyUserTokenController().handle;

const authRoutes = Router();

authRoutes.post("/", authController);
authRoutes.post("/recuperar-senha", forgotController);
authRoutes.post("/reset-senha", resetController);
authRoutes.put("/verificacao", verifyController);

export { authRoutes };
