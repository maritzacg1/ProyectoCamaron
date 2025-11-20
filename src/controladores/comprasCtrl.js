import { conmysql } from "../db.js";

// ===============================
// Obtener todas las compras (con JOIN)
// ===============================
export const getCompras = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT c.*,
             u.nombre_usuario,
             p.nombre_proveedor
      FROM compra c
      INNER JOIN usuario u ON c.id_usuario = u.id_usuario
      INNER JOIN proveedor p ON c.id_proveedor = p.id_proveedor
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener compras", error });
  }
};

// ===============================
// Obtener compra por ID
// ===============================
export const getCompra = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      `SELECT c.*, u.nombre_usuario, p.nombre_proveedor
       FROM compra c
       INNER JOIN usuario u ON c.id_usuario = u.id_usuario
       INNER JOIN proveedor p ON c.id_proveedor = p.id_proveedor
       WHERE id_compra = ?`,
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Compra no encontrada" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la compra", error });
  }
};

// ===============================
// Crear compra
// ===============================
export const createCompra = async (req, res) => {
  try {
    const { id_usuario, id_proveedor, fecha_compra, total } = req.body;

    if (!id_usuario || !id_proveedor || !fecha_compra || !total) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    const [result] = await conmysql.query(
      `INSERT INTO compra (id_usuario, id_proveedor, fecha_compra, total)
       VALUES (?, ?, ?, ?)`,
      [id_usuario, id_proveedor, fecha_compra, total]
    );

    res.json({
      id_compra: result.insertId,
      id_usuario,
      id_proveedor,
      fecha_compra,
      total
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear compra", error });
  }
};

// ===============================
// Eliminar compra
// ===============================
export const deleteCompra = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM compra WHERE id_compra = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Compra no encontrada" });

    res.json({ message: "Compra eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar compra", error });
  }
};
