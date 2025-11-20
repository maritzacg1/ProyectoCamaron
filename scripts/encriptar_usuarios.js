import bcrypt from "bcryptjs";
import { conmysql } from "../src/db.js";

const encriptar = async () => {
  try {
    const [usuarios] = await conmysql.query("SELECT id_usuario, contrasena FROM USUARIO");

    for (const u of usuarios) {
      const hash = await bcrypt.hash(u.contrasena, 10);

      await conmysql.query(
        "UPDATE USUARIO SET contrasena = ? WHERE id_usuario = ?",
        [hash, u.id_usuario]
      );

      console.log(`✔ Usuario ${u.id_usuario} actualizado`);
    }

    console.log("🎉 Todas las contraseñas fueron encriptadas correctamente");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

encriptar();
