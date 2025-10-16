import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { trackCTAClick, trackButtonClick } from '../lib/gtm';
import { motion, AnimatePresence } from 'framer-motion';

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
                  onClick={() => trackButtonClick(item.name, 'header_navigation')}
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

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay difuminado */}
              <motion.div
                className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Sidebar desde la derecha */}
              <motion.div
                className="md:hidden fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-50"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="flex flex-col h-full">
                  {/* Header del sidebar */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <img src="/logooficial.png" alt="Contadoor" className="h-8 w-auto object-contain" />
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Menu items */}
                  <div className="flex-1 overflow-y-auto py-4 px-3">
                    <div className="space-y-1">
                      {navigation.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                          <Link
                            to={item.href}
                            className={`relative block px-4 py-3 text-base font-medium transition-all duration-300 outline-none rounded-lg group ${
                              location.pathname === item.href
                                ? 'text-primary'
                                : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                            }`}
                            onClick={() => {
                              trackButtonClick(item.name, 'mobile_navigation');
                              setMobileMenuOpen(false);
                            }}
                          >
                            {item.name}
                            {/* Línea indicadora animada */}
                            <span
                              className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full transition-all duration-300 ${
                                location.pathname === item.href
                                  ? 'opacity-100 scale-100'
                                  : 'opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100'
                              }`}
                            />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA button en el footer del sidebar */}
                  <div className="p-4 border-t border-gray-200">
                    <Link
                      to="/contacto"
                      className="block bg-primary text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 hover:bg-primary/90 hover:scale-[0.98] active:scale-95 text-center shadow-md"
                      onClick={() => {
                        trackCTAClick('Contactar', 'mobile_cta', 'mobile_navigation', '/contacto');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Contactar
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}