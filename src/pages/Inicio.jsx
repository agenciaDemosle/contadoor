import { motion } from 'framer-motion';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Inicio() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Hero sólido morado con texto blanco */}
      <section className="relative min-h-[700px] flex items-center overflow-hidden bg-primary-600 text-white">
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={slideIn}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-6">
                <span className="bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-semibold">
                  +500 empresas confían en nosotros
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
  Delega sin perder el control, <span className="text-[#E9D5FF]">tu negocio al dia</span> siempre.
</h1>

              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                En Contadoor centralizamos contabilidad, impuestos y gestión laboral con un asesor directo que te acompaña todo el año, para que tengas la tranquilidad de saber que todo está en orden.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button to="/cotizador" className="!bg-white !text-primary-600 shadow-brutal hover:shadow-none transform hover:translate-x-2 hover:translate-y-2 transition-all">
                  Quiero tranquilidad para mi negocio
                </Button>
                <Button to="/contacto" className="!bg-primary-700 !text-white hover:!bg-primary-800 transition-transform duration-200 hover:scale-105 active:scale-95">
                  Hablar con asesor
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-white/60 rounded-2xl transform rotate-6 scale-105" />
              <img 
                src="/hero.jpg" 
                alt="Dashboard financiero"
                className="rounded-2xl shadow-2xl relative z-10"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Problema - Con diseño más dinámico */}
      <section className="py-20 relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundSize: '40px 40px',
            backgroundImage: 'radial-gradient(circle at 1px 1px, #A0569A 1px, transparent 1px)'
          }} />
        </div>
        
        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-16">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Somos la puerta a tu solución</span>
             <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
  Muchos dueños de negocios han{' '}
  <span className="text-primary-600">vivido lo mismo</span>
