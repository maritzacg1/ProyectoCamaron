import { conmysql } from "../db.js";

// =====================================
// Obtener todas las especies
// =====================================
export const getEspecies = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM ESPECIE");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las especies",
      error: error.message
    });
  }
};

// =====================================
// Obtener especie por ID
// =====================================
export const getEspecie = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      "SELECT * FROM ESPECIE WHERE id_especie = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Especie no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la especie",
      error: error.message
    });
  }
};

// =====================================
// Crear nueva especie
// =====================================
export const createEspecie = async (req, res) => {
  try {
    const { nombre_especie, descripcion } = req.body;

    if (!nombre_especie) {
      return res.status(400).json({ message: "El nombre de la especie es obligatorio" });
    }

    const [result] = await conmysql.query(
      "INSERT INTO ESPECIE (nombre_especie, descripcion) VALUES (?, ?)",
      [nombre_especie, descripcion]
    );

    const newId = result.insertId;

    const [nuevaEspecie] = await conmysql.query(
      "SELECT * FROM ESPECIE WHERE id_especie = ?",
      [newId]
    );

    res.json(nuevaEspecie[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la especie",
      error: error.message
    });
  }
};

// =====================================
// Actualizar especie
// =====================================
export const updateEspecie = async (req, res) => {
  try {
    const { nombre_especie, descripcion } = req.body;

    const [result] = await conmysql.query(
      "UPDATE ESPECIE SET nombre_especie = ?, descripcion = ? WHERE id_especie = ?",
      [nombre_especie, descripcion, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Especie no encontrada" });
    }

    const [registroActualizado] = await conmysql.query(
      "SELECT * FROM ESPECIE WHERE id_especie = ?",
      [req.params.id]
    );

    res.json(registroActualizado[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la especie",
      error: error.message
    });
  }
};

// =====================================
// Eliminar especie
// =====================================
export const deleteEspecie = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM ESPECIE WHERE id_especie = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Especie no encontrada" });
    }

    res.json({ message: "Especie eliminada correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la especie",
      error: error.message
    });
  }
};
