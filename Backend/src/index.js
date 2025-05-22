import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import { User } from "./models/User.js";
import { Word } from "./models/Word.js";
import wordleRoutes from "./routes/wordle.routes.js";

import "./models/Word.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// Función crear un primer ADMIN (únicamente si no existe)
async function crearPrimerAdmin() {
  const email = "pedritopascal@gmail.com";

  const existe = await User.findOne({ where: { email: email } });

  if (!existe) {
    console.log("El administrador principal no existe. Creándolo...");

    await User.create({
      name: "Pedrito Pascal",
      email: email,
      password: "admin123",
      role: "ADMIN",
    });
  }
}

async function creacionDePalabrasPreliminares() {
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

  const count = await Word.count();

  if (count === 0) {
    wordArray.forEach((element) => {
      Word.create({ value: element });
    });

    console.log("Importando palabras iniciales al pool de palabras");
  }
}

try {
  app.listen(PORT);
  app.use(wordleRoutes);

  await sequelize.sync();

  await crearPrimerAdmin();
  await creacionDePalabrasPreliminares();

  console.log("server listening on port ", PORT);
} catch (error) {
  console.log("there was an error on initialization");
}
