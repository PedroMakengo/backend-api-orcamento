import express from "express";
import cors from "cors";

import path from "path";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

import { router } from "./routes";
import { configErrors } from "./config/errors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(configErrors);

export default app;
