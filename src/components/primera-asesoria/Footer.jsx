import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import logoColor from '../../assets/logo color.png';

const Footer = () => {
  return (
    <footer className="text-white py-12 bg-primary-700">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img 
                  src={logoColor} 
                  alt="Contadoor Logo" 
                  className="h-12 w-auto object-contain brightness-0 invert"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <p className="text-white/80 text-sm">
                Tu partner estratégico en gestión contable y financiera. 
                Transformamos números en decisiones inteligentes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <div className="space-y-2 text-sm text-white/80">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <a href="mailto:contacto@contadoor.cl" className="hover:text-white transition-colors">
                    contacto@contadoor.cl
                  </a>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <a href="tel:+56912345678" className="hover:text-white transition-colors">
                    +56 9 1234 5678
                  </a>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-white" />
                  <span>Santiago, Chile</span>
                </motion.div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Síguenos</h3>
              <div className="flex gap-4">
                <motion.a 
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  href="https://instagram.com/contadoor.cl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="LinkedIn"
                >
                
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  href="https://facebook.com/contadoor.cl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/70">
            <p>© 2024 Contadoor. Todos los derechos reservados.</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="#" className="hover:text-white transition-colors">
                Términos y Condiciones
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;