/*import { config } from "dotenv";
config();

export const BD_HOST = process.env.BD_HOST || "localhost";
export const BD_DATABASE = process.env.BD_DATABASE || "baseapp2025";
export const BD_USER = process.env.BD_USER || "root";
export const BD_PASSWORD = process.env.BD_PASSWORD || "";
export const BD_PORT = process.env.BD_PORT || 3306;
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "clave_super_segura";
export const TOKEN_ESTATICO = process.env.TOKEN_ESTATICO || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZSI6InN5c3RlbSIsImlhdCI6MTc2MTQzMDI2NX0.hjFrCUdzNUac2or4TcIaV1GAfH-rUgCY4MmZ9jUUKv0";
*/
import { config } from 'dotenv';
config();

// =================================
// 🔌 VARIABLES DE BASE DE DATOS LOCAL
// =================================
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_PORT = process.env.DB_PORT;

// =================================
// 🔐 JWT Y PUERTO
// =================================
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const TOKEN_ESTATICO = process.env.TOKEN_ESTATICO;
