import { Router } from "express";
import { Word } from "../models/Word.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

const router = Router();

// --- Rutas de Registro ---
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({ name, email, password });
  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    message: "Usuario creado exitosamente",
  });
});

// --- Rutas de Logeo ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const UserFind = await User.findOne({ where: { email } });
  if (!UserFind)
    return res.status(401).send({ message: "Usuario no existente" });
  const comparation = await bcrypt.compare(password, UserFind.password);
  if (!comparation)
    return res.status(401).send({ message: "Email y/o contraseña incorrecta" });
  res.status(200).json({
    id: UserFind.id,
    email: UserFind.email,
    message: "Logueado exitosamente",
  });
});

// --- Rutas de Palabras ---

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
