import bcrypt from "bcryptjs";

import { User } from "../models/User.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({ name, email, password });

  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    message: "Usuario creado exitosamente",
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const enteredUser = await User.findOne({ where: { email } });
  if (!enteredUser) {
    return res.status(401).send({ message: "Usuario no existente" });
  }

  const passwordCheck = await bcrypt.compare(password, enteredUser.password);
  if (!passwordCheck) {
    return res.status(401).send({ message: "Email y/o contraseña incorrecta" });
  }

  res.status(200).json({
    id: enteredUser.id,
    email: enteredUser.email,
    message: "Logueado exitosamente",
  });
};

export const crearAdminInicial = () => {
  const email = "pedritopascal@gmail.com";

  const existe = User.findOne({ where: { email: email } });

  if (!existe) {
    console.log("El administrador principal no existe. Creándolo...");

    User.create({
      name: "Pedrito Pascal",
      email: email,
      password: "admin123",
      role: "ADMIN",
    });
  }
};
