import { Router } from "express";
import authRoutes from "./auth.routes";
import contactRoutes from "./contact.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/contacts", contactRoutes);

export default router;