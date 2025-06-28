import { Router } from "express";
import { ContactController } from "../controllers/ContactController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const router = Router();
const contactController = new ContactController();


router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    await contactController.create(req, res);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    await contactController.getAll(req, res);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    await contactController.getById(req, res);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    await contactController.update(req, res);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    await contactController.delete(req, res);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;