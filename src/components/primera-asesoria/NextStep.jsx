import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = [
  'Analizaremos juntos los resultados de tu diagnóstico',
  'Te presentaremos una propuesta personalizada sin compromisos',
  'Decidirás con total transparencia si somos el partner adecuado'
];

const NextStep = () => {
  return (
    <section className="py-16 bg-brand-primary/10">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-4">
              ¿Qué pasa después?
            </h2>
            <p className="text-gray-600">
              Un proceso transparente y sin presión
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-primary/80 transition-colors"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                  <p className="text-brand-dark group-hover:text-brand-primary transition-colors duration-300">
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-4 bg-brand-primary/5 rounded-xl border border-brand-primary/20"
            >
              <p className="text-sm text-center text-brand-dark">
                <span className="font-semibold">Sin letra chica:</span> Si decides que no somos 
                para ti, nos despedimos como amigos y te llevas todos los recursos gratuitos.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NextStep;