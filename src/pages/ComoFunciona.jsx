import { motion } from 'framer-motion';
import Container from '../components/Container';
import Button from '../components/Button';

export default function ComoFunciona() {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico inicial',
      description: 'Revisamos tu contabilidad, impuestos y gestión laboral para detectar riesgos y oportunidades.',
      detail: 'Diagnóstico sin costo',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      bgColor: 'bg-primary-600',
      textColor: 'text-white'
    },
    {
      number: '02',
      title: 'Plan de acción personalizado',
      description: 'Creamos un calendario de cumplimiento que prioriza lo urgente y organiza todo el año.',
      detail: 'Plan claro y medible',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bgColor: 'bg-white',
      textColor: 'text-black',
      borderColor: 'border-2 border-primary-600'
    },
    {
      number: '03',
      title: 'Acompañamiento constante',
      description: 'Tendrás un asesor directo, comunicación fluida y reportes claros.',
      detail: 'Asesor dedicado 24/7',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bgColor: 'bg-primary-600',
      textColor: 'text-white'
    },
    {
      number: '04',
      title: 'Todo en un solo lugar',
      description: 'Centralizamos tu cumplimiento legal, tributario y laboral, evitando errores.',
      detail: 'Todo centralizado',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      bgColor: 'bg-white',
      textColor: 'text-black',
      borderColor: 'border-2 border-primary-600'
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Hero Section con diseño limpio */}
      <section className="bg-white py-12 lg:py-20">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-20"
          >
            <span className="inline-block px-6 py-3 bg-primary-600 text-white rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Nuestro Proceso
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              Cómo funciona
              <span className="block text-primary-600">Contadoor</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto px-4">
              Un proceso simple y transparente para que tengas tu contabilidad funcionando en menos de una semana
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Steps en bloques alternados de pantalla completa */}
      {steps.map((step, index) => (
        <section 
          key={step.number} 
          className={`${step.bgColor} ${step.textColor} ${step.borderColor || ''} relative overflow-hidden`}
        >
          <Container>
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="py-20 lg:py-32"
            >
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {/* Número gigante de fondo */}
                  <div className={`text-[150px] lg:text-[200px] font-black leading-none ${
                    step.bgColor === 'bg-white' ? 'text-gray-100' : 'text-white/10'
                  } select-none`}>
                    {step.number}
                  </div>
                  
                  <h2 className="text-4xl lg:text-5xl font-black mb-6 -mt-20">
                    {step.title}
                  </h2>
                  
                  <p className={`text-xl lg:text-2xl mb-6 ${
                    step.bgColor === 'bg-white' ? 'text-gray-700' : 'text-white/90'
                  }`}>
                    {step.description}
                  </p>
                  
                  <div className={`inline-block px-6 py-3 ${
                    step.bgColor === 'bg-white' ? 'bg-gradient-to-r from-primary-600 to-[#65276B] text-white' : 'bg-white text-primary-600'
                  } rounded-full font-bold shadow-lg transform hover:scale-105 transition-transform`}>
                    {step.detail}
                  </div>
                </div>
                
                <div className={`flex justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={{ duration: 0.3 }}
                    className={`w-48 h-48 lg:w-64 lg:h-64 ${
                      step.bgColor === 'bg-white' ? 'bg-primary-600 text-white' : 'bg-white text-primary-600'
                    } rounded-3xl flex items-center justify-center shadow-2xl`}
                  >
                    {step.icon}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      ))}

      {/* CTA Section */}
      <section className="bg-primary-600 py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-block p-8 lg:p-12 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
                ¿Listo para simplificar tu contabilidad?
              </h2>
              <p className="text-white/80 mb-8 max-w-md mx-auto">
                Comienza hoy mismo con un diagnóstico gratuito de tu situación actual
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/contacto" className="!bg-primary-600 !text-white hover:!bg-primary-700 transition-transform duration-200 hover:scale-105 active:scale-95">
                  Hablar con asesor
                </Button>
                <Button to="/cotizador" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-600">
                  Cotizar en línea
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}