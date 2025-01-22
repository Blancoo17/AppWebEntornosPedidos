DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS comercial;

CREATE TABLE cliente (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellido1 VARCHAR(100) NOT NULL,
  apellido2 VARCHAR(100),
  ciudad VARCHAR(100),
  categoria INT UNSIGNED
);

CREATE TABLE comercial (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellido1 VARCHAR(100) NOT NULL,
  apellido2 VARCHAR(100),
  comision FLOAT
);

CREATE TABLE pedido (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  total DOUBLE NOT NULL,
  id_cliente INTEGER,
  id_comercial INTEGER,
  CONSTRAINT fk_clientes FOREIGN KEY (id_cliente) REFERENCES cliente(id) ON DELETE SET NULL,
  CONSTRAINT fk_comerciales FOREIGN KEY (id_comercial) REFERENCES comercial(id) ON DELETE SET NULL
);

-- Insertar datos iniciales
INSERT INTO cliente (nombre, apellido1, apellido2, ciudad, categoria) VALUES
('Samuel', 'Jimeno', 'Navarro', 'Zaragoza', 200),
('Susana', 'Mena', 'Flor', 'Zamora', 100),
('Gustavo', 'Moreno', 'Salas', 'Calcuta', NULL),
('Adrián', 'Gonzalo', NULL, 'Albacete', 400),
('Antonio', 'Lavanda', 'Jesus', 'Puertollano', 300),
('Olalla', 'Santana', 'Moreno', 'Huesca', 200),
('Marta', 'Ruiz', NULL, 'Santander', 200),
('Jose', 'Feliz', 'Santana', 'Getafe', 300),
('Domingo', 'López', 'Gómez', 'Madrid', 125),
('Daniela', 'Ayer', 'Rubio', 'Salamanca', 225);

INSERT INTO comercial (nombre, apellido1, apellido2, comision) VALUES
('Daniel', 'Pardo', 'Montes', 0.12),
('Juana', 'Arco', 'Torres', 0.10),
('Diego','Flor', 'Tercero', 0.21),
('Jimena','Herrera', 'Roche', 0.11),
('Renato','Valdivillo', 'Salche', 0.10),
('Arturo','Vals', 'Hernández', 0.09),
('Domingo','Vega', 'Toledo', 0.11),
('Alfredo','Sorolla', 'Guijarro', 0.06);

INSERT INTO pedido (total, id_cliente, id_comercial) VALUES
(50.5, 5, 2),
(70.65, 1, 5),
(165.26, 2, 1),
(210.5, 8, 3),
(348.5, 5, 2),
(5400.6, 7, 1),
(760, 2, 1),
(2983.43, 4, 6),
(1480.4, 8, 3),
(150.45, 8, 2),
(55.29, 3, 7),
(4045.6, 2, 1),
(745.75, 6, 1),
(845.82, 6, 1),
(970.85, 1, 5),
(1389.23, 1, 5);