import { Router } from 'express';
import {
  getCompras,
  getCompra,
  createCompra,
  deleteCompra
} from '../controladores/comprasCtrl.js';

const router = Router();

router.get('/', getCompras);
router.get('/:id', getCompra);
router.post('/', createCompra);
router.delete('/:id', deleteCompra);

export default router;
