import { Router } from "express";

import * as auth from "../services/auth.services.js";
import * as words from "../services/words.services.js";
import * as users from "../services/user.services.js";

export const router = Router();

// Endpoints de autenticación
router.post("/register", auth.registerUser);
router.post("/login", auth.loginUser);

// Endpoints de cuentas de usuarios
router.get("/users", users.getUserList);
router.delete("/users/:id", users.DeleteUser);
router.put("/users/:id", users.EditExistingUser);

// Endpoints del banco de palabras
router.post("/words/", words.createNewWord);
router.get("/words", words.getWordList);
router.delete("/words/:id", words.DeleteWord);
router.put("/words/:id", words.EditExistingWord);

export default router;
