import { conmysql } from "../db.js";

/* =====================================================
   OBTENER TODOS LOS DETALLES
===================================================== */
export const getDetalleCompras = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT dc.*, 
             p.precio_unitario,
             a.nombre_alimento AS producto,
             dc.estado
      FROM detalle_compra dc
      INNER JOIN producto p ON dc.id_producto = p.id_producto
      INNER JOIN alimento a ON p.id_alimento = a.id_alimento
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener detalles de compra", error });
  }
};

/* =====================================================
   OBTENER DETALLE POR ID
===================================================== */
export const getDetalleCompra = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT dc.*, 
             p.precio_unitario,
             a.nombre_alimento AS producto,
             dc.estado
      FROM detalle_compra dc
      INNER JOIN producto p ON dc.id_producto = p.id_producto
      INNER JOIN alimento a ON p.id_alimento = a.id_alimento
      WHERE dc.id_detalle_compra = ?
    `, [req.params.id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Detalle no encontrado" });

    res.json(rows[0]);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener detalle", error });
  }
};

/* =====================================================
   CREAR DETALLE
===================================================== */
export const createDetalleCompra = async (req, res) => {
  try {
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;

    if (!id_compra || !id_producto || !cantidad || !precio_unitario)
      return res.status(400).json({ message: "Faltan datos obligatorios" });

    const subtotal = cantidad * precio_unitario;

    const [result] = await conmysql.query(`
      INSERT INTO detalle_compra 
      (id_compra, id_producto, cantidad, precio_unitario, subtotal, estado)
      VALUES (?, ?, ?, ?, ?, 'PENDIENTE')
    `, [id_compra, id_producto, cantidad, precio_unitario, subtotal]);

    res.json({
      id: result.insertId,
      id_compra,
      id_producto,
      cantidad,
      precio_unitario,
      subtotal,
      estado: "PENDIENTE"
    });

  } catch (error) {
    res.status(500).json({ message: "Error al crear detalle de compra", error });
  }
};

/* =====================================================
   ACTUALIZAR ESTADO (PENDIENTE / PAGADO)
===================================================== */
export const updateEstadoDetalle = async (req, res) => {
  try {
    const { estado } = req.body;
    const id = req.params.id;

    const [result] = await conmysql.query(`
      UPDATE detalle_compra
      SET estado = ?
      WHERE id_detalle_compra = ?
    `, [estado, id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Detalle no encontrado" });

    res.json({ message: "Estado actualizado correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error al cambiar estado", error });
  }
};

/* =====================================================
   FACTURA
===================================================== */
export const getFactura = async (req, res) => {
  try {
    const id = req.params.id;

    const [rows] = await conmysql.query(`
      SELECT dc.*, 
             a.nombre_alimento AS producto,
             p.nombre_proveedor,
             c.fecha_compra,
             c.total AS total_compra
      FROM detalle_compra dc
      INNER JOIN producto pr ON pr.id_producto = dc.id_producto
      INNER JOIN alimento a ON a.id_alimento = pr.id_alimento
      INNER JOIN compra c ON c.id_compra = dc.id_compra
      INNER JOIN proveedor p ON p.id_proveedor = c.id_proveedor
      WHERE dc.id_detalle_compra = ?
    `, [id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Factura no encontrada" });

    res.json(rows[0]);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener factura", error });
  }
};
