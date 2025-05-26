import { Word } from "../models/Word.js";

export const createNewWord = (req, res) => {
  const { id } = req.params;
  res.send(`Creando palabra con el ${id}`);
};

export const getWordList = async (req, res) => {
  const wordList = await Word.findAll();
  res.json(wordList);
};

export const DeleteWord = (req, res) => {
  const { id } = req.params;
  res.send(`Borrando palabra con ${id}`);
};

export const EditExistingWord = (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando palabra con ${id}`);
};

export const importarPalabras = () => {
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

  const count = Word.count();

  if (count === 0) {
    wordArray.forEach((element) => {
      Word.create({ value: element });
    });

    console.log("Importando palabras iniciales al pool de palabras");
  }
};
