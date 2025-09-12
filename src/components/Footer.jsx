import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><Link to="/servicios/contabilidad-finanzas" className="hover:underline">Contabilidad y Finanzas</Link></li>
              <li><Link to="/servicios/impuestos" className="hover:underline">Impuestos</Link></li>
              <li><Link to="/servicios/gestion-laboral" className="hover:underline">Gestión Laboral</Link></li>
              <li><Link to="/servicios/asesoria-estrategica" className="hover:underline">Asesoría Estratégica</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li><Link to="/sobre-nosotros" className="hover:underline">Sobre Nosotros</Link></li>
              <li><Link to="/como-funciona" className="hover:underline">Cómo Funciona</Link></li>
              <li><Link to="/por-que-contadoor" className="hover:underline">Por qué Contadoor</Link></li>
              <li><Link to="/casos" className="hover:underline">Casos de Éxito</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><Link to="/recursos" className="hover:underline">Blog</Link></li>
              <li><Link to="/cotizador" className="hover:underline">Cotizador Online</Link></li>
              <li><Link to="/contacto" className="hover:underline">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <p className="mb-2">contacto@contadoor.cl</p>
            <p className="mb-4">+56 2 2345 6789</p>
            <Link
              to="/contacto"
              className="inline-block !bg-primary-600 !text-white px-6 py-3 rounded-button font-semibold transition-transform duration-200 hover:!bg-primary-700 hover:scale-105 active:scale-95 hover:shadow-lg"
            >
              Hablar con asesor
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left mb-4 md:mb-0">
              © 2024 Contadoor. Todos los derechos reservados.
            </p>
            <p className="text-center md:text-right font-semibold">
              Somos la puerta a tu solución
            </p>
          </div>
          <div className="mt-4 flex justify-center md:justify-start space-x-4 text-sm">
            <Link to="/privacidad" className="hover:underline">Política de Privacidad</Link>
            <Link to="/terminos" className="hover:underline">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}