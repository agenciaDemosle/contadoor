<?php
/**
 * Endpoint para enviar correos desde el cotizador y formulario de contacto
 * Todos los correos se envían a info@contadoor.cl
 */

// Configuración de headers para CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Manejar peticiones OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Obtener datos del POST
$input = json_decode(file_get_contents('php://input'), true);

// Validar datos requeridos
if (empty($input['nombre']) || empty($input['email']) || empty($input['telefono'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos requeridos']);
    exit();
}

// Configuración del correo
$destinatario = "info@contadoor.cl";
$asunto = "Nueva cotización desde el sitio web";

// Determinar el tipo de flujo
$flujo = isset($input['flujo']) ? $input['flujo'] : 'contacto';

// Construir el mensaje
$mensaje = "Nueva solicitud recibida:\n\n";
$mensaje .= "=== DATOS DE CONTACTO ===\n";
$mensaje .= "Nombre: " . $input['nombre'] . "\n";
$mensaje .= "Email: " . $input['email'] . "\n";
$mensaje .= "Teléfono: " . $input['telefono'] . "\n";

if (!empty($input['mensaje'])) {
    $mensaje .= "Mensaje: " . $input['mensaje'] . "\n";
}

$mensaje .= "\n=== TIPO DE CONSULTA ===\n";
$mensaje .= "Flujo: " . ucfirst($flujo) . "\n";

// Agregar detalles según el flujo
if (isset($input['datos'])) {
    $datos = $input['datos'];
    
    if ($flujo === 'formalizacion') {
        $mensaje .= "\n=== DETALLES DE FORMALIZACIÓN ===\n";
        if (isset($datos['formalizacion'])) {
            $form = $datos['formalizacion'];
            $mensaje .= "Tipo de empresa: " . ($form['tipoEmpresa'] ?? 'No especificado') . "\n";
            $mensaje .= "Plan seleccionado: " . ($form['plan'] ?? 'No especificado') . "\n";
            $mensaje .= "Giro: " . ($form['giro'] ?? 'No especificado') . "\n";
            $mensaje .= "¿Tendrá trabajadores?: " . ($form['hasTrabajadores'] ? 'Sí' : 'No') . "\n";
            if ($form['hasTrabajadores'] && isset($form['cantidadTrabajadores'])) {
                $mensaje .= "Cantidad de trabajadores: " . $form['cantidadTrabajadores'] . "\n";
            }
        }
    } else if ($flujo === 'empresa-existente') {
        $mensaje .= "\n=== DETALLES DE EMPRESA EXISTENTE ===\n";
        if (isset($datos['empresaExistente'])) {
            $emp = $datos['empresaExistente'];
            $mensaje .= "Tipo de empresa: " . ($emp['tipoEmpresa'] ?? 'No especificado') . "\n";
            $mensaje .= "Tamaño: " . ($emp['tamano'] ?? 'No especificado') . "\n";
            $mensaje .= "Plan seleccionado: " . ($emp['plan'] ?? 'No especificado') . "\n";
            $mensaje .= "¿Tiene trabajadores?: " . ($emp['hasTrabajadores'] ? 'Sí' : 'No') . "\n";
            if ($emp['hasTrabajadores'] && isset($emp['cantidadTrabajadores'])) {
                $mensaje .= "Cantidad de trabajadores: " . $emp['cantidadTrabajadores'] . "\n";
            }
        }
    }
}

// Agregar información de precio si está disponible
if (isset($input['precio'])) {
    $precio = $input['precio'];
    $mensaje .= "\n=== COTIZACIÓN ===\n";
    
    if (isset($precio['formalizacion']) && $precio['formalizacion'] > 0) {
        $mensaje .= "Inversión formalización: $" . number_format($precio['formalizacion'], 0, ',', '.') . " + IVA\n";
    }
    
    if (isset($precio['mensual']) && $precio['mensual'] > 0) {
        $mensaje .= "Plan mensual: $" . number_format($precio['mensual'], 0, ',', '.') . " + IVA\n";
        if (isset($precio['mensualUF'])) {
            $mensaje .= "Plan mensual (UF): " . number_format($precio['mensualUF'], 2) . " UF + IVA\n";
        }
    }
}

$mensaje .= "\n---\n";
$mensaje .= "Fecha y hora: " . date('d/m/Y H:i:s') . "\n";
$mensaje .= "IP del cliente: " . $_SERVER['REMOTE_ADDR'] . "\n";

// Headers del email
$headers = "From: noreply@contadoor.cl\r\n";
$headers .= "Reply-To: " . $input['email'] . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Enviar el correo
$enviado = mail($destinatario, $asunto, $mensaje, $headers);

// Enviar copia al cliente
if ($enviado) {
    $asuntoCliente = "Hemos recibido tu solicitud - Contadoor";
    $mensajeCliente = "Hola " . $input['nombre'] . ",\n\n";
    $mensajeCliente .= "Hemos recibido tu solicitud de cotización. Uno de nuestros asesores se pondrá en contacto contigo dentro de las próximas 24 horas hábiles.\n\n";
    $mensajeCliente .= "Si necesitas atención inmediata, puedes contactarnos por:\n";
    $mensajeCliente .= "- WhatsApp: +569 79881891\n";
    $mensajeCliente .= "- Email: info@contadoor.cl\n\n";
    $mensajeCliente .= "¡Gracias por confiar en Contadoor!\n\n";
    $mensajeCliente .= "Saludos,\n";
    $mensajeCliente .= "El equipo de Contadoor\n";
    $mensajeCliente .= "www.contadoor.cl\n";
    
    $headersCliente = "From: info@contadoor.cl\r\n";
    $headersCliente .= "Reply-To: info@contadoor.cl\r\n";
    $headersCliente .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headersCliente .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    mail($input['email'], $asuntoCliente, $mensajeCliente, $headersCliente);
}

// Responder al cliente
if ($enviado) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Correo enviado exitosamente',
        'id' => time()
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error al enviar el correo'
    ]);
}
?>