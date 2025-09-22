import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900 text-lg pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "¿Cuánto tiempo toma el traspaso desde mi contador actual?",
      answer: "El traspaso completo toma entre 24-48 horas. Nuestro equipo se encarga de todo: solicitar la información a tu contador anterior, revisar el estado de tus obligaciones y ponerte al día si hay atrasos. Tú solo necesitas firmar un poder simple y nosotros nos encargamos del resto."
    },
    {
      question: "¿Qué pasa si tengo multas o atrasos pendientes?",
      answer: "Primero hacemos un diagnóstico gratuito para identificar todos los problemas. Luego te damos un plan claro para regularizar todo. En muchos casos podemos rebajar o eliminar multas mediante condonaciones del SII. No te cobramos extra por ponerte al día."
    },
    {
      question: "¿Realmente responden en 15 minutos por WhatsApp?",
      answer: "Sí, nuestro tiempo promedio de respuesta en horario hábil es de 8-15 minutos. Cada cliente tiene el WhatsApp directo de su asesor asignado. Para consultas urgentes fuera de horario, tenemos un sistema de respuesta en menos de 2 horas."
    },
    {
      question: "¿Qué incluye exactamente el servicio mensual?",
      answer: "Incluye: contabilidad completa, declaraciones mensuales (IVA, renta), emisión de honorarios, certificados de renta, remuneraciones y previsión, finiquitos, informe mensual ejecutivo claro, y tu asesor directo por WhatsApp. Todo en un precio fijo sin sorpresas."
    },
    {
      question: "¿Trabajan con todos los tipos de empresa?",
      answer: "Sí, trabajamos con: empresas individuales, sociedades, SPA, SRL, fundaciones, cooperativas y personas naturales con y sin giro. Desde emprendedores que recién empiezan hasta empresas con facturación de varios millones al mes."
    },
    {
      question: "¿Qué pasa si no estoy conforme con el servicio?",
      answer: "Ofrecemos garantía de satisfacción. Si en los primeros 60 días no estás conforme, te devolvemos el 100% de lo pagado y te ayudamos a traspasar toda tu información al contador que elijas, sin costo adicional."
    },
    {
      question: "¿Cómo sé que mi información está segura?",
      answer: "Usamos sistemas de seguridad bancaria para proteger tu información. Todos nuestros profesionales tienen reserva profesional. Además, hacemos respaldos diarios en la nube y nunca compartimos información con terceros sin tu autorización expresa."
    },
    {
      question: "¿Puedo cambiar de plan si mi empresa crece?",
      answer: "Por supuesto. Nuestros planes son flexibles y crecen contigo. Si tu facturación aumenta, simplemente ajustamos el plan. Si decrece, también podemos hacer el ajuste. Siempre con transparencia total en los costos."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-600">
            Todo lo que necesitas saber sobre nuestro servicio
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFAQ === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}