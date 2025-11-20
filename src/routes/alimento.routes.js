import { Router } from 'express';
import { getAlimentos, getAlimento, createAlimento, updateAlimento, deleteAlimento } from '../controladores/alimentosCtrl.js';

const router = Router();

router.get('/', getAlimentos);
router.get('/:id', getAlimento);
router.post('/', createAlimento);
router.put('/:id', updateAlimento);
router.delete('/:id', deleteAlimento);

export default router;
