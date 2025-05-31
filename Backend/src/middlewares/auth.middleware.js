import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Formato esperado: Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  console.log("[Auth Middleware] Token recibido en cabecera:", token);

  if (token == null) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No se proporcionó token." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(
        "[Auth Middleware] Error al verificar token:",
        err.name,
        err.message
      );
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expirado." });
      }
      return res.status(403).json({ message: "Token inválido." });
    }
    req.user = decoded; // Agrega la información decodificada del usuario al objeto request
    console.log(
      "[Auth Middleware] Token verificado exitosamente. Payload:",
      decoded
    );
    next(); // Pasa al siguiente middleware o controlador
  });
};
