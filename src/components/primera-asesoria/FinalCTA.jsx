import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { analytics } from '../../lib/analytics';

const FinalCTA = () => {
  const handleFormClick = () => {
    analytics.ctaClick('completar_formulario_final', 'final_cta');
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <motion.div 
            animate={{ 
              boxShadow: [
                "0 10px 30px rgba(160, 86, 153, 0.2)",
                "0 20px 40px rgba(160, 86, 153, 0.3)",
                "0 10px 30px rgba(160, 86, 153, 0.2)"
              ]
            }}
            transition={{ 
              boxShadow: { duration: 3, repeat: Infinity }
            }}
            className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              ¿Listo para transformar tu gestión contable?
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8">
              Completa el formulario para agendar tu llamada de asesoría inicial 
              y descubre cómo podemos ayudarte a crecer
            </p>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFormClick}
                className="px-10 py-4 bg-white text-primary rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg text-base md:text-lg"
              >
                Completar formulario ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            <p className="text-white/70 text-sm mt-6">
              Sin compromisos • Resultados inmediatos • 100% gratuito
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;