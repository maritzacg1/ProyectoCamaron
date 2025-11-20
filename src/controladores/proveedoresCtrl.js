import { conmysql } from "../db.js";

// ======================================
// Obtener todos los proveedores
// ======================================
export const getProveedores = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM PROVEEDOR");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los proveedores",
      error,
    });
  }
};

// ======================================
// Obtener un proveedor por ID
// ======================================
export const getProveedor = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      "SELECT * FROM PROVEEDOR WHERE id_proveedor = ?",
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Proveedor no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el proveedor",
      error,
    });
  }
};

// ======================================
// Crear proveedor
// ======================================
export const createProveedor = async (req, res) => {
  try {
    const { nombre_proveedor, telefono, direccion, correo } = req.body;

    const [result] = await conmysql.query(
      `INSERT INTO PROVEEDOR (nombre_proveedor, telefono, direccion, correo) 
       VALUES (?, ?, ?, ?)`,
      [nombre_proveedor, telefono, direccion, correo]
    );

    res.json({
      id_proveedor: result.insertId,
      nombre_proveedor,
      telefono,
      direccion,
      correo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el proveedor",
      error,
    });
  }
};

// ======================================
// Actualizar proveedor
// ======================================
export const updateProveedor = async (req, res) => {
  try {
    const { nombre_proveedor, telefono, direccion, correo } = req.body;

    const [result] = await conmysql.query(
      `UPDATE PROVEEDOR 
       SET nombre_proveedor = ?, telefono = ?, direccion = ?, correo = ?
       WHERE id_proveedor = ?`,
      [nombre_proveedor, telefono, direccion, correo, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Proveedor no encontrado" });

    res.json({ message: "Proveedor actualizado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el proveedor",
      error,
    });
  }
};

// ======================================
// Eliminar proveedor
// ======================================
export const deleteProveedor = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM PROVEEDOR WHERE id_proveedor = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Proveedor no encontrado" });

    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el proveedor",
      error,
    });
  }
};
