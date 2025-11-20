import { conmysql } from "../db.js";

// ===========================
// Obtener todos los detalles
// ===========================
export const getDetalleCompras = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT dc.*, 
             p.precio_unitario,
             a.nombre_alimento AS producto
      FROM DETALLE_COMPRA dc
      INNER JOIN PRODUCTO p ON dc.id_producto = p.id_producto
      INNER JOIN ALIMENTO a ON p.id_alimento = a.id_alimento
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener detalles de compra",
      error 
    });
  }
};

// ===========================
// Obtener detalle por ID
// ===========================
export const getDetalleCompra = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT dc.*, 
             p.precio_unitario,
             a.nombre_alimento AS producto
      FROM DETALLE_COMPRA dc
      INNER JOIN PRODUCTO p ON dc.id_producto = p.id_producto
      INNER JOIN ALIMENTO a ON p.id_alimento = a.id_alimento
      WHERE dc.id_detalle_compra = ?
    `, [req.params.id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Detalle no encontrado" });

    res.json(rows[0]);

  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener detalle de compra",
      error 
    });
  }
};

// ===========================
// Crear detalle de compra
// ===========================
export const createDetalleCompra = async (req, res) => {
  try {
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;

    if (!id_compra || !id_producto || !cantidad || !precio_unitario)
      return res.status(400).json({ 
        message: "Faltan datos obligatorios" 
      });

    const subtotal = cantidad * precio_unitario;

    const [result] = await conmysql.query(`
      INSERT INTO DETALLE_COMPRA 
      (id_compra, id_producto, cantidad, precio_unitario, subtotal)
      VALUES (?, ?, ?, ?, ?)
    `, [id_compra, id_producto, cantidad, precio_unitario, subtotal]);

    res.json({
      id: result.insertId,
      id_compra,
      id_producto,
      cantidad,
      precio_unitario,
      subtotal
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al crear detalle de compra",
      error 
    });
  }
};

// ===========================
// Actualizar detalle
// ===========================
export const updateDetalleCompra = async (req, res) => {
  try {
    const { cantidad, precio_unitario } = req.body;

    const subtotal = cantidad * precio_unitario;

    const [result] = await conmysql.query(`
      UPDATE DETALLE_COMPRA 
      SET cantidad=?, precio_unitario=?, subtotal=?
      WHERE id_detalle_compra=?
    `, [cantidad, precio_unitario, subtotal, req.params.id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Detalle no encontrado" });

    res.json({ message: "Detalle actualizado correctamente" });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al actualizar detalle",
      error 
    });
  }
};

// ===========================
// Eliminar detalle
// ===========================
export const deleteDetalleCompra = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM DETALLE_COMPRA WHERE id_detalle_compra = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Detalle no encontrado" });

    res.json({ message: "Detalle eliminado correctamente" });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al eliminar detalle",
      error 
    });
  }
};
