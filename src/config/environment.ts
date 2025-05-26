import { config } from "dotenv";

config();

export const environment = {
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3333,
};