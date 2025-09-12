import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/gtm';

// Mapeo de rutas a nombres de página más amigables
const PAGE_NAMES = {
  '/': 'Inicio',
  '/servicios': 'Servicios',
  '/cotizador': 'Cotizador',
  '/contacto': 'Contacto', 
  '/como-funciona': 'Cómo Funciona',
  '/por-que-contadoor': 'Por qué Contadoor',
  '/sobre-nosotros': 'Sobre Nosotros',
  '/recursos': 'Recursos'
};

function GTMTracker() {
  const location = useLocation();

  useEffect(() => {
    // Rastrear vista de página cuando cambia la ruta
    const pageName = PAGE_NAMES[location.pathname] || 'Página no encontrada';
    
    // Pequeño delay para asegurar que la página se haya cargado
    const timer = setTimeout(() => {
      trackPageView(pageName, location.pathname);
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  // Este componente no renderiza nada
  return null;
}

export default GTMTracker;