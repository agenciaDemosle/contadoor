-- Estructura de base de datos para Contadoor
CREATE DATABASE IF NOT EXISTS contadoo_db;
USE contadoo_db;

-- Tabla para almacenar las respuestas del formulario
CREATE TABLE IF NOT EXISTS form_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    sentimiento_gestion VARCHAR(100) NOT NULL,
    frecuencia_comunicacion VARCHAR(100) NOT NULL,
    uso_tiempo_futuro TEXT NOT NULL,
    rapidez_meta VARCHAR(100) NOT NULL,
    buscar_apoyo VARCHAR(100) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_fecha (fecha_registro),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla para el admin (usuario único)
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar usuario admin por defecto
-- Contraseña: demosle.cl (hasheada con bcrypt)
INSERT INTO admin_users (username, password) VALUES 
('contador', '$2b$10$xPXBh.0VnrKDIJhXbh0qYeZQvxPyBV7zJFJL5fKp5aY0Q.eRkWqmi')
ON DUPLICATE KEY UPDATE password = VALUES(password);