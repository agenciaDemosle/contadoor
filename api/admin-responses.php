<?php
require_once 'config.php';

// Verificar autenticación
$user = requireAuth();

// Manejar diferentes métodos
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getResponses();
        break;
    case 'DELETE':
        deleteResponse();
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

function getResponses() {
    try {
        $db = getDB();
        
        $stmt = $db->query("SELECT * FROM form_responses ORDER BY fecha_registro DESC");
        $responses = $stmt->fetchAll();
        
        echo json_encode([
            'success' => true,
            'data' => $responses
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al obtener las respuestas']);
    }
}

function deleteResponse() {
    // Obtener ID de la URL
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $parts = explode('/', $path);
    $id = end($parts);
    
    if (!is_numeric($id)) {
        http_response_code(400);
        echo json_encode(['error' => 'ID inválido']);
        return;
    }
    
    try {
        $db = getDB();
        
        $stmt = $db->prepare("DELETE FROM form_responses WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() == 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Respuesta no encontrada']);
            return;
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Respuesta eliminada exitosamente'
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al eliminar la respuesta']);
    }
}
?>