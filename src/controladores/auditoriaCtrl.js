import { conmysql } from "../db.js";

// ======================================================
// Obtener todas las auditorías
// ======================================================
export const getAuditorias = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT a.*, u.nombre_usuario
      FROM auditoria_general a
      INNER JOIN USUARIO u ON a.id_usuario = u.id_usuario
      ORDER BY a.id_auditoria DESC
    `);

    res.json(rows);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener auditorías",
      error: error.message,
    });
  }
};

// ======================================================
// Obtener auditoría por ID
// ======================================================
export const getAuditoria = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      `
      SELECT a.*, u.nombre_usuario
      FROM auditoria_general a
      INNER JOIN USUARIO u ON a.id_usuario = u.id_usuario
      WHERE a.id_auditoria = ?
      `,
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Auditoría no encontrada" });

    res.json(rows[0]);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener auditoría",
      error: error.message,
    });
  }
};

// ======================================================
// Crear auditoría
// ======================================================
export const createAuditoria = async (req, res) => {
  try {
    const { id_usuario, accion } = req.body;

    // Fecha automática
    const fecha = new Date();

    const [result] = await conmysql.query(
      `
        INSERT INTO auditoria_general (id_usuario, accion, fecha)
        VALUES (?, ?, ?)
      `,
      [id_usuario, accion, fecha]
    );

    res.json({
      id: result.insertId,
      id_usuario,
      accion,
      fecha,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al crear auditoría",
      error: error.message,
    });
  }
};
