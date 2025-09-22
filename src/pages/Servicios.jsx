import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Button from '../components/Button';
import { trackPageView, trackButtonClick, trackCTAClick } from '../lib/gtm';
import { useEffect } from 'react';

export default function Servicios() {
  // Track page load
  useEffect(() => {
    trackPageView('Servicios', '/servicios');
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
      {/* Hero centrado full-width con gradiente morado */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#6F326A] to-[#8A3F83]">
        {/* Blobs radiales sutiles */}
        <div className="absolute -right-32 -top-32 w-[520px] h-[520px] bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-32 -bottom-32 w-[420px] h-[420px] bg-black/10 rounded-full blur-3xl opacity-60"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          {/* Eyebrow / Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 text-white/90 text-sm font-semibold ring-1 ring-white/20"
          >
            • SERVICIOS INTEGRALES
          </motion.div>

          {/* H1 (2 líneas) */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className="mt-6 text-white font-extrabold leading-tight tracking-tight text-4xl md:text-6xl lg:text-7xl"
          >
            Todo lo que necesitas
            <br />
            en un solo lugar
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="mt-4 md:mt-5 text-white/85 text-lg md:text-xl leading-relaxed"
          >
            Integramos todos los procesos claves para que tu negocio esté siempre
            <br />
            al día
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.6 }}
            className="mt-8 md:mt-10 flex items-center justify-center gap-4 flex-wrap"
          >
            {/* Primario (sello blanco) */}
            <Link to="/cotizador">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.6 }}
                onClick={() => trackCTAClick('Comenzar ahora', 'hero', 'servicios', '/cotizador')}
                data-gtm="services_hero_cta_primary"
                className="inline-flex items-center px-6 md:px-7 py-3.5 md:py-4 rounded-full bg-white text-gray-900 font-semibold shadow-[0_8px_0_#111] hover:translate-y-[-1px] hover:shadow-[0_7px_0_#111] active:translate-y-0 active:shadow-none transition focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                Comenzar ahora
              </motion.button>
            </Link>

            {/* Secundario (pill morado translúcido) */}
            <Link to="/contacto">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.7 }}
                onClick={() => trackCTAClick('Hablar con asesor', 'hero', 'servicios', '/contacto')}
                data-gtm="services_hero_cta_secondary"
                className="inline-flex items-center px-6 md:px-7 py-3.5 md:py-4 rounded-full bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/15 transition focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                Hablar con asesor
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sección 2x2 cards numeradas */}
      <section className="bg-[#F7F9FB] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

            {/* Card 01 - Contabilidad y Finanzas */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0 }}
              className="relative rounded-3xl bg-white p-8 md:p-9 border border-[#D0A5CC]/30 shadow-[0_12px_40px_rgba(17,24,39,0.08)] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition"
            >
              {/* Número grande */}
              <div className="absolute top-6 right-6 text-6xl md:text-7xl font-extrabold text-gray-100 select-none">01</div>

              {/* Icono círculo morado */}
              <div className="w-12 h-12 rounded-2xl grid place-items-center bg-[#8A3F83] text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>

              {/* Título */}
              <h3 className="mt-4 text-2xl md:text-[26px] font-extrabold text-gray-900">
                Contabilidad y Finanzas
              </h3>

              {/* Subtítulo */}
              <p className="text-[#8A3F83] font-semibold mt-1">
                Tu control financiero en tiempo real
              </p>

              {/* Lista */}
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Registro y control contable mensual</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Estados financieros claros y actualizados</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Análisis de resultados para tomar mejores decisiones</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Conciliación bancaria</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Control de flujo de caja</span>
                </li>
              </ul>
            </motion.div>

            {/* Card 02 - Impuestos y Cumplimiento Tributario */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-3xl bg-white p-8 md:p-9 border border-[#D0A5CC]/30 shadow-[0_12px_40px_rgba(17,24,39,0.08)] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition"
            >
              {/* Número grande */}
              <div className="absolute top-6 right-6 text-6xl md:text-7xl font-extrabold text-gray-100 select-none">02</div>

              {/* Icono círculo morado */}
              <div className="w-12 h-12 rounded-2xl grid place-items-center bg-[#8A3F83] text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Título */}
              <h3 className="mt-4 text-2xl md:text-[26px] font-extrabold text-gray-900">
                Impuestos y Cumplimiento Tributario
              </h3>

              {/* Subtítulo */}
              <p className="text-[#8A3F83] font-semibold mt-1">
                Cero multas, máxima optimización
              </p>

              {/* Lista */}
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Declaraciones mensuales y anuales (IVA, Renta, PPM, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Optimización tributaria para pagar lo justo y evitar multas</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Gestión y respuesta ante requerimientos del SII</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Planificación del impuesto anual</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Defensa ante fiscalizaciones</span>
                </li>
              </ul>
            </motion.div>

            {/* Card 03 - Gestión Laboral y de Trabajadores */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl bg-white p-8 md:p-9 border border-[#D0A5CC]/30 shadow-[0_12px_40px_rgba(17,24,39,0.08)] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition"
            >
              {/* Número grande */}
              <div className="absolute top-6 right-6 text-6xl md:text-7xl font-extrabold text-gray-100 select-none">03</div>

              {/* Icono círculo morado */}
              <div className="w-12 h-12 rounded-2xl grid place-items-center bg-[#8A3F83] text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              {/* Título */}
              <h3 className="mt-4 text-2xl md:text-[26px] font-extrabold text-gray-900">
                Gestión Laboral y de Trabajadores
              </h3>

              {/* Subtítulo */}
              <p className="text-[#8A3F83] font-semibold mt-1">
                Tu equipo siempre protegido
              </p>

              {/* Lista */}
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Contratos de trabajo y anexos</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Liquidaciones de sueldo y cotizaciones previsionales</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Cumplimiento de leyes laborales vigentes</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Gestión de vacaciones y licencias</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Finiquitos y asesoría en contratación</span>
                </li>
              </ul>
            </motion.div>

            {/* Card 04 - Asesoría Estratégica y Acompañamiento */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-3xl bg-white p-8 md:p-9 border border-[#D0A5CC]/30 shadow-[0_12px_40px_rgba(17,24,39,0.08)] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition"
            >
              {/* Número grande */}
              <div className="absolute top-6 right-6 text-6xl md:text-7xl font-extrabold text-gray-100 select-none">04</div>

              {/* Icono círculo morado */}
              <div className="w-12 h-12 rounded-2xl grid place-items-center bg-[#8A3F83] text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>

              {/* Título */}
              <h3 className="mt-4 text-2xl md:text-[26px] font-extrabold text-gray-900">
                Asesoría Estratégica y Acompañamiento
              </h3>

              {/* Subtítulo */}
              <p className="text-[#8A3F83] font-semibold mt-1">
                Tu socio en cada decisión
              </p>

              {/* Lista */}
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Asesor directo para tu negocio</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Reportes claros y comunicación constante</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Orientación para decisiones financieras y administrativas</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Análisis de rentabilidad</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Proyecciones y evaluación de inversiones</span>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

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
              <Button
                to="/cotizador"
                className="!bg-white !text-[#65276B] shadow-brutal hover:shadow-none transform hover:translate-x-2 hover:translate-y-2 transition-all text-lg px-8 py-4 font-bold"
                trackingSection="servicios"
                trackingPosition="final_cta"
                data-gtm="services_final_cta_primary"
              >
                Quiero optimizar mi empresa
              </Button>
              <Button
                to="/contacto"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#65276B] text-lg px-8 py-4 font-bold transition-all"
                trackingSection="servicios"
                trackingPosition="final_cta"
                data-gtm="services_final_cta_secondary"
              >
                Agenda una asesoría gratis
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}