// Configuración de WordPress
export const WP_CONFIG = {
  // URL base de WordPress
  baseUrl: 'https://contadoor.cl/wp',
  
  // Endpoints de la API
  api: {
    posts: '/wp-json/wp/v2/posts',
    categories: '/wp-json/wp/v2/categories',
    media: '/wp-json/wp/v2/media',
    pages: '/wp-json/wp/v2/pages',
    users: '/wp-json/wp/v2/users'
  },
  
  // Configuración de paginación
  postsPerPage: 6,
  
  // URLs permitidas para CORS (actualizar en producción)
  allowedOrigins: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'https://contadoor.cl', // Actualizar con tu dominio real
  ]
};

export default WP_CONFIG;