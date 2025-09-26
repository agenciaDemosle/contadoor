import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';
import { analytics } from '../../lib/analytics';
import { ClipboardCheck } from 'lucide-react';
import logoColor from '../../assets/logo color.png';

const Header = () => {
  const handleFormScroll = () => {
    analytics.ctaClick('completar_formulario', 'header');
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <img 
              src={logoColor} 
              alt="Contadoor Logo" 
              className="h-10 w-auto object-contain"
            />
          </motion.div>

          <div className="flex items-center gap-6">
            <ProgressBar />
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.3 }}
              onClick={handleFormScroll}
              className="px-4 py-2 border border-brand-muted text-brand-dark rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm font-medium flex items-center gap-2"
              aria-label="Completar formulario de pre-llamada"
            >
              <ClipboardCheck className="w-4 h-4" />
              Completar formulario
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;