import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

AppDataSource.initialize().then(() => {
  const port = process.env.PORT || 3333;
  app.listen(port, () => console.log(`Server rodando na porta ${port}`));
}).catch(err => console.error("Erro inicio BD", err));
