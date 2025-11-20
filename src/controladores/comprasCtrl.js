import { conmysql } from "../db.js";

// ===============================
// Obtener todas las compras
// ===============================
export const getCompras = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT c.*, u.nombre_usuario, p.nombre_proveedor
      FROM compra c
      INNER JOIN usuario u ON c.id_usuario = u.id_usuario
      INNER JOIN proveedor p ON c.id_proveedor = p.id_proveedor
      ORDER BY c.id_compra DESC
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
    const id = req.params.id;

    const [compra] = await conmysql.query(
      `SELECT c.*, u.nombre_usuario, p.nombre_proveedor 
       FROM compra c
       INNER JOIN usuario u ON c.id_usuario = u.id_usuario
       INNER JOIN proveedor p ON c.id_proveedor = p.id_proveedor
       WHERE c.id_compra = ?`,
      [id]
    );

    if (compra.length === 0)
      return res.status(404).json({ message: "Compra no encontrada" });

    const [detalle] = await conmysql.query(
      `SELECT d.*, a.nombre_alimento 
       FROM detalle_compra d
       INNER JOIN alimento a ON d.id_producto = a.id_alimento
       WHERE d.id_compra = ?`,
      [id]
    );

    res.json({
      ...compra[0],
      detalle
    });

  } catch (error) {
    res.status(500).json({ message: "Error al obtener la compra", error });
  }
};

// ===============================
// Crear compra + detalle
// ===============================
export const createCompra = async (req, res) => {
  const conn = await conmysql.getConnection();
  await conn.beginTransaction();

  try {
    const { id_usuario, id_proveedor, fecha_compra, total, productos } = req.body;

    // Validación
    if (!id_usuario || !id_proveedor || !fecha_compra || !total) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (!productos || productos.length === 0) {
      return res.status(400).json({ message: "Debe enviar los productos de la compra" });
    }

    // Insertar compra
    const [result] = await conn.query(
      `INSERT INTO compra (id_usuario, id_proveedor, fecha_compra, total)
       VALUES (?, ?, ?, ?)`,
      [id_usuario, id_proveedor, fecha_compra, total]
    );

    const id_compra = result.insertId;

    // Insertar detalle (tabla correcta: detalle_compra)
    for (const p of productos) {
      await conn.query(
        `INSERT INTO detalle_compra (id_compra, id_producto, cantidad, precio_unitario, subtotal)
         VALUES (?, ?, ?, ?, ?)`,
        [id_compra, p.id_producto, p.cantidad, p.precio_unitario, p.subtotal]
      );
    }

    await conn.commit();
    conn.release();

    res.json({ message: "Compra creada correctamente", id_compra });

  } catch (error) {
    await conn.rollback();
    conn.release();
    console.error("Error al crear compra:", error);
    res.status(500).json({ message: "Error al crear compra", error });
  }
};

// ===============================
// ELIMINAR COMPRA + DETALLE
// ===============================
export const deleteCompra = async (req, res) => {
  try {
    const id = req.params.id;

    await conmysql.query(`DELETE FROM detalle_compra WHERE id_compra = ?`, [id]);
    const [result] = await conmysql.query(`DELETE FROM compra WHERE id_compra = ?`, [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Compra no encontrada" });

    res.json({ message: "Compra eliminada correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar compra", error });
  }
};

// ===============================
// Obtener compras por usuario
// ===============================
export const getComprasPorUsuario = async (req, res) => {
  try {
    const id = req.params.id;

    const [rows] = await conmysql.query(`
      SELECT c.*, p.nombre_proveedor
      FROM compra c
      INNER JOIN proveedor p ON c.id_proveedor = p.id_proveedor
      WHERE c.id_usuario = ?
      ORDER BY fecha_compra DESC
    `, [id]);

    res.json(rows);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener compras del usuario", error });
  }
};
