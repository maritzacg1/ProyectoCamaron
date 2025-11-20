import { Router } from "express";
import { getConsumos, createConsumo, deleteConsumo } from "../controladores/consumoCtrl.js";

const router = Router();

router.get("/", getConsumos);
router.post("/", createConsumo);
router.delete("/:id", deleteConsumo);

export default router;
