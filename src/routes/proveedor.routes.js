import { Router } from 'express';
import { getProveedores, getProveedor, createProveedor, updateProveedor, deleteProveedor } from '../controladores/proveedoresCtrl.js';

const router = Router();

router.get('/', getProveedores);
router.get('/:id', getProveedor);
router.post('/', createProveedor);
router.put('/:id', updateProveedor);
router.delete('/:id', deleteProveedor);

export default router;
