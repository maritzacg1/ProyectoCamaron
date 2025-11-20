import { conmysql } from "../db.js";

export const registrarAuditoria = async (id_usuario, tabla, accion, descripcion) => {
  await conmysql.query(
    `INSERT INTO AUDITORIA_GENERAL (id_usuario, tabla_afectada, accion, descripcion)
     VALUES (?, ?, ?, ?)`,
    [id_usuario, tabla, accion, descripcion]
  );
};
