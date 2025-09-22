import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { trackCTAClick } from '../lib/gtm';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Cómo Funciona', href: '/como-funciona' },
    { name: 'Por qué Contadoor', href: '/por-que-contadoor' },
    { name: 'Nosotros', href: '/sobre-nosotros' },
    { name: 'Blog', href: '/blog' },
    { name: 'Cotizador', href: '/cotizador' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white text-gray-900 shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-18 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logooficial.png" alt="Contadoor" className="h-10 md:h-12 w-auto object-contain" />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 outline-none ${
                    location.pathname === item.href
                      ? 'text-primary after:w-full'
                      : 'text-gray-700 hover:text-primary'
                  } after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-primary after:w-0 after:transition-all after:duration-200 focus-visible:text-primary focus-visible:after:w-full`}
                  onClick={() => trackCTAClick(item.name, 'header_menu', 'header_navigation', item.href)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contacto"
                className="ml-4 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-primary/90 hover:scale-105 active:scale-95 hover:shadow-lg"
                onClick={() => trackCTAClick('Contactar', 'header_cta', 'header_navigation', '/contacto')}
              >
                Contactar
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 transition duration-200 hover:bg-gray-100"
            >
              <span className="sr-only">Abrir menú</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative block px-3 py-2 text-base font-medium transition-colors duration-200 outline-none ${
                    location.pathname === item.href
                      ? 'text-primary after:w-full'
                      : 'text-gray-700 hover:text-primary'
                  } after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-primary after:w-0 after:transition-all after:duration-200 focus-visible:text-primary focus-visible:after:w-full`}
                  onClick={() => {
                    trackCTAClick(item.name, 'mobile_menu', 'mobile_navigation', item.href);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contacto"
                className="block bg-primary text-white px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 hover:bg-primary/90 hover:scale-105 active:scale-95 hover:shadow-lg mt-4"
                onClick={() => {
                  trackCTAClick('Contactar', 'mobile_cta', 'mobile_navigation', '/contacto');
                  setMobileMenuOpen(false);
                }}
              >
                Contactar
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}