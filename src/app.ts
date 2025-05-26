import express from "express";
import { json } from "body-parser";
import authRoutes from "./routes/auth.routes";
import contactRoutes from "./routes/contact.routes";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const app = express();

app.use(json());
app.use("/auth", authRoutes);
app.use("/contacts", ensureAuthenticated, contactRoutes);

export default app;