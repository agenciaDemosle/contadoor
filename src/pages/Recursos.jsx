import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/Container';
import Button from '../components/Button';

export default function Recursos() {
  const [filtro, setFiltro] = useState('todos');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  const categorias = [
    { id: 'todos', label: 'Todos', color: 'bg-[#65276B]' },
    { id: 'contabilidad', label: 'Contabilidad', color: 'bg-blue-600' },
    { id: 'impuestos', label: 'Impuestos', color: 'bg-green-600' },
    { id: 'laboral', label: 'Laboral', color: 'bg-orange-600' },
    { id: 'emprendimiento', label: 'Emprendimiento', color: 'bg-purple-600' }
  ];

  const articulos = [
    {
      categoria: 'impuestos',
      titulo: 'Guía completa del régimen Pro Pyme 2024',
      descripcion: 'Todo lo que necesitas saber sobre el régimen 14D N°3 y cómo puede beneficiar a tu empresa.',
      fecha: 'Enero 2024',
      lectura: '5 min',
      destacado: true
    },
    {
      categoria: 'contabilidad',
      titulo: 'Cómo leer tus estados financieros',
      descripcion: 'Aprende a interpretar tu balance y estado de resultados para tomar mejores decisiones.',
      fecha: 'Enero 2024',
      lectura: '8 min'
    },
    {
      categoria: 'laboral',
      titulo: 'Checklist: Contratación de trabajadores',
      descripcion: 'Lista completa de documentos y pasos para contratar correctamente a tu equipo.',
      fecha: 'Diciembre 2023',
      lectura: '4 min'
    },
    {
      categoria: 'emprendimiento',
      titulo: '10 errores contables que matan startups',
      descripcion: 'Los errores más comunes y cómo evitarlos desde el día uno.',
      fecha: 'Diciembre 2023',
      lectura: '6 min',
      destacado: true
    },
    {
      categoria: 'impuestos',
      titulo: 'Calendario tributario 2024',
      descripcion: 'Todas las fechas importantes para cumplir con el SII este año.',
      fecha: 'Noviembre 2023',
      lectura: '3 min'
    },
    {
      categoria: 'contabilidad',
      titulo: 'Excel vs Software contable: ¿Cuándo cambiar?',
      descripcion: 'Señales de que es hora de profesionalizar tu contabilidad.',
      fecha: 'Noviembre 2023',
      lectura: '5 min'
    }
  ];

  const articulosFiltrados = filtro === 'todos' 
    ? articulos 
    : articulos.filter(art => art.categoria === filtro);

  return (
    <>
      {/* Hero con bloque sólido */}
      <section className="bg-primary-600 py-16 lg:py-24">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-6 py-3 bg-white text-primary-600 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Centro de Recursos
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              Recursos para hacer
              <span className="block">crecer tu empresa</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Guías, plantillas y artículos para que tomes mejores decisiones financieras
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Newsletter CTA - Bloque azul impactante */}
      <section className="bg-[#65276B]">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="py-20 lg:py-32"
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                Recibe tips contables y tributarios
                <span className="block text-white">cada semana</span>
              </h2>
              <p className="text-xl text-white/80 mb-10">
                Únete a +2,000 emprendedores que reciben nuestro newsletter
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-6 py-4 rounded-xl text-lg font-medium bg-white text-black"
                />
                <button className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors shadow-2xl">
                  Suscribirme
                </button>
              </div>
              <p className="mt-6 text-white/70 text-sm">
                Sin spam. Puedes desuscribirte cuando quieras.
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Filtros - Bloque blanco */}
      <section className="bg-white py-12">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFiltro(cat.id)}
                  className={`px-6 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
                    filtro === cat.id
                      ? `${cat.color} text-white shadow-xl`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Artículos - Grid con bloques grandes */}
      <section className="bg-gray-50 py-16">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articulosFiltrados.map((articulo, index) => {
              const catInfo = categorias.find(c => c.id === articulo.categoria);
              return (
                <motion.article
                  key={index}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-2xl overflow-hidden shadow-xl cursor-pointer ${
                    articulo.destacado ? 'lg:col-span-2 lg:row-span-2' : ''
                  }`}
                >
                  <div className={`absolute inset-0 ${catInfo?.color || 'bg-primary-600'} opacity-10`} />
                  <div className="relative bg-white h-full p-8 border-2 border-gray-200 hover:border-primary-600 transition-colors">
                    <div className="mb-4">
                      <span className={`inline-block px-4 py-2 ${catInfo?.color || 'bg-primary-600'} text-white rounded-full text-sm font-bold`}>
                        {catInfo?.label}
                      </span>
                    </div>
                    <h3 className={`font-black mb-3 ${articulo.destacado ? 'text-3xl' : 'text-xl'}`}>
                      {articulo.titulo}
                    </h3>
                    <p className={`text-gray-700 mb-6 ${articulo.destacado ? 'text-lg' : ''}`}>
                      {articulo.descripcion}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{articulo.fecha}</span>
                      <span className="font-bold">{articulo.lectura} de lectura</span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Plantillas descargables - Bloques alternados */}
      <section className="bg-white py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl font-black text-center mb-16">
              Plantillas <span className="text-primary-600">gratuitas</span>
            </h2>
            <div className="grid lg:grid-cols-3 gap-0">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-primary-600 text-white p-10 flex flex-col justify-center items-center text-center"
              >
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Flujo de caja</h3>
                <p className="mb-6 text-white/80">
                  Plantilla Excel para proyectar tu flujo de caja mensual
                </p>
                <Button className="bg-white text-primary-600 hover:bg-gray-100">
                  Descargar gratis
                </Button>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white text-black p-10 flex flex-col justify-center items-center text-center border-4 border-primary-600"
              >
                <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Checklist tributario</h3>
                <p className="mb-6 text-gray-700">
                  Lista de verificación para cumplir con el SII
                </p>
                <Button variant="outline">
                  Descargar gratis
                </Button>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-primary-600 text-white p-10 flex flex-col justify-center items-center text-center"
              >
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Calculadora PPM</h3>
                <p className="mb-6 text-white/80">
                  Calcula tu pago provisional mensual fácilmente
                </p>
                <Button className="bg-white text-primary-600 hover:bg-gray-100">
                  Descargar gratis
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA Final - Bloque morado gigante */}
      <section className="bg-primary-600">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideIn}
            transition={{ duration: 0.6 }}
            className="py-20 lg:py-32 text-center"
          >
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              ¿Necesitas ayuda
              <span className="block text-purple-200">personalizada?</span>
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
              Nuestros expertos están listos para resolver tus dudas
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button to="/contacto" className="!bg-primary-600 !text-white hover:!bg-primary-700 text-lg px-8 py-4 shadow-2xl transition-transform duration-200 hover:scale-105 active:scale-95">
                Hablar con asesor
              </Button>
              <Button to="/cotizador" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
                Cotizar en línea
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}