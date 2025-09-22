import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Button from '../components/Button';
import { trackPageView } from '../lib/gtm';
import { useEffect } from 'react';

export default function ComoFunciona() {
  // Track page load
  useEffect(() => {
    trackPageView('Como Funciona', '/como-funciona');
  }, []);

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
            • NUESTRO PROCESO
          </motion.div>

          {/* H1 (2 líneas) */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className="mt-6 text-white font-extrabold leading-tight tracking-tight text-4xl md:text-6xl lg:text-7xl"
          >
            Cómo funciona
            <br />
            Contadoor
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="mt-4 md:mt-5 text-white/85 text-lg md:text-xl leading-relaxed"
          >
            Un proceso simple y transparente para que tengas tu contabilidad
            <br />
            funcionando en menos de una semana
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
                className="inline-flex items-center px-6 md:px-7 py-3.5 md:py-4 rounded-full bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/15 transition focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                Agendar reunión
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sección de Proceso y Ventajas */}
      <section className="bg-[#F7F9FB]">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
          {/* Header centrado */}
          <div className="text-center">
            <p className="text-xs font-semibold tracking-widest text-[#8A3F83] uppercase">
              Proceso Contadoor
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-2">
              ¿Por qué nuestro proceso funciona de verdad?
            </h2>
            <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
              Tecnología y asesoría humana, con implementación simple.
            </p>
          </div>

          {/* Grid de PASOS (2x2) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Paso 1 - Diagnóstico inicial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl bg-white p-7 md:p-8 shadow-[0_12px_40px_rgba(17,24,39,0.08)] border border-gray-100 hover:translate-y-[-2px] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition"
            >
              <div className="absolute top-5 right-6 text-6xl font-extrabold text-gray-100 select-none">01</div>
              <div className="text-[44px]">🔎</div>
              <h3 className="mt-3 text-2xl font-extrabold text-gray-900">Diagnóstico inicial</h3>
              <p className="mt-2 text-gray-600">
                Revisamos tu contabilidad, impuestos y gestión laboral para detectar riesgos y oportunidades.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8A3F83] text-white text-sm font-semibold shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Diagnóstico sin costo
              </div>
            </motion.div>

            {/* Paso 2 - Plan de acción personalizado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-3xl bg-white p-7 md:p-8 shadow-[0_12px_40px_rgba(17,24,39,0.08)] border border-gray-100 hover:translate-y-[-2px] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition"
            >
              <div className="absolute top-5 right-6 text-6xl font-extrabold text-gray-100 select-none">02</div>
              <div className="text-[44px]">📋</div>
              <h3 className="mt-3 text-2xl font-extrabold text-gray-900">Plan de acción personalizado</h3>
              <p className="mt-2 text-gray-600">
                Creamos un calendario de cumplimiento que prioriza lo urgente y organiza todo el año.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8A3F83] text-white text-sm font-semibold shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Plan claro y medible
              </div>
            </motion.div>

            {/* Paso 3 - Acompañamiento constante */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl bg-white p-7 md:p-8 shadow-[0_12px_40px_rgba(17,24,39,0.08)] border border-gray-100 hover:translate-y-[-2px] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition"
            >
              <div className="absolute top-5 right-6 text-6xl font-extrabold text-gray-100 select-none">03</div>
              <div className="text-[44px]">🤝</div>
              <h3 className="mt-3 text-2xl font-extrabold text-gray-900">Acompañamiento constante</h3>
              <p className="mt-2 text-gray-600">
                Tendrás un asesor directo, comunicación fluida y reportes claros.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8A3F83] text-white text-sm font-semibold shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Asesor dedicado 24/7
              </div>
            </motion.div>

            {/* Paso 4 - Todo en un solo lugar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-3xl bg-white p-7 md:p-8 shadow-[0_12px_40px_rgba(17,24,39,0.08)] border border-gray-100 hover:translate-y-[-2px] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition"
            >
              <div className="absolute top-5 right-6 text-6xl font-extrabold text-gray-100 select-none">04</div>
              <div className="text-[44px]">🎯</div>
              <h3 className="mt-3 text-2xl font-extrabold text-gray-900">Todo en un solo lugar</h3>
              <p className="mt-2 text-gray-600">
                Centralizamos tu cumplimiento legal, tributario y laboral, evitando errores.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8A3F83] text-white text-sm font-semibold shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Todo centralizado
              </div>
            </motion.div>
          </div>

          {/* Separador sutil */}
          <div className="mt-10 mb-2 h-px bg-gray-100"></div>

          {/* Grid de DIFERENCIADORES (1x3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-6">
            {/* Diferenciador 1 - RÁPIDO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-3xl bg-white/60 backdrop-blur p-7 md:p-8 border border-gray-100 hover:translate-y-[-2px] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition"
            >
              <p className="text-sm font-semibold tracking-wide text-[#8A3F83] uppercase">RÁPIDO</p>
              <h3 className="mt-1 text-xl md:text-2xl font-extrabold text-gray-900">Implementación Rápida</h3>
              <p className="mt-2 text-gray-600">En menos de 7 días tienes todo funcionando</p>
            </motion.div>

            {/* Diferenciador 2 - DIGITAL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="rounded-3xl bg-white/60 backdrop-blur p-7 md:p-8 border border-gray-100 hover:translate-y-[-2px] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition"
            >
              <p className="text-sm font-semibold tracking-wide text-[#8A3F83] uppercase">DIGITAL</p>
              <h3 className="mt-1 text-xl md:text-2xl font-extrabold text-gray-900">Sin Fricciones</h3>
              <p className="mt-2 text-gray-600">Proceso 100% digital y automatizado</p>
            </motion.div>

            {/* Diferenciador 3 - CLARO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="rounded-3xl bg-white/60 backdrop-blur p-7 md:p-8 border border-gray-100 hover:translate-y-[-2px] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition"
            >
              <p className="text-sm font-semibold tracking-wide text-[#8A3F83] uppercase">CLARO</p>
              <h3 className="mt-1 text-xl md:text-2xl font-extrabold text-gray-900">Transparencia Total</h3>
              <p className="mt-2 text-gray-600">Siempre sabes en qué etapa estás</p>
            </motion.div>
          </div>
        </div>
      </section>

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
            <div className="inline-block p-8 lg:p-12 bg-white/10 backdrop-blur-md rounded-3xl">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
                ¿Listo para simplificar tu contabilidad?
              </h2>
              <p className="text-white/80 mb-8 max-w-md mx-auto">
                Comienza hoy mismo con un diagnóstico gratuito de tu situación actual
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cotizador">
                  <button className="inline-flex items-center px-6 md:px-7 py-3.5 md:py-4 rounded-full bg-white text-gray-900 font-semibold shadow-[0_8px_0_#111] hover:translate-y-[-1px] hover:shadow-[0_7px_0_#111] active:translate-y-0 active:shadow-none transition focus:outline-none focus:ring-2 focus:ring-black/20">
                    Comenzar ahora
                  </button>
                </Link>
                <Link to="/contacto">
                  <button className="inline-flex items-center px-6 md:px-7 py-3.5 md:py-4 rounded-full bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/15 transition focus:outline-none focus:ring-2 focus:ring-black/20">
                    Agendar reunión
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}