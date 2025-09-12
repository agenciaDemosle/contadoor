<?php
/**
 * Agregar este código al archivo functions.php de tu tema de WordPress
 * o crear un plugin personalizado con este código
 */

// Habilitar CORS para la REST API
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    
    add_filter('rest_pre_serve_request', function ($value) {
        // Obtener el origen de la petición
        $origin = get_http_origin();
        
        // Lista de dominios permitidos
        $allowed_origins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://tudominio.com', // Reemplazar con tu dominio de producción
        ];
        
        // Si el origen está en la lista de permitidos, agregarlo al header
        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        } else {
            // O permitir todos los orígenes (menos seguro pero más simple para desarrollo)
            header('Access-Control-Allow-Origin: *');
        }
        
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, X-WP-Nonce, Content-Type, Accept, Origin');
        header('Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages, Link');
        
        // Para peticiones OPTIONS (preflight)
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit;
        }
        
        return $value;
    });
}, 15);

// Alternativa más simple - Permitir todo (solo para desarrollo)
add_action('init', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: *');
});
?>