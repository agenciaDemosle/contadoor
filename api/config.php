<?php
// Configuración de base de datos
define('DB_HOST', 'localhost');
define('DB_NAME', 'contadoo_db');
define('DB_USER', 'contadoo_db');
define('DB_PASS', 'beKKS2y7CJwRMtGhSmE6');

// Configuración JWT
define('JWT_SECRET', 'contadoor_secret_key_2024');

// Headers CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Función para conectar a la base de datos
function getDB() {
    try {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error de conexión a la base de datos']);
        exit();
    }
}

// Función para generar JWT
function generateJWT($payload) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode($payload);
    
    $base64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    
    $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, JWT_SECRET, true);
    $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    return $base64Header . "." . $base64Payload . "." . $base64Signature;
}

// Función para verificar JWT
function verifyJWT($token) {
    $tokenParts = explode('.', $token);
    if (count($tokenParts) != 3) {
        return false;
    }
    
    $header = base64_decode($tokenParts[0]);
    $payload = base64_decode($tokenParts[1]);
    $signatureProvided = $tokenParts[2];
    
    $base64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    
    $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, JWT_SECRET, true);
    $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    if ($base64Signature === $signatureProvided) {
        return json_decode($payload, true);
    }
    
    return false;
}

// Función para obtener el token del header
function getAuthToken() {
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        $parts = explode(' ', $headers['Authorization']);
        if (count($parts) == 2 && $parts[0] == 'Bearer') {
            return $parts[1];
        }
    }
    return null;
}

// Función para verificar autenticación
function requireAuth() {
    $token = getAuthToken();
    if (!$token) {
        http_response_code(401);
        echo json_encode(['error' => 'No autorizado']);
        exit();
    }
    
    $payload = verifyJWT($token);
    if (!$payload) {
        http_response_code(403);
        echo json_encode(['error' => 'Token inválido']);
        exit();
    }
    
    return $payload;
}

// Crear tablas si no existen
function initDatabase() {
    $db = getDB();
    
    // Crear tabla form_responses
    $sql1 = "CREATE TABLE IF NOT EXISTS form_responses (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $db->exec($sql1);
    
    // Crear tabla admin_users
    $sql2 = "CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $db->exec($sql2);
    
    // Verificar si existe el usuario admin
    $stmt = $db->prepare("SELECT COUNT(*) FROM admin_users WHERE username = ?");
    $stmt->execute(['contador']);
    $count = $stmt->fetchColumn();
    
    if ($count == 0) {
        // Crear usuario admin por defecto
        $hashedPassword = password_hash('demosle.cl', PASSWORD_BCRYPT);
        $stmt = $db->prepare("INSERT INTO admin_users (username, password) VALUES (?, ?)");
        $stmt->execute(['contador', $hashedPassword]);
    }
}

// Inicializar base de datos al cargar
initDatabase();
?>