import { Router } from 'express';
import { getEstanques,  createEstanque, updateEstanque, deleteEstanque, getEstanque } from '../controladores/estanquesCtrl.js';

const router = Router();

router.get('/', getEstanques);
router.get('/:id', getEstanque);
router.post('/', createEstanque);
router.put('/:id', updateEstanque);
router.delete('/:id', deleteEstanque);

export default router;
