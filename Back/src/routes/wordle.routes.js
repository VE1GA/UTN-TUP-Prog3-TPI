import { Router } from "express";
import { Word } from "../models/Word.js";
const router = Router();
router.post("/words/:id", (req, res) => {
  const { id } = req.params;
  res.send("Creando palabra");
});
router.get("/words/", async (req, res) => {
  const books = await Word.findAll();
  res.json(books);
});
router.delete("/words/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Borrando palabra con ${id}`);
});
router.put("/words/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando palabra con ${id}`);
});

export default router;
