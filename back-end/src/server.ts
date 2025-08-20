import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import { router } from "./routes";

dotenv.config(); // carrega variáveis do .env

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(router);

app.use("/files", express.static(path.resolve(__dirname, "..", "..", "tmp")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => console.log("Servidor online!"));
