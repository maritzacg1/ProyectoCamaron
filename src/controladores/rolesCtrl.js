import { conmysql } from "../db.js";

// ======================================
// Obtener todos los roles
// ======================================
export const getRoles = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM ROL");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los roles", error });
  }
};

// ======================================
// Obtener un rol por ID
// ======================================
export const getRolById = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      "SELECT * FROM ROL WHERE id_rol = ?",
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Rol no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el rol", error });
  }
};

// ======================================
// Crear rol
// ======================================
export const createRol = async (req, res) => {
  try {
    const { nombre_rol, descripcion } = req.body;

    const [result] = await conmysql.query(
      "INSERT INTO ROL (nombre_rol, descripcion) VALUES (?, ?)",
      [nombre_rol, descripcion]
    );

    res.json({
      id_rol: result.insertId,
      nombre_rol,
      descripcion,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el rol", error });
  }
};

// ======================================
// Actualizar rol
// ======================================
export const updateRol = async (req, res) => {
  try {
    const { nombre_rol, descripcion } = req.body;

    const [result] = await conmysql.query(
      "UPDATE ROL SET nombre_rol = ?, descripcion = ? WHERE id_rol = ?",
      [nombre_rol, descripcion, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Rol no encontrado" });

    res.json({ message: "Rol actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el rol", error });
  }
};

// ======================================
// Eliminar rol
// ======================================
export const deleteRol = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM ROL WHERE id_rol = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Rol no encontrado" });

    res.json({ message: "Rol eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el rol", error });
  }
};
