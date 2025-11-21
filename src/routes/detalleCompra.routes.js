import { Router } from 'express';
import {
  getDetalleCompras,
  getDetalleCompra,
  createDetalleCompra,
  updateEstadoDetalle,
  getFactura
} from '../controladores/detalleCompraCtrl.js';

const router = Router();

router.get('/', getDetalleCompras);
router.get('/:id', getDetalleCompra);
router.post('/', createDetalleCompra);

router.put('/estado/:id', updateEstadoDetalle);
router.get('/factura/:id', getFactura);

export default router;
