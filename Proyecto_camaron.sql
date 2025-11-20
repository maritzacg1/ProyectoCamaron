
-- ==========================================
-- TABLA ROL
-- ==========================================
CREATE TABLE ROL (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200)
);

-- ==========================================
-- TABLA USUARIO
-- ==========================================
CREATE TABLE USUARIO (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    estado TINYINT(1) DEFAULT 1,
    FOREIGN KEY (id_rol) REFERENCES ROL(id_rol)
);

-- ==========================================
-- TABLA PROVEEDOR
-- ==========================================
CREATE TABLE PROVEEDOR (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_proveedor VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(150),
    correo VARCHAR(100)
);

-- ==========================================
-- TABLA ALIMENTO
-- ==========================================
CREATE TABLE ALIMENTO (
    id_alimento INT AUTO_INCREMENT PRIMARY KEY,
    nombre_alimento VARCHAR(100) NOT NULL,
    marca VARCHAR(100),
    composicion VARCHAR(200),
    presentacion VARCHAR(100),
    observaciones VARCHAR(200)
);

-- ==========================================
-- TABLA PRODUCTO
-- ==========================================
CREATE TABLE PRODUCTO (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_alimento INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    estado TINYINT(1) DEFAULT 1,
    FOREIGN KEY (id_alimento) REFERENCES ALIMENTO(id_alimento)
);

-- ==========================================
-- TABLA INVENTARIO
-- ==========================================
CREATE TABLE INVENTARIO (
    id_inventario INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    stock_actual DECIMAL(10,2) NOT NULL DEFAULT 0,
    stock_minimo DECIMAL(10,2) DEFAULT 0,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    usuario_actualizacion INT NULL,
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto),
    FOREIGN KEY (usuario_actualizacion) REFERENCES USUARIO(id_usuario)
);

-- ==========================================
-- TABLA COMPRA
-- ==========================================
CREATE TABLE COMPRA (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_proveedor INT NOT NULL,
    fecha_compra DATE NOT NULL,
    total DECIMAL(10,2),
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario),
    FOREIGN KEY (id_proveedor) REFERENCES PROVEEDOR(id_proveedor)
);

-- ==========================================
-- TABLA DETALLE_COMPRA
-- ==========================================
CREATE TABLE DETALLE_COMPRA (
    id_detalle_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_compra INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
    FOREIGN KEY (id_compra) REFERENCES COMPRA(id_compra),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
);

-- ==========================================
-- TABLA ESPECIE
-- ==========================================
CREATE TABLE ESPECIE (
    id_especie INT AUTO_INCREMENT PRIMARY KEY,
    nombre_especie VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200)
);

-- ==========================================
-- TABLA ESTANQUE
-- ==========================================
CREATE TABLE ESTANQUE (
    id_estanque INT AUTO_INCREMENT PRIMARY KEY,
    nombre_estanque VARCHAR(100) NOT NULL,
    capacidad_kg DECIMAL(10,2),
    id_especie INT NOT NULL,
    FOREIGN KEY (id_especie) REFERENCES ESPECIE(id_especie)
);

-- ==========================================
-- TABLA CONSUMO
-- ==========================================
CREATE TABLE CONSUMO (
    id_consumo INT AUTO_INCREMENT PRIMARY KEY,
    id_estanque INT NOT NULL,
    id_producto INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha_consumo DATE NOT NULL,
    cantidad_consumida DECIMAL(10,2) NOT NULL,
    observacion VARCHAR(200),
    FOREIGN KEY (id_estanque) REFERENCES ESTANQUE(id_estanque),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto),
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

