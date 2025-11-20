import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// JWT
import { verifyToken } from './jwt/verifytoken.js';

// Login
import authRoutes from './routes/auth.routes.js';

// Importar todas las rutas
import rolRoutes from './routes/rol.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import proveedorRoutes from './routes/proveedor.routes.js';
import alimentoRoutes from './routes/alimento.routes.js';
import productoRoutes from './routes/producto.routes.js';
import inventarioRoutes from './routes/inventario.routes.js';
import compraRoutes from './routes/compra.routes.js';
import detalleCompraRoutes from './routes/detalleCompra.routes.js';
import especieRoutes from './routes/especie.routes.js';
import estanqueRoutes from './routes/estanque.routes.js';
import consumoRoutes from './routes/consumo.routes.js';
import auditoriaRoutes from './routes/auditoria.routes.js';

const app = express();

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Obtener directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carpeta pública
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// RUTA LOGIN (SIN TOKEN)
app.use("/api/auth", authRoutes);

// RUTAS PROTEGIDAS
app.use('/api/roles', verifyToken, rolRoutes);
app.use('/api/usuarios', verifyToken, usuarioRoutes);
app.use('/api/proveedores', verifyToken, proveedorRoutes);
app.use('/api/alimentos', verifyToken, alimentoRoutes);
app.use('/api/productos', verifyToken, productoRoutes);
app.use('/api/inventarios', verifyToken, inventarioRoutes);
app.use('/api/compras', verifyToken, compraRoutes);
app.use('/api/detalle-compras', verifyToken, detalleCompraRoutes);
app.use('/api/especies', verifyToken, especieRoutes);
app.use('/api/estanques', verifyToken, estanqueRoutes);
app.use('/api/consumos', verifyToken, consumoRoutes);
app.use('/api/auditorias', verifyToken, auditoriaRoutes);

// Ruta test
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente 🦐' });
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

// Not Found
app.use((req, res) => {
  res.status(404).json({ message: '❌ Endpoint not found' });
});

export default app;
