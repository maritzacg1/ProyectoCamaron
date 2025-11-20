import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './src/config.js';

const payload = { id: 0, role: 'system' };
const token = jwt.sign(payload, JWT_SECRET); // sin expiración

console.log('\n TOKEN_ESTATICO generado:\n');
console.log(token);
console.log('\n Pega este valor en tu archivo .env como TOKEN_ESTATICO=\n');
