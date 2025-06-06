import express from "express";
import cors from "cors";

import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import wordleRoutes from "./routes/wordle.routes.js";

import { crearAdminInicial } from "./services/auth.services.js";
import { importarPalabrasIniciales } from "./services/words.services.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

try {
  app.listen(PORT);
  app.use(wordleRoutes);

  await sequelize.sync();

  await crearAdminInicial();
  await importarPalabrasIniciales();

  console.log("server listening on port ", PORT);
} catch (error) {
  console.log("there was an error on initialization");
}
