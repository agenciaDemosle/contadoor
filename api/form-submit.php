<?php
require_once 'config.php';

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Obtener datos del POST
$input = json_decode(file_get_contents('php://input'), true);

// Validar campos requeridos
$required = ['nombre', 'telefono', 'email', 'sentimiento_gestion', 
             'frecuencia_comunicacion', 'uso_tiempo_futuro', 
             'rapidez_meta', 'buscar_apoyo'];

foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "El campo $field es obligatorio"]);
        exit();
    }
}

// Validar email
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit();
}

try {
    $db = getDB();
    
    $sql = "INSERT INTO form_responses 
            (nombre, telefono, email, sentimiento_gestion, frecuencia_comunicacion, 
             uso_tiempo_futuro, rapidez_meta, buscar_apoyo) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $db->prepare($sql);
    $stmt->execute([
        $input['nombre'],
        $input['telefono'],
        $input['email'],
        $input['sentimiento_gestion'],
        $input['frecuencia_comunicacion'],
        $input['uso_tiempo_futuro'],
        $input['rapidez_meta'],
        $input['buscar_apoyo']
    ]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Formulario enviado exitosamente',
        'id' => $db->lastInsertId()
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar el formulario']);
}
?>