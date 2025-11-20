import mysql from "mysql2/promise";
import dotenv from 'dotenv';
dotenv.config();

export const conmysql = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',  // <── SIN CONTRASEÑA
  port: process.env.DB_PORT,
});

// Verificar conexión
(async () => {
  try {
    const connection = await conmysql.getConnection();
    console.log("✅ Conectado exitosamente a la base de datos:", process.env.DB_NAME);
    connection.release();
  } catch (err) {
    console.error("❌ Error al conectar con la base de datos:", err.message);
  }
})();
