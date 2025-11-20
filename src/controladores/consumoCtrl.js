import { conmysql } from "../db.js";

// ======================================
// Obtener todos los consumos
// ======================================
export const getConsumos = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT 
        c.*,
        e.nombre_estanque,
        a.nombre_alimento
      FROM consumo c
      INNER JOIN estanque ON c.id_estanque = e.id_estanque
      INNER JOIN producto p ON c.id_producto = p.id_producto
      INNER JOIN alimento a ON p.id_alimento = a.id_alimento
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener consumos",
      error
    });
  }
};

// ======================================
// Crear consumo
// ======================================
export const createConsumo = async (req, res) => {
  try {
    const { id_estanque, id_producto, id_usuario, fecha_consumo, cantidad_consumida, observacion } = req.body;

    const [result] = await conmysql.query(
      `INSERT INTO consumo (id_estanque, id_producto, id_usuario, fecha_consumo, cantidad_consumida, observacion)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_estanque, id_producto, id_usuario, fecha_consumo, cantidad_consumida, observacion]
    );

    res.json({ id_consumo: result.insertId });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear consumo",
      error
    });
  }
};

// ======================================
// Eliminar consumo
// ======================================
export const deleteConsumo = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM consumo WHERE id_consumo = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Consumo no encontrado" });

    res.json({ message: "Consumo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar consumo", error });
  }
};
