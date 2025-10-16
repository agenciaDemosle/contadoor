<?php
require_once 'config.php';

// Verificar autenticación
$user = requireAuth();

try {
    $db = getDB();
    
    // Total de respuestas
    $stmt = $db->query("SELECT COUNT(*) as total FROM form_responses");
    $total = $stmt->fetch()['total'];
    
    // Respuestas de hoy
    $stmt = $db->query("SELECT COUNT(*) as today FROM form_responses WHERE DATE(fecha_registro) = CURDATE()");
    $today = $stmt->fetch()['today'];
    
    // Estadísticas por sentimiento
    $stmt = $db->query("SELECT sentimiento_gestion, COUNT(*) as count 
                        FROM form_responses 
                        GROUP BY sentimiento_gestion");
    $sentimiento = $stmt->fetchAll();
    
    // Estadísticas por rapidez
    $stmt = $db->query("SELECT rapidez_meta, COUNT(*) as count 
                        FROM form_responses 
                        GROUP BY rapidez_meta");
    $rapidez = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'stats' => [
            'total' => $total,
            'today' => $today,
            'sentimiento' => $sentimiento,
            'rapidez' => $rapidez
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener estadísticas']);
}
?>