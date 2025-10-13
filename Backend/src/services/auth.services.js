import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config.js";
import { User } from "../db.js";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = await User.create({ name, email, password, role });

  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    message: "Usuario creado exitosamente",
  });
};

// Búsqueda en el sistema del usuario ingresado
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const enteredUser = await User.findOne({ where: { email } });
  if (!enteredUser) {
    return res.status(401).json({ message: "Usuario no existente" });
  }

  // Checkeo de la contraseña encriptada
  const passwordCheck = await bcrypt.compare(password, enteredUser.password);
  if (!passwordCheck) {
    return res.status(401).json({ message: "Email y/o contraseña incorrecta" });
  }

  // Generación del token
  const tokenPayload = {
    id: enteredUser.id,
    email: enteredUser.email,
    role: enteredUser.role,
  };

  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" }); // El token expira en 1 hora
  console.log("[Auth Service] Token generado:", token);

  res.status(200).json({
    message: "Sesión iniciada correctamente",
    token: token,
    user: {
      id: enteredUser.id,
      email: enteredUser.email,
      name: enteredUser.name,
      role: enteredUser.role,
    },
  });
};

export const usuarioRepetido = async (req, res) => {
  const { email } = req.body;

  const foundUser = await User.findOne({ where: { email } });
  console.log(foundUser);

  if (foundUser) {
    res.json(true);
  } else {
    res.json(false);
  }
};

// Función que crea a un primer administrador para poder acceder al dashboard
export const crearAdminInicial = async () => {
  const email = "pedritopascal@gmail.com";

  const existe = await User.findOne({ where: { email: email } });

  if (!existe) {
    console.log("[INFO] El administrador inicial no existe. Creándolo...");

    await User.create({
      name: "Pedrito Pascal",
      email: email,
      password: "admin123",
      role: "ADMIN",
    });
    console.log("[INFO] Administrador inicial creado correctamente.");
  } else {
    console.log(
      "[INFO] El administrador principal ya existe. No es necesario crearlo."
    );
  }
};
