import { Router } from 'express';
import {
  getCompras,
  getCompra,
  createCompra,
  deleteCompra,
  getComprasPorUsuario
} from '../controladores/comprasCtrl.js';

const router = Router();

router.get('/', getCompras);
router.get('/:id', getCompra);
router.post('/', createCompra);
router.delete('/:id', deleteCompra);
router.get('/usuario/:id', getComprasPorUsuario);

export default router;
