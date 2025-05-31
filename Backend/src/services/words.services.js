import { Word } from "../models/Word.js";

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
  res.json({ message: `Palabra con id ${id} borrada exitosamente` });
};

export const EditExistingWord = async (req, res) => {
  const { id } = req.params;
  await Word.update(req.body, { where: { id } });
  res.json({ message: `Palabra con id ${id} editada exitosamente` });
};

export const importarPalabras = async () => {
  const wordArray = [
    "papel",
    "perro",
    "llave",
    "mundo",
    "brazo",
    "trigo",
    "mujer",
    "calle",
    "raton",
    "reloj",
    "rouli",
    "rawrr",
    "roulio",
  ];
  try {
    const count = await Word.count();

    if (count === 0) {
      console.log("Importando palabras iniciales al pool de palabras...");
      for (const element of wordArray) {
        await Word.create({ value: element });
      }
      console.log("Palabras iniciales importadas.");
    } else {
      console.log("Las palabras iniciales ya existen en la base de datos.");
    }
  } catch (error) {
    console.error("Error al importar palabras:", error);
  }
};
