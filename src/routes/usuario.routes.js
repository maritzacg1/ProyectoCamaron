import { Router } from 'express';
import { getUsuarios , createUsuario, updateUsuario, deleteUsuario,  getUsuarioById } from '../controladores/usuariosCtrl.js';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

// Ruta adicional para login


export default router;
