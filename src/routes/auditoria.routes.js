import { Router } from "express";
import { getAuditorias, getAuditoria, createAuditoria } from "../controladores/auditoriaCtrl.js";

const router = Router();

router.get("/", getAuditorias);
router.get("/:id", getAuditoria);
router.post("/", createAuditoria);

export default router;
