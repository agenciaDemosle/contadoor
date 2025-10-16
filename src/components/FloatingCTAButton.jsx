import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator } from 'lucide-react';

export default function FloatingCTAButton() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar cuando el usuario haya scrolleado 50% de la altura de la ventana
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Verificar al cargar
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // No mostrar en la página del cotizador (DESPUÉS de los hooks)
  if (location.pathname === '/cotizador') {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="bg-white border-t border-gray-200 shadow-lg px-4 py-3">
            <Link
              to="/cotizador"
              className="flex items-center justify-center gap-2 w-full bg-primary-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-primary-700 transition-all shadow-md active:scale-95"
              data-gtm="floating_cta_cotizar"
            >
              <Calculator size={20} />
              <span>Cotizar mi plan</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
