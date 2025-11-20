import { Router } from 'express';
import { getEspecies, getEspecie, createEspecie, updateEspecie, deleteEspecie } from '../controladores/especiesCtrl.js';

const router = Router();

router.get('/', getEspecies);
router.get('/:id', getEspecie);
router.post('/', createEspecie);
router.put('/:id', updateEspecie);
router.delete('/:id', deleteEspecie);

export default router;
