import { Router } from 'express';
import { getInventarios, getInventario, createInventario, updateInventario, deleteInventario } from '../controladores/inventarioCtrl.js';

const router = Router();

router.get('/', getInventarios);
router.get('/:id', getInventario);
router.post('/', createInventario);
router.put('/:id', updateInventario);
router.delete('/:id', deleteInventario);

export default router;
