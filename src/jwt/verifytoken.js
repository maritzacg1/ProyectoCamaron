import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_ESTATICO } from "../config.js";

export const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(403).json({ message: "Token no proporcionado" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    // 🔥 Token estático que nunca expira (para pruebas)
    if (token === TOKEN_ESTATICO) {
      req.user = { id_usuario: 0, id_rol: "sistema" };
      return next();
    }

    // 🔥 Token normal firmado
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
