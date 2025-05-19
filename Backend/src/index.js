import express from "express";
import { PORT } from "./config.js";
import wordRoutes from "./routes/wordle.routes.js";
import { sequelize } from "./db.js";

import "./models/Word.js";

const app = express();

try {
  app.listen(PORT);
  app.use(wordRoutes);

  await sequelize.sync();

  console.log("server listening on port ", PORT);
} catch (error) {
  console.log("there was an error on initialization");
}
