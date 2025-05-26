import { Router } from "express";

import * as auth from "../services/auth.services.js";
import * as words from "../services/words.services.js";

export const router = Router();

// Endpoints de autenticación
router.post("/register", auth.registerUser);
router.post("/login", auth.loginUser);

// Endpoints del pool de palabras
router.post("/words/:id", words.createNewWord);
router.get("/words/", words.getWordList);
router.delete("/words/:id", words.DeleteWord);
router.put("/words/:id", words.EditExistingWord);

export default router;