-- ==========================================
-- TABLA AUDITORIA GENERAL
-- ==========================================
CREATE TABLE AUDITORIA_GENERAL (
    id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tabla_afectada VARCHAR(100),
    accion VARCHAR(50),
    descripcion VARCHAR(200),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

-- ==========================================
-- DATOS INICIALES
-- ==========================================
INSERT INTO ROL (nombre_rol, descripcion)
VALUES ('Administrador', 'Acceso total al sistema'),
       ('Empleado', 'Acceso limitado a operaciones básicas');

	   USE gestion_camarones;

-- ==========================================
-- DATOS: ROL
-- ==========================================
INSERT INTO ROL (nombre_rol, descripcion)
VALUES 
('Administrador', 'Acceso total al sistema'),
('Empleado', 'Acceso limitado a operaciones'),
('Supervisor', 'Control de inventario y consumo'),
('Contador', 'Gestión de compras y reportes');

-- ==========================================
-- DATOS: USUARIO
-- ==========================================
INSERT INTO USUARIO (nombre_usuario, contrasena, id_rol, estado)
VALUES
('admin', '12345', 1, 1),
('juan', 'abc123', 2, 1),
('maria', 'pass01', 2, 1),
('pedro', 'clave', 3, 1),
('ana', 'password', 4, 1),
('roberto', 'roberto1', 3, 1),
('carla', 'carla22', 2, 1),
('sofia', 'sofia55', 2, 1),
('luis', 'luis33', 3, 1),
('daniel', 'daniel77', 4, 1);

-- ==========================================
-- DATOS: PROVEEDOR
-- ==========================================
INSERT INTO PROVEEDOR (nombre_proveedor, telefono, direccion, correo)
VALUES
('Acuafeed S.A.', '0998745123', 'Km 10 vía Daule', 'ventas@acuafeed.com'),
('Mariscos del Litoral', '0984567321', 'Av. Guayaquil 120', 'info@mariscoslitoral.com'),
('NutriCam S.A.', '0985623145', 'Zona Industrial Manta', 'nutricam@manta.ec'),
('AgroAcuícola Sur', '0998741200', 'Via Salitre', 'contacto@agroacuicola.com'),
('BioFeed Ecuador', '0978456321', 'Km 4 vía Durán', 'ventas@biofeed.ec');

-- ==========================================
-- DATOS: ALIMENTO
-- ==========================================
INSERT INTO ALIMENTO (nombre_alimento, marca, composicion, presentacion, observaciones)
VALUES
('Balanceado Camarón 25%', 'Acuafeed', 'Proteína 25%, grasa 5%', 'Saco 40kg', 'Ideal para fase inicial'),
('Balanceado Camarón 30%', 'BioFeed', 'Proteína 30%, grasa 7%', 'Saco 40kg', 'Alta energía'),
('Harina de Pescado', 'NutriCam', 'Proteína 60%, grasa 8%', 'Saco 50kg', 'Uso complementario'),
('Balanceado Juvenil', 'Acuafeed', 'Proteína 28%, grasa 6%', 'Saco 40kg', 'Para camarones jóvenes'),
('Balanceado Engorde', 'BioFeed', 'Proteína 35%, grasa 10%', 'Saco 40kg', 'Para engorde final'),
('Premezcla Vitaminas', 'AgroAcuícola', 'Vitaminas y minerales', 'Bolsa 5kg', 'Uso en mezclas'),
('Harina de Soya', 'NutriCam', 'Proteína 45%', 'Saco 40kg', 'Alternativa vegetal'),
('Aceite de Pescado', 'Mariscos del Litoral', 'Omega 3 y 6', 'Galón 5L', 'Mejor absorción'),
('Balanceado Larva', 'Acuafeed', 'Proteína 40%, grasa 12%', 'Saco 25kg', 'Etapa larval'),
('Balanceado Medio', 'BioFeed', 'Proteína 30%', 'Saco 40kg', 'Etapa media');

-- ==========================================
-- DATOS: PRODUCTO
-- ==========================================
INSERT INTO PRODUCTO (id_alimento, precio_unitario, estado)
VALUES
(1, 35.00, 1),
(2, 37.50, 1),
(3, 50.00, 1),
(4, 36.00, 1),
(5, 39.00, 1),
(6, 15.00, 1),
(7, 28.00, 1),
(8, 45.00, 1),
(9, 30.00, 1),
(10, 33.00, 1);

-- ==========================================
-- DATOS: INVENTARIO
-- ==========================================
INSERT INTO INVENTARIO (id_producto, stock_actual, stock_minimo, usuario_actualizacion)
VALUES
(1, 150, 20, 1),
(2, 200, 25, 2),
(3, 100, 10, 3),
(4, 180, 15, 1),
(5, 120, 20, 4),
(6, 300, 50, 2),
(7, 250, 30, 5),
(8, 60, 10, 6),
(9, 75, 10, 7),
(10, 90, 10, 8);

-- ==========================================
-- DATOS: ESPECIE
-- ==========================================
INSERT INTO ESPECIE (nombre_especie, descripcion)
VALUES
('Litopenaeus vannamei', 'Camarón blanco del Pacífico'),
('Penaeus monodon', 'Camarón tigre gigante'),
('Macrobrachium rosenbergii', 'Camarón de agua dulce');

-- ==========================================
-- DATOS: ESTANQUE
-- ==========================================
INSERT INTO ESTANQUE (nombre_estanque, capacidad_kg, id_especie)
VALUES
('Estanque A1', 500.00, 1),
('Estanque A2', 450.00, 1),
('Estanque B1', 600.00, 2),
('Estanque B2', 550.00, 2),
('Estanque C1', 700.00, 3),
('Estanque C2', 650.00, 3),
('Estanque D1', 400.00, 1),
('Estanque D2', 300.00, 2),
('Estanque E1', 800.00, 3),
('Estanque F1', 1000.00, 1);

-- ==========================================
-- DATOS: COMPRA
-- ==========================================
INSERT INTO COMPRA (id_usuario, id_proveedor, fecha_compra, total)
VALUES
(1, 1, '2025-01-10', 700.00),
(2, 2, '2025-02-15', 850.00),
(3, 3, '2025-03-12', 1200.00),
(4, 4, '2025-04-18', 640.00),
(5, 5, '2025-05-20', 980.00),
(2, 1, '2025-06-22', 400.00),
(3, 3, '2025-07-10', 1100.00),
(1, 2, '2025-08-05', 950.00),
(4, 4, '2025-09-01', 730.00),
(5, 5, '2025-09-22', 1500.00);

-- ==========================================
-- DATOS: DETALLE_COMPRA
-- ==========================================
INSERT INTO DETALLE_COMPRA (id_compra, id_producto, cantidad, precio_unitario)
VALUES
(1, 1, 10, 35.00),
(1, 2, 5, 37.50),
(2, 3, 10, 50.00),
(2, 5, 8, 39.00),
(3, 4, 20, 36.00),
(3, 6, 5, 15.00),
(4, 7, 12, 28.00),
(5, 8, 5, 45.00),
(6, 9, 8, 30.00),
(7, 10, 6, 33.00),
(8, 2, 10, 37.50),
(9, 1, 12, 35.00),
(10, 5, 15, 39.00);

-- ==========================================
-- DATOS: CONSUMO
-- ==========================================
INSERT INTO CONSUMO (id_estanque, id_producto, id_usuario, fecha_consumo, cantidad_consumida, observacion)
VALUES
(1, 1, 2, '2025-01-15', 5.0, 'Consumo diario'),
(2, 2, 3, '2025-02-16', 4.5, 'Alimentación matutina'),
(3, 3, 4, '2025-03-13', 6.0, 'Ración completa'),
(4, 4, 5, '2025-04-19', 3.5, 'Mitad de ración'),
(5, 5, 6, '2025-05-21', 7.0, 'Refuerzo por crecimiento'),
(6, 6, 2, '2025-06-23', 2.0, 'Prueba de mezcla'),
(7, 7, 3, '2025-07-11', 3.0, 'Consumo parcial'),
(8, 8, 4, '2025-08-06', 4.0, 'Ajuste semanal'),
(9, 9, 5, '2025-09-02', 3.2, 'Reducción temporal'),
(10, 10, 6, '2025-09-23', 5.0, 'Consumo normal');

-- ==========================================
-- DATOS: AUDITORIA_GENERAL
-- ==========================================
INSERT INTO AUDITORIA_GENERAL (id_usuario, tabla_afectada, accion, descripcion)
VALUES
(1, 'USUARIO', 'INSERT', 'Creación de usuario Juan'),
(2, 'COMPRA', 'INSERT', 'Compra registrada con proveedor Mariscos del Litoral'),
(3, 'INVENTARIO', 'UPDATE', 'Actualización de stock de producto Balanceado Camarón 25%'),
(4, 'CONSUMO', 'INSERT', 'Registro de consumo en estanque A1'),
(5, 'PRODUCTO', 'INSERT', 'Nuevo producto agregado: Harina de Pescado'),
(6, 'COMPRA', 'UPDATE', 'Actualización de total en compra #3'),
(7, 'INVENTARIO', 'INSERT', 'Ingreso de stock nuevo'),
(8, 'ESTANQUE', 'UPDATE', 'Cambio de capacidad en estanque B1'),
(9, 'PROVEEDOR', 'INSERT', 'Nuevo proveedor agregado'),
(10, 'USUARIO', 'UPDATE', 'Cambio de estado del usuario Ana');