</h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                En Contadoor lo hacemos diferente. Nuestro compromiso es estar a tu lado siempre.

              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Contador fantasma</h3>
                <p className="text-gray-600 leading-relaxed">
                  Un contador que solo aparece a fin de mes para decir cuánto pagar
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl p-8 shadow-soft hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Comunicación confusa</h3>
                <p className="text-white/90 leading-relaxed">
                  Comunicación confusa y tardía que genera incertidumbre
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Estrés constante</h3>
                <p className="text-gray-600 leading-relaxed">
                  Multas, atrasos y estrés por asesorías que no entienden tu negocio
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Cómo funciona - Con imagen de fondo y diseño moderno */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/foto1.jpg"
            alt=""
            className="w-full h-full object-cover opacity-5"
          />
        </div>
        
        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-16">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Nuestro proceso</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4">
                Cómo funciona Contadoor
              </h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Línea conectora */}
              <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />
              
              {[
                { 
                  step: '1', 
                  title: 'Diagnóstico inicial', 
                  desc: 'Revisamos tu contabilidad, impuestos y gestión laboral para detectar riesgos y oportunidades'
                },
                { 
                  step: '2', 
                  title: 'Plan personalizado', 
                  desc: 'Creamos un calendario de cumplimiento que prioriza lo urgente y organiza todo el año'
                },
                { 
                  step: '3', 
                  title: 'Acompañamiento constante', 
                  desc: 'Tendrás un asesor directo, comunicación fluida y reportes claros'
                },
                { 
                  step: '4', 
                  title: 'Todo en un lugar', 
                  desc: 'Centralizamos tu cumplimiento legal, tributario y laboral, evitando errores'
                }
              ].map((item, index) => (
                <motion.div 
                  key={item.step} 
                  className="text-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4 shadow-lg">
                      {item.step}
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />}
                        {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                        {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />}
                        {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />}
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Beneficios - Sección morada con diseño moderno */}
      <section className="py-20 relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white overflow-hidden">
        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(255,255,255,0.1) 100px, rgba(255,255,255,0.1) 101px)',
            backgroundSize: '101px 101px'
          }} />
        </div>
        
        {/* Círculos decorativos */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        
        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Beneficios clave de trabajar con nosotros
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Más que un servicio contable, un socio para tu crecimiento
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Delegas con confianza',
                  desc: 'Mantén el control total mientras nosotros hacemos el trabajo',
                  metric: '100%'
                },
                {
                  title: 'Evitas multas y errores',
                  desc: 'Prevenimos problemas antes de que ocurran',
                  metric: '0'
                },
                {
                  title: 'Comunicación clara',
                  desc: 'Respuestas rápidas y reportes que sí entiendes',
                  metric: '24/7'
                },
                {
                  title: 'Transparencia total',
                  desc: 'Puedes ver todo lo que hacemos en tiempo real',
                  metric: '360°'
                },
                {
                  title: 'Más tiempo para crecer',
                  desc: 'Enfócate en tu negocio, nosotros del resto',
                  metric: '+8hrs semanales'
                },
                {
                  title: 'Un solo equipo',
                  desc: 'Contabilidad, impuestos y laboral integrados',
                  metric: '3en1'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-black text-white/90 mb-3">{benefit.metric}</div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Diferenciadores - Diseño DISRUPTIVO con división diagonal */}
      <section className="relative py-0 overflow-hidden">
        {/* Fondo dividido diagonalmente */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#65276B]" />
          <div className="absolute inset-0 bg-primary-600" style={{
            clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0 100%)'
          }} />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="py-20 lg:py-32"
          >
            {/* Header central */}
            <div className="text-center mb-20">
              <motion.span 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="inline-block px-8 py-4 bg-white text-black rounded-full text-lg font-black uppercase tracking-wider mb-6 shadow-2xl"
              >
                LA DIFERENCIA
              </motion.span>
              <motion.h2 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-6xl md:text-7xl lg:text-8xl font-black text-white"
              >
                Por qué somos
                <span className="block text-white/20" style={{ WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}>
                  DIFERENTES
                </span>
              </motion.h2>
            </div>
            
            {/* Contenido dividido */}
            <div className="grid lg:grid-cols-2 gap-0 max-w-7xl mx-auto">
              {/* NO ES - Lado izquierdo */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="p-8 lg:p-12"
              >
                <div className="text-center lg:text-left mb-10">
                  <h3 className="text-5xl lg:text-6xl font-black text-white mb-4">
                    Esto <span className="bg-red-600 px-4 py-2 rounded-xl">NO</span>
                  </h3>
                  <p className="text-3xl font-bold text-white/80">es Contadoor</p>
                </div>
                
                <div className="space-y-6">
                  {[
                    'Un contador independiente que no responde',
                    'Una empresa contable fría e impersonal',
                    'Un software que no te asesora',
                    'Un servicio que reacciona cuando ya es tarde'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center group"
                    >
                      <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 mr-6 group-hover:scale-110 transition-transform shadow-xl">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="text-xl lg:text-2xl text-white font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* SÍ ES - Lado derecho */}
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="p-8 lg:p-12"
              >
                <div className="text-center lg:text-right mb-10">
                  <h3 className="text-5xl lg:text-6xl font-black text-white mb-4">
                    Esto <span className="bg-white text-primary-600 px-4 py-2 rounded-xl">SÍ</span>
                  </h3>
                  <p className="text-3xl font-bold text-white/80">es Contadoor</p>
                </div>
                
                <div className="space-y-6">
                  {[
                    'Acompañamiento personalizado todo el año',
                    'Un sistema proactivo que previene problemas',
                    'Un solo equipo para todas tus obligaciones',
                    'Cercanía, claridad y confianza en cada paso'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-end group"
                    >
                      <span className="text-xl lg:text-2xl text-white font-medium mr-6 text-right">{item}</span>
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-xl">
                        <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* CTA Central */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mt-20"
            >
                <Button to="/por-que-contadoor" className="!bg-white !text-black hover:bg-gray-100 text-lg px-10 py-5 font-bold shadow-2xl transform hover:scale-105 transition-all">
                Descubre la diferencia completa →
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* CTA Final - Con imagen de fondo y diseño impactante */}
      <section className="relative py-24 overflow-hidden">
        {/* Fondo con imagen y overlay */}
        <div className="absolute inset-0">
          <img 
            src="/final.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70" />
        </div>
        
        {/* Contenido */}
        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <div className="inline-block mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full border-2 border-white" />
                  ))}
                </div>
                <span className="text-sm font-semibold ml-2">+500 empresas activas</span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Deja de preocuparte por tus 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">obligaciones</span>
            </h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
              Con Contadoor, tu negocio estará siempre al día, con la seguridad y tranquilidad que mereces.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button to="/contacto" className="!bg-primary-600 !text-white hover:!bg-primary-700 transition-transform duration-200 hover:scale-105 active:scale-95">
                  <span className="font-bold">Hablar con asesor →</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button to="/cotizador" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-black">
                  Cotizar en línea
                </Button>
              </motion.div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div>
                  <div className="text-3xl font-black text-primary-400">98%</div>
                  <div className="text-sm text-white/70">Satisfacción</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary-400">24hrs</div>
                  <div className="text-sm text-white/70">Respuesta</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary-400">0</div>
                  <div className="text-sm text-white/70">Multas SII</div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}