import { conmysql } from "../db.js";
import bcrypt from "bcryptjs";

// ======================================
// Obtener todos los usuarios
// ======================================
export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT U.id_usuario, U.nombre_usuario, U.id_rol, R.nombre_rol, U.estado
      FROM USUARIO U
      INNER JOIN ROL R ON U.id_rol = R.id_rol
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

// ======================================
// Obtener un usuario por ID
// ======================================
export const getUsuarioById = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      `SELECT U.id_usuario, U.nombre_usuario, U.id_rol, R.nombre_rol, U.estado
       FROM USUARIO U
       INNER JOIN ROL R ON U.id_rol = R.id_rol
       WHERE U.id_usuario = ?`,
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};

// ======================================
// Crear usuario
// ======================================
export const createUsuario = async (req, res) => {
  try {
    const { nombre_usuario, contrasena, id_rol, estado } = req.body;

    if (!nombre_usuario || !contrasena || !id_rol)
      return res.status(400).json({ message: "Faltan datos obligatorios" });

    // Hash contraseña
    const hash = await bcrypt.hash(contrasena, 10);

    const [result] = await conmysql.query(
      `INSERT INTO USUARIO (nombre_usuario, contrasena, id_rol, estado)
       VALUES (?, ?, ?, ?)`,
      [nombre_usuario, hash, id_rol, estado ?? 1]
    );

    res.json({
      id_usuario: result.insertId,
      nombre_usuario,
      id_rol,
      estado: estado ?? 1,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

// ======================================
// Actualizar usuario
// ======================================
export const updateUsuario = async (req, res) => {
  try {
    const { nombre_usuario, contrasena, id_rol, estado } = req.body;

    // Si se envía una contraseña nueva → hash
    let query = "";
    let values = [];

    if (contrasena) {
      const hash = await bcrypt.hash(contrasena, 10);
      query = `
        UPDATE USUARIO 
        SET nombre_usuario=?, contrasena=?, id_rol=?, estado=?
        WHERE id_usuario=?`;
      values = [nombre_usuario, hash, id_rol, estado, req.params.id];
    } else {
      query = `
        UPDATE USUARIO 
        SET nombre_usuario=?, id_rol=?, estado=?
        WHERE id_usuario=?`;
      values = [nombre_usuario, id_rol, estado, req.params.id];
    }

    const [result] = await conmysql.query(query, values);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

// ======================================
// Eliminar usuario
// ======================================
export const deleteUsuario = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM USUARIO WHERE id_usuario=?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};
