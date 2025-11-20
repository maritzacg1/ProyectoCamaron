import { conmysql } from "../db.js";

// =====================================================
// OBTENER TODOS LOS INVENTARIOS (CON NOMBRE DE ALIMENTO)
// =====================================================
export const getInventarios = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT 
        i.*, 
        p.id_alimento,
        a.nombre_alimento
      FROM inventario i
      INNER JOIN producto p ON i.id_producto = p.id_producto
      INNER JOIN alimento a ON p.id_alimento = a.id_alimento
    `);

    res.json(rows);

  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener inventarios", 
      error 
    });
  }
};

// =====================================================
// OBTENER UN INVENTARIO POR ID
// =====================================================
export const getInventario = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      `SELECT 
        i.*, 
        p.id_alimento,
        a.nombre_alimento
      FROM inventario i
      INNER JOIN producto p ON i.id_producto = p.id_producto
      INNER JOIN alimento a ON p.id_alimento = a.id_alimento
      WHERE i.id_inventario = ?`,
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Inventario no encontrado" });

    res.json(rows[0]);

  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener el inventario", 
      error 
    });
  }
};

// =====================================================
// CREAR REGISTRO DE INVENTARIO
// =====================================================
export const createInventario = async (req, res) => {
  try {
    const { id_producto, stock_actual, stock_minimo, usuario_actualizacion } = req.body;

    if (!id_producto || stock_actual == null) {
      return res.status(400).json({
        message: "id_producto y stock_actual son obligatorios"
      });
    }

    const [result] = await conmysql.query(
      `INSERT INTO inventario 
        (id_producto, stock_actual, stock_minimo, usuario_actualizacion)
       VALUES (?, ?, ?, ?)`,
      [id_producto, stock_actual, stock_minimo, usuario_actualizacion]
    );

    res.json({
      message: "Inventario creado correctamente",
      id: result.insertId,
      id_producto,
      stock_actual,
      stock_minimo,
      usuario_actualizacion
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al crear inventario", 
      error 
    });
  }
};

// =====================================================
// ACTUALIZAR INVENTARIO
// =====================================================
export const updateInventario = async (req, res) => {
  try {
    const { stock_actual, stock_minimo, usuario_actualizacion } = req.body;

    const [result] = await conmysql.query(
      `UPDATE inventario 
       SET stock_actual = ?, stock_minimo = ?, usuario_actualizacion = ?
       WHERE id_inventario = ?`,
      [stock_actual, stock_minimo, usuario_actualizacion, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Inventario no encontrado" });

    res.json({ message: "Inventario actualizado correctamente" });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al actualizar inventario", 
      error 
    });
  }
};

// =====================================================
// ELIMINAR INVENTARIO
// =====================================================
export const deleteInventario = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM inventario WHERE id_inventario = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Inventario no encontrado" });

    res.json({ message: "Inventario eliminado correctamente" });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al eliminar inventario", 
      error 
    });
  }
};
