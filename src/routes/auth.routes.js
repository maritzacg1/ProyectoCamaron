import { Router } from "express";
import { login } from "../controladores/authCtrl.js";

const router = Router();

// Dejar esta ruta opcional o eliminarla después
router.get("/", (req, res) => {
  res.json({ message: "Ruta /api/auth cargada correctamente" });
});

// RUTA REAL DE LOGIN
router.post("/login", login);

export default router;
