import { conmysql } from "../db.js";

// ===========================
// Obtener todos los alimentos
// ===========================
export const getAlimentos = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM ALIMENTO");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los alimentos", error });
  }
};

// ===========================
// Obtener un alimento por ID
// ===========================
export const getAlimento = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      "SELECT * FROM ALIMENTO WHERE id_alimento = ?",
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Alimento no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el alimento", error });
  }
};

// ===========================
// Crear alimento
// ===========================
export const createAlimento = async (req, res) => {
  try {
    const {
      nombre_alimento,
      marca,
      composicion,
      presentacion,
      observaciones
    } = req.body;

    const [result] = await conmysql.query(
      `INSERT INTO ALIMENTO 
      (nombre_alimento, marca, composicion, presentacion, observaciones) 
      VALUES (?, ?, ?, ?, ?)`,
      [nombre_alimento, marca, composicion, presentacion, observaciones]
    );

    res.json({
      id: result.insertId,
      nombre_alimento,
      marca,
      composicion,
      presentacion,
      observaciones
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el alimento", error });
  }
};

// ===========================
// Actualizar alimento
// ===========================
export const updateAlimento = async (req, res) => {
  try {
    const {
      nombre_alimento,
      marca,
      composicion,
      presentacion,
      observaciones
    } = req.body;

    const [result] = await conmysql.query(
      `UPDATE ALIMENTO 
       SET nombre_alimento = ?, marca = ?, composicion = ?, presentacion = ?, observaciones = ?
       WHERE id_alimento = ?`,
      [
        nombre_alimento,
        marca,
        composicion,
        presentacion,
        observaciones,
        req.params.id
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Alimento no encontrado" });

    res.json({ message: "Alimento actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el alimento", error });
  }
};

// ===========================
// Eliminar alimento
// ===========================
export const deleteAlimento = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM ALIMENTO WHERE id_alimento = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Alimento no encontrado" });

    res.json({ message: "Alimento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el alimento", error });
  }
};
