import { conmysql } from "../db.js";

// ======================================
// Obtener todos los productos
// ======================================
export const getProductos = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT p.*, a.nombre_alimento
      FROM PRODUCTO p
      INNER JOIN ALIMENTO a ON p.id_alimento = a.id_alimento
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

// ======================================
// Obtener un producto por ID
// ======================================
export const getProducto = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      `SELECT p.*, a.nombre_alimento 
       FROM PRODUCTO p
       INNER JOIN ALIMENTO a ON p.id_alimento = a.id_alimento
       WHERE p.id_producto = ?`,
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

// ======================================
// Crear producto
// ======================================
export const createProducto = async (req, res) => {
  try {
    const { id_alimento, precio_unitario, estado } = req.body;

    if (!id_alimento || !precio_unitario) {
      return res.status(400).json({
        message: "Los campos id_alimento y precio_unitario son obligatorios"
      });
    }

    // Verificar que el alimento exista
    const [alimentoExiste] = await conmysql.query(
      `SELECT id_alimento FROM ALIMENTO WHERE id_alimento = ?`,
      [id_alimento]
    );

    if (alimentoExiste.length === 0) {
      return res.status(400).json({ message: "El alimento especificado no existe" });
    }

    const estadoFinal = estado ?? 1;

    const [result] = await conmysql.query(
      `INSERT INTO PRODUCTO (id_alimento, precio_unitario, estado)
       VALUES (?, ?, ?)`,
      [id_alimento, precio_unitario, estadoFinal]
    );

    res.json({
      message: "Producto registrado correctamente",
      producto: {
        id_producto: result.insertId,
        id_alimento,
        precio_unitario,
        estado: estadoFinal
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

// ======================================
// Actualizar producto
// ======================================
export const updateProducto = async (req, res) => {
  try {
    const { id_alimento, precio_unitario, estado } = req.body;

    const [result] = await conmysql.query(
      `UPDATE PRODUCTO
       SET id_alimento = ?, precio_unitario = ?, estado = ?
       WHERE id_producto = ?`,
      [id_alimento, precio_unitario, estado, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

// ======================================
// Eliminar producto
// ======================================
export const deleteProducto = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM PRODUCTO WHERE id_producto = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};
