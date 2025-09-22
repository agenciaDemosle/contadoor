import { motion } from 'framer-motion';
import Container from '../components/Container';
import Button from '../components/Button';
import { trackPageView } from '../lib/gtm';
import { useEffect } from 'react';

export default function PorQueContadoor() {
  // Track page load
  useEffect(() => {
    trackPageView('Por Que Contadoor', '/por-que-contadoor');
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const slideLeft = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  const slideRight = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  const diferenciadores = [
    {
      number: '01',
      title: 'Acompañamiento personalizado',
      description: 'Un asesor dedicado que conoce tu negocio y te acompaña todo el año.'
    },
    {
      number: '02',
      title: 'Sistema proactivo',
      description: 'Prevenimos problemas antes de que ocurran con alertas y recordatorios.'
    },
    {
      number: '03',
      title: 'Un solo equipo integrado',
      description: 'Contabilidad, impuestos y laboral trabajando en sincronia.'
    },
    {
      number: '04',
      title: 'Transparencia total',
      description: 'Dashboard en tiempo real donde ves todo lo que hacemos por ti.'
    },
    {
      number: '05',
      title: 'Comunicación directa',
      description: 'WhatsApp, llamadas, videollamadas. Siempre disponibles para ti.'
    },
    {
      number: '06',
      title: 'Crecimiento conjunto',
      description: 'Tu éxito es nuestro éxito. Escalamos contigo sin cambiar de equipo.'
    }
  ];

  return (
    <>
      {/* Hero con bloques grandes y contrastados */}
      <section className="bg-white py-12 lg:py-20">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-6 py-3 bg-primary-600 text-white rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              La Diferencia
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              Por qué 
              <span className="block text-primary-600">Contadoor es diferente</span>
            </h1>
          </motion.div>
        </Container>
      </section>

   {/* Comparación en bloques grandes */}
<section className="bg-[#65276B] text-white">
  <Container>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      className="py-20 lg:py-32"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl lg:text-6xl font-black mb-4">
          Esto <span className="bg-red-600 px-3 py-1 rounded">NO</span> es Contadoor
        </h2>
        <p className="text-2xl text-white/80">Lo que no queremos ser</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[
          'Un contador independiente que no responde',
          'Una empresa contable fría e impersonal',
          'Un software que no te asesora',
          'Un servicio que reacciona cuando ya es tarde'
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center bg-white/10 border border-white/30 backdrop-blur rounded-2xl p-6
                       hover:bg-white/15 hover:-translate-y-0.5 transition"
          >
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ring-4 ring-white/10">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="text-xl font-semibold">{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </Container>
</section>

      {/* Esto SÍ es - Bloque morado impactante */}
      <section className="bg-primary-600">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="py-20 lg:py-32"
          >
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-4">
                Esto <span className="text-purple-200">SÍ</span> es Contadoor
              </h2>
              <p className="text-2xl text-white/80">La experiencia que mereces</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                'Acompañamiento personalizado todo el año',
                'Un sistema proactivo que previene problemas',
                'Un solo equipo para todas tus obligaciones',
                'Cercanía, claridad y confianza en cada paso'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center bg-white rounded-2xl p-6 shadow-2xl"
                >
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xl text-black font-semibold">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Central */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mt-16"
            >
              <Button to="/cotizador" className="bg-white !text-[#65276B] shadow-brutal hover:shadow-none transform hover:translate-x-2 hover:translate-y-2 transition-all text-lg px-8 py-4 font-bold">
                Quiero la diferencia Contadoor
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Sección de diferenciadores - Diseño disruptivo con carousel */}
      <section className="bg-[#65276B] py-20 lg:py-32 relative overflow-hidden">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-3 bg-primary-600 text-white rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              NUESTROS DIFERENCIADORES
            </span>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Lo que nos hace <span className="text-white">únicos</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Más que un servicio, una experiencia transformadora para tu negocio
            </p>
          </motion.div>

          {/* Grid de diferenciadores */}
          <div className="grid lg:grid-cols-3 gap-8">
            {diferenciadores.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1, 
                  zIndex: 10,
                  transition: { duration: 0.3 }
                }}
                className="relative"
              >
                <div className="bg-primary-600 text-white rounded-3xl p-8 h-full transform hover:rotate-1 transition-transform">
                  <div className="text-6xl font-black text-white/20 mb-4">
                    {item.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/80">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center mt-20"
          >
            <div className="inline-block p-12 bg-white rounded-3xl">
              <h2 className="text-3xl font-bold mb-6 text-black">
                Únete a empresas que ya crecen con nosotros
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Descubre cómo podemos transformar tu gestión contable
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/cotizador" className="!bg-primary-600 !text-white shadow-brutal hover:shadow-none transform hover:translate-x-2 hover:translate-y-2 transition-all font-bold">Descubre tu plan ideal</Button>
                <Button to="/contacto" variant="outline" className="font-bold">Agendar llamada gratuita</Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}