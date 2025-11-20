import { Router } from 'express';
import { getRoles, createRol, updateRol, deleteRol, getRolById } from '../controladores/rolesCtrl.js';

const router = Router();

router.get('/', getRoles);
router.get('/:id', getRolById);
router.post('/', createRol);
router.put('/:id', updateRol);
router.delete('/:id', deleteRol);

export default router;
