import { conmysql } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_ESTATICO } from "../config.js";

export const login = async (req, res) => {
  try {
    const { nombre_usuario, contrasena } = req.body;

    if (!nombre_usuario || !contrasena) {
      return res.status(400).json({ message: "Usuario y contraseña son obligatorios" });
    }

    const [rows] = await conmysql.query(
      "SELECT * FROM USUARIO WHERE nombre_usuario = ?",
      [nombre_usuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    const usuario = rows[0];

    const match = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 🔥 Token válido por 30 días
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        id_rol: usuario.id_rol,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre_usuario: usuario.nombre_usuario,
        id_rol: usuario.id_rol,
        estado: usuario.estado
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Error en el Login", error });
  }
};
