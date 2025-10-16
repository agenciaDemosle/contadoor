#!/bin/bash

# Script de deployment para Contadoor
echo "🚀 Iniciando deployment de Contadoor a producción..."

# Verificar que estemos en la carpeta correcta
if [ ! -f "package.json" ]; then
    echo "❌ Error: Este script debe ejecutarse desde la raíz del proyecto"
    exit 1
fi

# Verificar que dist existe
if [ ! -d "dist" ]; then
    echo "❌ Error: No existe la carpeta dist. Ejecuta npm run build primero."
    exit 1
fi

# Crear estructura para deployment
echo "📦 Preparando archivos para deployment..."
rm -rf deployServer
mkdir -p deployServer

# Copiar archivos compilados
echo "📂 Copiando archivos compilados..."
cp -r dist/* deployServer/

# Copiar API
if [ -d "api" ]; then
    echo "🔗 Copiando API..."
    cp -r api deployServer/
fi

# Crear archivo .htaccess para Apache
echo "📝 Creando archivo .htaccess..."
cat > deployServer/.htaccess << 'EOF'
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]

# Headers de seguridad
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
EOF

# Comprimir para subir
echo "📦 Comprimiendo archivos..."
tar -czf contadoor-deploy.tar.gz -C deployServer .

echo "✅ Archivos preparados para deployment!"
echo ""
echo "📋 Para subir al servidor contadoor.cl:"
echo ""
echo "1. Subir el archivo comprimido:"
echo "   scp contadoor-deploy.tar.gz root@contadoor.cl:/tmp/"
echo ""
echo "2. Conectarse al servidor:"
echo "   ssh root@contadoor.cl"
echo ""
echo "3. Respaldar archivos actuales y descomprimir nuevos:"
echo "   cd /var/www/html"
echo "   tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz ."
echo "   rm -rf *"
echo "   tar -xzf /tmp/contadoor-deploy.tar.gz"
echo "   chown -R www-data:www-data ."
echo "   chmod -R 755 ."
echo ""
echo "🌐 URLs:"
echo "   • Sitio: https://contadoor.cl"
echo "   • Admin: https://contadoor.cl/admin"
echo ""
echo "🔐 Credenciales admin: contador / demosle.cl"