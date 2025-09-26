import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: '¿Qué es Contadoor?',
    answer: 'Asesoría contable y tributaria especializada para pymes. Somos tu partner estratégico para optimizar tu gestión financiera y hacer crecer tu negocio con transparencia y resultados medibles.'
  },
  {
    question: '¿Qué voy a conseguir en esta llamada?',
    answer: 'Claridad sobre tu situación actual y conocer si podemos ayudarte. Analizaremos tus principales desafíos contables y tributarios, y te mostraremos cómo nuestro modelo puede resolverlos.'
  },
  {
    question: '¿Quién se reunirá conmigo?',
    answer: 'Nuestro contador líder, Luciano, quien tiene más de 10 años de experiencia ayudando a empresas como la tuya a optimizar su gestión contable y tributaria.'
  },
  {
    question: '¿Tiene algún costo esta llamada?',
    answer: 'No, es completamente gratuita. Esta reunión es nuestra inversión para conocerte y mostrarte cómo podemos agregar valor a tu empresa.'
  },
  {
    question: '¿Qué pasa después de la llamada?',
    answer: 'Si tus objetivos se alinean con nuestra forma de trabajar, avanzamos con un plan de acción personalizado. Si no somos el partner adecuado, te lo diremos con transparencia y, de ser posible, te recomendaremos otras opciones.'
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="sticky top-0 py-16 bg-gray-50 relative z-0" style={{ marginTop: '-1px' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`bg-${i}`}
            className="absolute w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-full mb-4 backdrop-blur"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-brand-primary" />
              </motion.div>
              <span className="font-medium text-brand-dark">Preguntas Frecuentes</span>
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-4">
              Resolvemos tus dudas
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Todo lo que necesitas saber antes de nuestra reunión
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 60
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.5 }
                }}
                className="bg-brand-primary rounded-xl shadow-lg overflow-hidden group"
                style={{
                  boxShadow: openIndex === index 
                    ? "0 20px 40px rgba(160, 86, 153, 0.3)" 
                    : "0 4px 6px rgba(0, 0, 0, 0.1)"
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ 
                        rotate: openIndex === index ? [0, 360] : 0,
                        scale: openIndex === index ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 1 }}
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors"
                    >
                      <HelpCircle className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="font-medium text-white text-base md:text-lg">{faq.question}</div>
                  </div>
                  <motion.div
                    animate={{ 
                      rotate: openIndex === index ? 180 : 0,
                      scale: openIndex === index ? 1.2 : 1
                    }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors"
                  >
                    <ChevronDown className="w-5 h-5 text-white" />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="overflow-hidden"
                >
                  <motion.div 
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="px-6 pb-5 pl-16 text-white/90 bg-white/5 backdrop-blur"
                  >
                    {faq.answer}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-gray-600">
              ¿Tienes más preguntas? Despejamos todas tus dudas en la llamada
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs;