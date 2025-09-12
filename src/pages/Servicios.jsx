import { motion } from 'framer-motion';
import Container from '../components/Container';
import Button from '../components/Button';

export default function Servicios() {
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

  const servicios = [
    {
      id: 'contabilidad-finanzas',
      title: 'Contabilidad y Finanzas',
      subtitle: 'Tu control financiero en tiempo real',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      bgColor: 'bg-white',
      textColor: 'text-black',
      borderColor: 'border-4 border-primary-600',
      features: [
        'Registro y control contable mensual',
        'Estados financieros claros y actualizados',
        'Análisis de resultados para tomar mejores decisiones',
        'Conciliación bancaria',
        'Control de flujo de caja'
      ]
    },
    {
      id: 'impuestos',
      title: 'Impuestos y Cumplimiento Tributario',
      subtitle: 'Cero multas, máxima optimización',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=400&h=300&fit=crop',
      bgColor: 'bg-primary-600',
      textColor: 'text-white',
      features: [
        'Declaraciones mensuales y anuales (IVA, Renta, PPM, etc.)',
        'Optimización tributaria para pagar lo justo y evitar multas',
        'Gestión y respuesta ante requerimientos del SII',
        'Planificación del impuesto anual',
        'Defensa ante fiscalizaciones'
      ]
    },
    {
      id: 'gestion-laboral',
      title: 'Gestión Laboral y de Trabajadores',
      subtitle: 'Tu equipo siempre protegido',
      imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop',
      bgColor: 'bg-[#65276B]',
      textColor: 'text-white',
      features: [
        'Contratos de trabajo y anexos',
        'Liquidaciones de sueldo y cotizaciones previsionales',
        'Cumplimiento de leyes laborales vigentes',
        'Gestión de vacaciones y licencias',
        'Finiquitos y asesoría en contratación'
      ]
    },
    {
      id: 'asesoria-estrategica',
      title: 'Asesoría Estratégica y Acompañamiento',
      subtitle: 'Tu socio en cada decisión',
      imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
      bgColor: 'bg-primary-600',
      textColor: 'text-white',
      features: [
        'Asesor directo para tu negocio',
        'Reportes claros y comunicación constante',
        'Orientación para decisiones financieras y administrativas',
        'Análisis de rentabilidad',
        'Proyecciones y evaluación de inversiones'
      ]
    }
  ];

  return (
    <>
      {/* Hero con bloque sólido morado */}
      <section className="bg-primary-600 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full" />
        </div>
        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-6 py-3 bg-white text-primary-600 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Servicios Integrales
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              Todo lo que necesitas
              <span className="block text-purple-200">en un solo lugar</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Integramos todos los procesos clave para que tu negocio esté siempre al día
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Servicios en bloques alternados */}
      {servicios.map((servicio, index) => (
        <section 
          key={servicio.id}
          className={`${servicio.bgColor} ${servicio.textColor} ${servicio.borderColor || ''} relative overflow-hidden`}
        >
          <Container>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={index % 2 === 0 ? slideRight : slideLeft}
              transition={{ duration: 0.6 }}
              className="py-20 lg:py-32"
            >
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {/* Número gigante de fondo */}
                  <div className={`text-[150px] lg:text-[200px] font-black leading-none ${
                    servicio.bgColor === 'bg-white' ? 'text-gray-100' : 'text-white/10'
                  } select-none`}>
                    0{index + 1}
                  </div>
                  
                  <h2 className="text-4xl lg:text-5xl font-black mb-4 -mt-20">
                    {servicio.title}
                  </h2>
                  
                  <p className={`text-2xl lg:text-3xl mb-8 font-bold ${
                    servicio.bgColor === 'bg-white' ? 'text-primary-600' : 'text-white'
                  }`}>
                    {servicio.subtitle}
                  </p>
                  
                  <ul className="space-y-4">
                    {servicio.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className={`w-8 h-8 ${
                          servicio.bgColor === 'bg-white' ? 'bg-primary-600' : 'bg-white'
                        } rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-0.5`}>
                          <svg className={`w-5 h-5 ${
                            servicio.bgColor === 'bg-white' ? 'text-white' : servicio.bgColor === 'bg-[#65276B]' ? 'text-white' : 'text-primary-600'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className={`text-lg ${
                          servicio.bgColor === 'bg-white' ? 'text-gray-700' : servicio.bgColor === 'bg-[#65276B]' ? 'text-white/90' : 'text-white/90'
                        }`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`flex justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-md"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-[#65276B] rounded-3xl transform rotate-3 opacity-50" />
                    <img 
                      src={servicio.imageUrl}
                      alt={servicio.title}
                      className="relative w-full h-64 lg:h-80 object-cover rounded-3xl shadow-2xl"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      ))}

      {/* CTA Final - Bloque morado oscuro disruptivo */}
      <section className="bg-[#65276B]">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="py-20 lg:py-32 text-center"
          >
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Un solo equipo
              <span className="block">para todo</span>
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-semibold">
              Deja de coordinar múltiples proveedores. Con <span className="text-purple-200 font-black">Contadoor</span> tienes todo integrado.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button to="/cotizador" className="!bg-white !text-[#65276B] shadow-brutal hover:shadow-none transform hover:translate-x-2 hover:translate-y-2 transition-all text-lg px-8 py-4 font-bold">
                Quiero optimizar mi empresa
              </Button>
              <Button to="/contacto" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#65276B] text-lg px-8 py-4 font-bold transition-all">
                Agenda una asesoría gratis
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}