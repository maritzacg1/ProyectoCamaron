import { Router } from 'express';
import { 
  getDetalleCompras,
  getDetalleCompra,
  createDetalleCompra,
  updateDetalleCompra,
  deleteDetalleCompra
} from '../controladores/detalleCompraCtrl.js';

const router = Router();

router.get('/', getDetalleCompras);
router.get('/:id', getDetalleCompra);
router.post('/', createDetalleCompra);
router.put('/:id', updateDetalleCompra);
router.delete('/:id', deleteDetalleCompra);

export default router;
