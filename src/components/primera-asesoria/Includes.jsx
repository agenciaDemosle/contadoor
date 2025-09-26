import { motion } from 'framer-motion';
import { Search, BarChart3, Wrench, Users } from 'lucide-react';

const includes = [
  {
    icon: Search,
    title: 'Diagnóstico integral',
    description: 'Análisis profundo de tu situación contable y tributaria actual'
  },
  {
    icon: BarChart3,
    title: 'Dashboard personalizado',
    description: 'Plataforma con métricas clave de tu negocio en tiempo real'
  },
  {
    icon: Wrench,
    title: 'Plan de acción',
    description: 'Hoja de ruta clara con prioridades y tiempos de implementación'
  },
  {
    icon: Users,
    title: 'Asesoría continua',
    description: 'Reuniones mensuales y soporte directo cuando lo necesites'
  }
];

const Includes = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-brand-dark mb-4">
              Lo que incluye la reunión
            </h2>
            <p className="text-gray-600">
              Todo lo que necesitas para transformar tu gestión contable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {includes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  borderStyle: 'solid',
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl p-6 text-center border-2 border-dashed border-brand-muted/50 hover:border-solid hover:border-brand-primary/50 transition-all duration-300 group"
              >
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300"
                >
                  <item.icon className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
                </motion.div>
                <h3 className="font-semibold text-brand-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Includes;