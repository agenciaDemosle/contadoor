import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><span className="text-white/80">Contabilidad y Finanzas</span></li>
              <li><span className="text-white/80">Impuestos</span></li>
              <li><span className="text-white/80">Gestión Laboral</span></li>
              <li><span className="text-white/80">Asesoría Estratégica</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li><Link to="/sobre-nosotros" className="hover:underline">Sobre Nosotros</Link></li>
              <li><Link to="/como-funciona" className="hover:underline">Cómo Funciona</Link></li>
              <li><Link to="/por-que-contadoor" className="hover:underline">Por qué Contadoor</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
              <li><Link to="/cotizador" className="hover:underline">Cotizador Online</Link></li>
              <li><Link to="/contacto" className="hover:underline">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <p className="mb-2">info@contadoor.cl</p>
            <p className="mb-4">+56979881891</p>
            <Link
              to="/contacto"
              className="inline-block !bg-primary-600 !text-white px-6 py-3 rounded-button font-semibold transition-transform duration-200 hover:!bg-primary-700 hover:scale-105 active:scale-95 hover:shadow-lg"
            >
              Hablar con asesor
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-center">
                © 2024 Contadoor. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-2 text-xs">
                <Link to="/privacidad" className="hover:underline">Política de Privacidad</Link>
                <span>•</span>
                <Link to="/terminos" className="hover:underline">Términos y Condiciones</Link>
              </div>
            </div>
            <p className="text-center font-semibold flex items-center text-sm">
              Creado con <span className="text-red-500 mx-1">♥</span> por <a href="https://demosle.cl" target="_blank" rel="noopener noreferrer" className="hover:underline ml-1">Demosle</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}