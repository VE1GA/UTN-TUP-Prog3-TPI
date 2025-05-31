import { Word } from "../models/Word.js";

import palabrasIniciales from "../data/palabrasIniciales.js";

export const createNewWord = async (req, res) => {
  const { value, luck } = req.body;
  const newWord = await Word.create({ value, luck });

  res.status(201).json({
    id: newWord.id,
    value: newWord.value,
    luck: newWord.luck,
    message: "Palabra creada exitosamente",
  });
};

export const getWordList = async (req, res) => {
  const wordList = await Word.findAll();
  res.json(wordList);
};

export const DeleteWord = async (req, res) => {
  const { id } = req.params;
  await Word.destroy({ where: { id } });
  res.json({ message: `[BACKEND] Palabra con id ${id} borrada exitosamente` });
};

export const EditExistingWord = async (req, res) => {
  const { id } = req.params;
  await Word.update(req.body, { where: { id } });
  res.json({ message: `[BACKEND] Palabra con id ${id} editada exitosamente` });
};

export const importarPalabrasIniciales = async () => {
  // Crear una variable para verificar luego si el banco de palabras está vacío
  const count = await Word.count();

  // Importar palabras si no existen
  if (count === 0) {
    console.log(
      "[INFO] No existen palabras en el banco de palabras.\n[INFO] Se van a importar +1000 palabras, esto puede demorar un tiempo.\n[INFO] Importando palabras..."
    );
    for (const element of palabrasIniciales) {
      await Word.create({ value: element });
    }
    console.log("[INFO] Palabras iniciales importadas correctamente.");
  } else {
    console.log(
      "[INFO] El banco de palabras ya contiene palabras. No es necesario importar palabras iniciales."
    );
  }
};
