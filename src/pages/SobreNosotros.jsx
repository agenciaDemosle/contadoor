import { motion } from 'framer-motion';
import Container from '../components/Container';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';

export default function SobreNosotros() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const valores = [
    {
      title: 'Confianza',
      description: 'La base de toda relación duradera con nuestros clientes.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Transparencia',
      description: 'Comunicación clara y honesta en cada interacción.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: 'Excelencia',
      description: 'Calidad técnica y humana en todo lo que hacemos.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: 'Cercanía',
      description: 'Acompañamiento personalizado, siempre a tu lado.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    }
  ];

  const equipo = [
    {
      nombre: 'Luciano Duarte',
      cargo: 'Fundador y Director General',
      descripcion: 'Liderando con visión y cercanía desde 2015'
    },
    {
      nombre: 'Carolina Méndez',
      cargo: 'Directora de Operaciones',
      descripcion: 'Garantizando excelencia en cada proceso'
    },
    {
      nombre: 'Roberto Fuentes',
      cargo: 'Director Tributario',
      descripcion: 'Experto en optimización y cumplimiento fiscal'
    },
    {
      nombre: 'Andrea Vásquez',
      cargo: 'Directora de Clientes',
      descripcion: 'Tu voz dentro de Contadoor'
    }
  ];

  return (
    <>
      {/* Hero con imagen de fondo */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white" />
        </div>
        
        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Sobre Contadoor</span>
            <h1 className="text-5xl md:text-6xl font-black mt-4 mb-6">
              Más que un servicio contable,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">un socio para tu negocio</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Somos la puerta a tu solución
            </p>
          </motion.div>

          {/* Historia */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-12 shadow-soft max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Nuestra historia</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    <span className="font-semibold text-black">Contadoor nace en 2015</span>, cuando su fundador, Luciano Duarte, 
                    inició como contador independiente con un enfoque claro: entregar un servicio cercano, 
                    transparente y de alta calidad. Desde el primer día, la confianza y la atención 
                    personalizada han sido el corazón de nuestro trabajo.
                  </p>
                  <p className="leading-relaxed">
                    A lo largo de estos años, hemos acompañado y formalizado a <span className="font-semibold text-primary-600">más de 1.000 emprendedores</span>, 
                    y asesorado a la misma cantidad de empresas y dueños de negocios, siempre guiándolos 
                    para que cumplan con sus obligaciones y puedan enfocarse en crecer.
                  </p>
                  <p className="leading-relaxed">
                    Hoy, Contadoor es una marca consolidada, respaldada por un equipo que combina 
                    excelencia técnica y calidez humana. Bajo el liderazgo directo de Luciano, 
                    garantizamos que cada cliente reciba la misma cercanía, compromiso y profesionalismo 
                    que nos ha hecho diferentes desde el inicio.
                  </p>
                  <p className="font-semibold text-black text-lg">
                    Nuestro pilar es simple pero poderoso: acompañarte en cada paso, con la 
                    tranquilidad de que todo está en orden.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl transform rotate-6 scale-105 opacity-20" />
                  <img 
                    src="/luciano.png"
                    alt="Luciano Duarte"
                    className="rounded-2xl shadow-xl relative z-10"
                  />
                </div>
              </div>
              <div className="mt-8 p-6 bg-primary-100 rounded-xl text-center">
                <p className="text-primary-800 font-semibold text-lg">
                  En Contadoor no solo resolvemos tus obligaciones, te damos la seguridad de que todo está en orden. 
                  Por eso decimos: <span className="font-black">somos la puerta a tu solución.</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Valores */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Nuestros valores</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valores.map((valor, index) => (
                <Card key={index} hover>
                  <h3 className="text-xl font-bold mb-3">{valor.title}</h3>
                  <p className="text-gray-700">{valor.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Equipo */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Conoce al equipo</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {equipo.map((miembro, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                  <h3 className="text-lg font-bold">{miembro.nombre}</h3>
                  <p className="text-primary font-medium mb-2">{miembro.cargo}</p>
                  <p className="text-sm text-gray-600">{miembro.descripcion}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Métricas */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <div className="bg-primary text-white rounded-card p-12">
              <h2 className="text-3xl font-bold mb-12 text-center">Números que hablan</h2>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-5xl font-black mb-2">500+</div>
                  <p className="opacity-90">Empresas confían en nosotros</p>
                </div>
                <div>
                  <div className="text-5xl font-black mb-2">0</div>
                  <p className="opacity-90">Multas SII en 3 años</p>
                </div>
                <div>
                  <div className="text-5xl font-black mb-2">15min</div>
                  <p className="opacity-90">Tiempo promedio de respuesta</p>
                </div>
                <div>
                  <div className="text-5xl font-black mb-2">98%</div>
                  <p className="opacity-90">Clientes nos recomiendan</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              ¿Listo para ser parte del cambio?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Únete a las empresas que ya están creciendo con una contabilidad que sí funciona
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/cotizador">Cotizar ahora</Button>
              <Button to="/contacto" variant="outline">Conocer más</Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}