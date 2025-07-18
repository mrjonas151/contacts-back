import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Contact } from "../entities/Contact";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User, Contact],
});