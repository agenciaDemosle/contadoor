import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Clock } from 'lucide-react';

const cases = [
  {
    id: 1,
    company: 'Importadora TechPro',
    icon: DollarSign,
    before: 'Multas recurrentes del SII por $3.5M anuales',
    after: 'Cero multas en 18 meses',
    result: 'Ahorro de $3.5M anuales'
  },
  {
    id: 2,
    company: 'Constructora Innova',
    icon: Clock,
    before: 'Contabilidad con 4 meses de retraso',
    after: 'Reportes mensuales al día 5',
    result: '120 días recuperados'
  },
  {
    id: 3,
    company: 'E-commerce Fashion',
    icon: TrendingUp,
    before: 'Sin visibilidad del flujo de caja',
    after: 'Dashboard financiero en tiempo real',
    result: '+45% rentabilidad'
  }
];

const Cases = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-4">
              Casos de Éxito
            </h2>
            <p className="text-gray-600">
              Transformaciones reales con el{' '}
              <span className="inline-block bg-primary text-white px-2 py-0.5 rounded text-sm">
                Modelo Contadoor
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-card transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300"
                  >
                    <caseItem.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </motion.div>
                  <h3 className="font-semibold text-black">
                    {caseItem.company}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <p className="text-xs font-medium text-red-600 mb-1">Antes</p>
                    <p className="text-sm text-gray-700">{caseItem.before}</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-xs font-medium text-green-600 mb-1">Después</p>
                    <p className="text-sm text-gray-700">{caseItem.after}</p>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-xs font-medium text-primary mb-1">Resultado</p>
                    <p className="text-sm font-semibold text-black">{caseItem.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cases;