import { Router } from "express";

import * as auth from "../services/auth.services.js";
import * as words from "../services/words.services.js";
import * as users from "../services/user.services.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

export const router = Router();

// Endpoints de autenticación y creación de cuentas
router.post("/register", auth.registerUser);
router.post("/login", auth.loginUser);
router.post("/check_repeat", auth.usuarioRepetido);

// Endpoints de cuentas de usuarios
router.get("/users", verifyToken, users.getUserList);
router.delete("/users/:id", verifyToken, users.DeleteUser);
router.put("/users/:id", verifyToken, users.EditExistingUser);

// Endpoints del banco de palabras
router.post("/words", verifyToken, words.createNewWord);
router.get("/words", verifyToken, words.getWordList);
router.delete("/words/:id", verifyToken, words.DeleteWord);
router.put("/words/:id", verifyToken, words.EditExistingWord);

export default router;
