import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, SearchCheck, CalendarCheck, Handshake, BarChart3, ShieldCheck, Ban, Headphones, Eye, Clock, Users, Bell, FileText, Rocket, Smile, CalendarDays, Star, ChevronDown, ChevronUp, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import Card from '../components/Card';

// Componente contador animado para beneficios
function AnimatedBenefit({ end, duration = 2000, suffix = '', prefix = '', text }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  if (text) {
    return <span ref={ref}>{text}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

// Componente FAQ Item
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

// Lazy section component para optimizar carga
function LazySection({ children, fallback = null }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback || <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}
    </div>
  );
}

export default function Inicio() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const carouselRef = useRef(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Función para permitir scroll horizontal con rueda del mouse en desktop
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (e) => {
      // Solo aplicar si hay overflow horizontal
      if (carousel.scrollWidth > carousel.clientWidth) {
        e.preventDefault();
        carousel.scrollLeft += e.deltaY;
      }
    };

    carousel.addEventListener('wheel', handleWheel, { passive: false });
    return () => carousel.removeEventListener('wheel', handleWheel);
  }, []);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const scrollAmount = 320; // ancho de card (320px) + gap
    const currentScroll = carouselRef.current.scrollLeft;
    const targetScroll = direction === 'left'
      ? currentScroll - scrollAmount
      : currentScroll + scrollAmount;

    carouselRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const bounceIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 20, stiffness: 300 }
    }
  };

  return (
    <>
      {/* Hero sólido morado con texto blanco */}
      <section id="hero" data-section-name="Hero" className="relative min-h-[700px] flex items-center overflow-hidden bg-primary-600 text-white py-16 lg:py-20">
        {/* Overlay suave en mobile para contraste */}
        <div className="absolute inset-0 bg-black/10 md:bg-transparent" />
        <Container className="relative z-10 px-4 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center md:text-left space-y-8">
              {/* Pill de urgencia */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span className="inline-block text-xs font-semibold text-yellow-300 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-400/30" data-gtm="hero_pill_urgency">
                  ⚡ Solo 5 cupos este mes
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-4xl font-extrabold leading-tight max-w-[20ch] mx-auto md:mx-0"
                data-gtm="hero_headline"
              >
                Ahorra tiempo y evita multas. Tu negocio al día, siempre.
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-base text-white/90 leading-relaxed max-w-[65ch] mx-auto md:mx-0"
              >
                Contabilidad, impuestos y laboral en un solo lugar, con un asesor directo que te avisa antes de cada vencimiento.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Button
                  to="/cotizador"
                  className="!bg-white !text-primary-600 hover:shadow-[6px_6px_0_#000000] transition-all font-black shadow-[4px_4px_0_#000000] !py-4 !px-8 !text-base w-full sm:w-auto"
                  data-gtm="hero_cta_primary"
                >
                  Cotizar mi plan
                </Button>
                <Button
                  to="/contacto"
                  className="!bg-transparent !text-white border-2 border-white hover:!bg-white hover:!text-primary-600 transition-all font-bold flex items-center gap-2 justify-center !py-4 !px-8 !text-base w-full sm:w-auto"
                  data-gtm="hero_cta_secondary"
                >
                  <MessageCircle size={18} />
                  Hablar con un asesor
                </Button>
              </motion.div>
            </div>

            <div className="space-y-6">
              {/* Imagen sin elementos flotantes */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="relative flex justify-center"
                data-gtm="hero_image"
              >
                <div className="absolute inset-0 bg-white/60 rounded-2xl transform rotate-6 scale-105 h-[320px] w-[260px] lg:h-[480px] lg:w-[380px] hidden lg:block" />
                <img
                  src="/images/hero.jpg"
                  alt="Equipo profesional de Contadoor trabajando"
                  className="rounded-2xl shadow-xl shadow-primary-900/20 relative z-10 object-cover object-top h-[320px] w-[260px] lg:h-[480px] lg:w-[380px]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </motion.div>

              {/* Stats grid 2x2 debajo de la imagen (solo mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="grid grid-cols-2 gap-3 lg:hidden"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center" data-gtm="hero_stat_multas">
                  <div className="text-2xl font-bold mb-1">0</div>
                  <div className="text-xs text-white/80">Multas SII</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center" data-gtm="hero_stat_clientes">
                  <div className="text-2xl font-bold mb-1">500+</div>
                  <div className="text-xs text-white/80">Clientes</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center" data-gtm="hero_stat_rating">
                  <div className="text-2xl font-bold mb-1 flex items-center justify-center gap-1">
                    <span>4.9</span>
                    <span className="text-yellow-400 text-lg">⭐</span>
                  </div>
                  <div className="text-xs text-white/80">Calificación</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center" data-gtm="hero_stat_onboarding">
                  <div className="text-2xl font-bold mb-1">48h</div>
                  <div className="text-xs text-white/80">Onboarding</div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>


      {/* Problemas comunes que resolvemos */}
      <section id="problemas" data-section-name="Problemas" className="bg-[#F7F9FB] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título principal mejorado */}
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
            >
              Lo que hoy te frena… <span className="text-primary-600">y cómo lo resolvemos</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-4xl mx-auto mt-4 text-lg"
            >
              Estos son los dolores más comunes que viven los empresarios, y cómo en Contadoor los transformamos en soluciones reales.
            </motion.p>
          </div>

          {/* Grid de cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6 mt-16 pt-6 overflow-visible">
            {/* Card 1 - Contador fantasma */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="rounded-3xl bg-white border border-gray-200 shadow-[0_10px_30px_rgba(17,24,39,0.06)] p-6 md:p-6 relative hover:shadow-xl hover:shadow-primary-200/30 transition-all duration-300 mt-6 cursor-pointer"
              data-gtm="pain_point_1"
            >
              {/* Número flotante */}
              <div className="absolute -top-4 right-6 md:right-10 w-9 h-9 rounded-full grid place-items-center bg-primary-600 text-white font-semibold">
                1
              </div>

              {/* Icon wrapper */}
              <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
                <span className="text-xl">⏱️</span>
              </div>

              {/* Contenido */}
              <h3 className="text-xl font-semibold mt-3 text-gray-900">Contador fantasma</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">
                Solo aparece a fin de mes para cobrar, pero nunca cuando lo necesitas.
              </p>

              {/* Divisor */}
              <div className="mt-6 mb-3 h-px bg-gray-200"></div>

              {/* Pie con nivel de impacto */}
              <div className="flex items-center justify-between">
                <span className="text-primary-600 font-medium text-sm">Alto impacto</span>
                <div className="flex gap-1">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-primary-600"
                  >
                    ●●●
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Destacada */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              animate={{
                scale: [1, 1.02, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 6
                }
              }}
              className="rounded-3xl bg-primary-600 shadow-[0_12px_35px_rgba(17,24,39,0.08)] p-6 md:p-6 relative hover:shadow-2xl hover:shadow-primary-200/40 transition-all duration-300 mt-6 md:scale-105 cursor-pointer"
              data-gtm="pain_point_2"
            >
              {/* Badge "MÁS COMÚN" con icono */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 left-6 md:left-10 px-3 py-1 rounded-full bg-white text-primary-600 text-xs font-semibold shadow flex items-center gap-1"
              >
                🔥 MÁS COMÚN
              </motion.div>

              {/* Número flotante */}
              <div className="absolute -top-4 right-6 md:right-10 w-9 h-9 rounded-full grid place-items-center bg-white text-primary-600 font-semibold">
                2
              </div>

              {/* Icon wrapper */}
              <div className="bg-white/20 p-3 rounded-full w-fit mb-4">
                <span className="text-white text-xl">⚠️</span>
              </div>

              {/* Contenido */}
              <h3 className="text-xl font-semibold mt-3 text-white">Comunicación confusa</h3>
              <p className="text-white/90 mt-2 leading-relaxed">
                Respuestas tardías, correos eternos y cero claridad.
              </p>

              {/* Divisor */}
              <div className="mt-6 mb-3 h-px bg-white/20"></div>

              {/* Pie con nivel de impacto */}
              <div className="flex items-center justify-between">
                <span className="text-white/90 font-medium text-sm">Alto impacto</span>
                <div className="flex gap-1">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="text-white"
                  >
                    ●●●
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Estrés constante */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="rounded-3xl bg-white border border-gray-200 shadow-[0_10px_30px_rgba(17,24,39,0.06)] p-6 md:p-6 relative hover:shadow-xl hover:shadow-primary-200/30 transition-all duration-300 mt-6 cursor-pointer"
              data-gtm="pain_point_3"
            >
              {/* Número flotante */}
              <div className="absolute -top-4 right-6 md:right-10 w-9 h-9 rounded-full grid place-items-center bg-primary-600 text-white font-semibold">
                3
              </div>

              {/* Icon wrapper */}
              <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
                <span className="text-xl">😟</span>
              </div>

              {/* Contenido */}
              <h3 className="text-xl font-semibold mt-3 text-gray-900">Estrés constante</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">
                Multas, atrasos y cero tranquilidad porque nadie entiende realmente tu negocio.
              </p>

              {/* Divisor */}
              <div className="mt-6 mb-3 h-px bg-gray-200"></div>

              {/* Pie con nivel de impacto */}
              <div className="flex items-center justify-between">
                <span className="text-primary-600 font-medium text-sm">Alto impacto</span>
                <div className="flex gap-1">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="text-primary-600"
                  >
                    ●●●
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Texto inferior + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-gray-600 mt-10">
              En Contadoor transformamos estos problemas en soluciones concretas
            </p>
            <div className="mt-6">
              <Link to="/cotizador">
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1, type: "spring", damping: 20 }}
                  whileHover={{ y: -2, boxShadow: '6px 6px 0 #000' }}
                  whileActive={{ y: 0, boxShadow: '2px 2px 0 #000' }}
                  className="inline-flex items-center px-6 py-3 rounded-full bg-primary-600 text-white font-semibold transition"
                  style={{ boxShadow: '4px 4px 0 #000' }}
                  data-gtm="pain_solution_cta"
                  aria-label="Quiero resolver estos problemas ahora con Contadoor"
                >
                  Quiero resolver estos problemas ahora →
                </motion.button>
              </Link>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-sm text-gray-600 mt-3 font-medium"
              >
                ⏰ <span className="font-bold text-red-600">Últimos 3 días</span> del diagnóstico gratuito
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonios/Casos de Éxito - Prueba social */}
      <section id="testimonios" data-section-name="Testimonios" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold ring-1 ring-primary-200 mb-4">
              ⭐ CASOS REALES
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Empresas reales, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">resultados reales</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
              Más de 500 empresas confían en nosotros. Aquí tienes algunos casos de éxito.
            </p>

            {/* Badge de urgencia */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              className="mt-6 inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-full text-sm font-semibold"
            >
              🔥 Solo tomamos 12 clientes nuevos por mes
            </motion.div>
          </motion.div>

          {/* Carrusel de testimonios */}
          <div className="relative">
            {/* Botones de navegación - Solo desktop */}
            <button
              onClick={() => scrollCarousel('left')}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full items-center justify-center text-primary-600 hover:bg-primary-50 transition-all duration-200"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => scrollCarousel('right')}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full items-center justify-center text-primary-600 hover:bg-primary-50 transition-all duration-200"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight size={20} />
            </button>

            <div
              ref={carouselRef}
              className="overflow-x-auto pb-8 scrollbar-hide max-w-full"
              style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
            >
              <div className="flex gap-6 px-4 py-4" style={{ width: 'fit-content', maxWidth: '100vw' }}>

                {/* Testimonio 1 - Sergio Lucy */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative flex flex-col w-80 flex-shrink-0"
                  data-gtm="testimonial_card_1"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-200" />

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 mb-6 leading-relaxed flex-grow">
                    "Me recomendaron sus servicios para crear mi emprendimiento e iniciar actividades, ahora ya después de 2 años junto a ellos los e recomendado a todos los que necesitan apoyo. Siempre atentos y dispuestos ayudar y solucionar problemas."
                  </blockquote>

                  <div className="mt-auto">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-600">
                        SL
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Sergio Lucy</div>
                        <div className="text-sm text-gray-500">Yellow Envios</div>
                        <div className="text-xs text-primary-600 font-medium">Hace 3 años</div>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-green-700 font-semibold text-sm">2 años de acompañamiento exitoso</div>
                    </div>
                  </div>
                </motion.div>

                {/* Testimonio 2 - Héctor Gatica - Destacado */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl p-6 shadow-xl relative flex flex-col w-80 flex-shrink-0 transform scale-105"
                  style={{ margin: '0 20px' }}
                  data-gtm="testimonial_card_featured"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary-600 px-3 py-1 rounded-full text-xs font-black"
                  >
                    ⭐ CASO DESTACADO
                  </motion.div>

                  <Quote className="absolute top-4 right-4 w-8 h-8 text-white/30" />

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                    ))}
                  </div>

                  <blockquote className="text-white/95 mb-6 leading-relaxed font-medium flex-grow">
                    "Servicios excelente 100% recomendado. Siempre atento a cualquier requerimiento."
                  </blockquote>

                  <div className="mt-auto">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-white">
                        HG
                      </div>
                      <div>
                        <div className="font-semibold text-white">Héctor Omar Gatica Peña</div>
                        <div className="text-sm text-white/80">Servicios de Ingeniería OG SPA</div>
                        <div className="text-xs text-white/70">Hace 3 años</div>
                      </div>
                    </div>

                    <div className="p-3 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                      <div className="text-white font-semibold text-sm">100% recomendado</div>
                    </div>
                  </div>
                </motion.div>

                {/* Testimonio 3 - Valentina Armingol */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative flex flex-col w-80 flex-shrink-0"
                  data-gtm="testimonial_card_3"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-200" />

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 mb-6 leading-relaxed flex-grow">
                    "Muy buen servicio."
                  </blockquote>

                  <div className="mt-auto">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-600">
                        VA
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Valentina Armingol</div>
                        <div className="text-sm text-gray-500">Centro Terapéutico Creesiente SPA</div>
                        <div className="text-xs text-primary-600 font-medium">Hace 3 años</div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-blue-700 font-semibold text-sm">Servicio de calidad</div>
                    </div>
                  </div>
                </motion.div>

                {/* Testimonio 4 - Orlando Muñoz */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative flex flex-col w-80 flex-shrink-0"
                  data-gtm="testimonial_card_4"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-200" />

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 mb-6 leading-relaxed flex-grow">
                    "Excelente atención y servicio. Llevo trabajando con ellos desde el 2015. Gestionan mis IVAs, rentas, pago de remuneraciones al personal, etc. Siempre atentos a mis requerimientos con una rápida respuesta."
                  </blockquote>

                  <div className="mt-auto">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-600">
                        OM
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Orlando Muñoz</div>
                        <div className="text-sm text-gray-500">Oparts SPA</div>
                        <div className="text-xs text-primary-600 font-medium">Cliente desde 2015</div>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-green-700 font-semibold text-sm">9+ años de confianza</div>
                    </div>
                  </div>
                </motion.div>

                {/* Testimonio 5 - Anigret Cea */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative flex flex-col w-80 flex-shrink-0"
                  data-gtm="testimonial_card_5"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-200" />

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 mb-6 leading-relaxed flex-grow">
                    "Excelente servicio. Siempre dispuesto a ayudar y resolver problemas en la contabilidad de mi negocio."
                  </blockquote>

                  <div className="mt-auto">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-600">
                        AC
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Anigret Cea</div>
                        <div className="text-sm text-gray-500">Comercializadora Mascotec Ltda.</div>
                        <div className="text-xs text-primary-600 font-medium">Hace 3 años</div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-blue-700 font-semibold text-sm">Soluciones contables efectivas</div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Indicador de scroll */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                <span className="md:hidden">← Desliza para ver más testimonios →</span>
                <span className="hidden md:inline">Usa los botones o rueda del mouse para navegar</span>
              </p>
            </div>
          </div>

          {/* Stats de confianza */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary-600">
                <AnimatedBenefit end={500} suffix="+" duration={2000} />
              </div>
              <div className="text-sm text-gray-600 mt-1">Empresas activas</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary-600">
                <AnimatedBenefit end={98} suffix="%" duration={2200} />
              </div>
              <div className="text-sm text-gray-600 mt-1">Nos recomienda</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary-600">
                <AnimatedBenefit end={3} duration={1800} />
              </div>
              <div className="text-sm text-gray-600 mt-1">Años promedio como cliente</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary-600">
                <AnimatedBenefit end={15} suffix=" min" duration={2500} />
              </div>
              <div className="text-sm text-gray-600 mt-1">Tiempo de respuesta</div>
            </div>
          </motion.div>

          {/* CTA con urgencia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link to="/cotizador">
              <motion.button
                whileHover={{ y: -3, scale: 1.05 }}
                whileActive={{ y: 0, scale: 0.98 }}
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-primary-600 text-white font-black text-lg transition-all duration-300 hover:shadow-[6px_6px_0_#000]"
                style={{ boxShadow: '4px 4px 0 #000' }}
                data-gtm="testimonials_cta"
                aria-label="Quiero ser el próximo caso de éxito"
              >
                🚀 Quiero ser el próximo caso de éxito →
              </motion.button>
            </Link>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-sm text-gray-600 mt-4 font-medium"
            >
              Quedan <span className="font-bold text-red-600">5 cupos</span> para este mes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Cómo funciona - Timeline mejorado */}
      <section id="como-funciona" data-section-name="Cómo Funciona" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/foto1.jpg"
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
            {/* Título y subtítulo mejorados */}
            <div className="text-center mb-20">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider bg-primary-50 px-4 py-2 rounded-full"
              >
                🚀 NUESTRO PROCESO
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-black mt-6"
              >
                Así de simple es trabajar con Contadoor 🚀
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto font-medium"
              >
                4 pasos claros para que tu negocio esté al día, siempre.
              </motion.p>
            </div>

            {/* Timeline horizontal en desktop, vertical en mobile */}
            <div className="relative">
              {/* Línea conectora animada - Desktop */}
              <div className="hidden md:block">
                <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 rounded-full" />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="absolute top-12 left-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                />
              </div>

              {/* Línea conectora animada - Mobile */}
              <div className="md:hidden absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-gray-100 rounded-full -z-10 opacity-10" />
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
                className="md:hidden absolute left-1/2 -translate-x-0.25 top-0 w-0.5 bg-gradient-to-b from-primary-300 to-primary-400 rounded-full -z-10 opacity-15"
              />

              <div className="grid md:grid-cols-4 gap-6 md:gap-4">
                {/* Paso 1 */}
                <motion.div
                  className="text-center md:text-center relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  data-gtm="process_step_1"
                >
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-28 h-28 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl hover:shadow-2xl transition-all cursor-pointer group relative"
                    >
                      <SearchCheck size={32} />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                      className="inline-flex items-center justify-center w-8 h-8 bg-primary-600 text-white text-sm font-bold rounded-full mb-4 shadow-lg"
                    >
                      1
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3">Diagnóstico inicial</h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">Revisamos tu contabilidad e impuestos, detectando riesgos y oportunidades.</p>
                  </div>
                </motion.div>

                {/* Paso 2 */}
                <motion.div
                  className="text-center md:text-center relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  data-gtm="process_step_2"
                >
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-28 h-28 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl hover:shadow-2xl transition-all cursor-pointer group relative"
                    >
                      <CalendarCheck size={32} />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                      className="inline-flex items-center justify-center w-8 h-8 bg-primary-600 text-white text-sm font-bold rounded-full mb-4 shadow-lg"
                    >
                      2
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3">Plan personalizado</h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">Creamos un calendario simple y claro, priorizando lo urgente.</p>
                  </div>
                </motion.div>

                {/* Paso 3 */}
                <motion.div
                  className="text-center md:text-center relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  data-gtm="process_step_3"
                >
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-28 h-28 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl hover:shadow-2xl transition-all cursor-pointer group relative"
                    >
                      <Handshake size={32} />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
                      className="inline-flex items-center justify-center w-8 h-8 bg-primary-600 text-white text-sm font-bold rounded-full mb-4 shadow-lg"
                    >
                      3
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3">Acompañamiento constante</h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">Un asesor directo que responde rápido y entrega reportes claros.</p>
                  </div>
                </motion.div>

                {/* Paso 4 */}
                <motion.div
                  className="text-center md:text-center relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  data-gtm="process_step_4"
                >
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-28 h-28 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl hover:shadow-2xl transition-all cursor-pointer group relative"
                    >
                      <BarChart3 size={32} />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
                      className="inline-flex items-center justify-center w-8 h-8 bg-primary-600 text-white text-sm font-bold rounded-full mb-4 shadow-lg"
                    >
                      4
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3">Todo en un lugar</h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">Centralizamos lo legal, tributario y laboral para que no pierdas tiempo.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* CTA final brutalista */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="text-center mt-20"
            >
              <Link to="/cotizador">
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.5, type: "spring", damping: 20 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileActive={{ y: 0, scale: 0.98 }}
                  className="inline-flex items-center px-10 py-5 rounded-full bg-primary-600 text-white font-black text-lg transition-all duration-300 hover:shadow-[6px_6px_0_#000]"
                  style={{ boxShadow: '4px 4px 0 #000' }}
                  data-gtm="process_cta"
                  aria-label="Quiero empezar en 4 pasos con Contadoor"
                >
                  🚀 Quiero empezar en 4 pasos →
                </motion.button>
              </Link>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.7 }}
                className="text-sm text-gray-600 mt-4 font-medium"
              >
                🔥 Solo quedan 5 cupos para este mes
              </motion.p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Beneficios - Rediseño 2025 optimizado */}
      <section id="beneficios" data-section-name="Beneficios" className="relative overflow-hidden text-white py-16 lg:py-24" style={{ background: 'linear-gradient(to bottom, #6F326A, #8A3F83)' }}>
        {/* Patrón de puntos sutil */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(#ffffff14 1px, transparent 1px)',
            backgroundSize: '18px 18px'
          }}
        />

        {/* Vignette blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-80 bg-white/5 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -left-20 w-72 h-80 bg-white/5 rounded-full blur-3xl opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            {/* Header mejorado con mesh gradient */}
            <div className="text-center mb-16 relative">
              {/* Mesh gradient sutil detrás del título */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-white/5 to-primary-200/10 rounded-full blur-3xl" />

              <div className="inline-flex px-4 py-2 rounded-full bg-white/10 text-primary-300 text-xs font-semibold ring-1 ring-white/15 mb-6">
                ✨ BENEFICIOS 2025
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold tracking-tight relative z-10"
              >
                Beneficios que verás <span className="text-primary-300">desde el primer mes</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white/90 mt-4 max-w-3xl mx-auto text-lg"
              >
                No solo hacemos contabilidad, te damos claridad, tiempo y crecimiento real.
              </motion.p>
            </div>

            {/* Grid de KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

              {/* Card 1 - Confianza */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-xl p-6 bg-white/10 backdrop-blur border border-white/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-200/30 transition-all duration-300 group cursor-pointer"
                data-gtm="benefit_card_tranquilidad"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    className="bg-white p-3 rounded-full text-primary-600 flex-shrink-0 shadow-lg"
                  >
                    <ShieldCheck size={24} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-5xl md:text-6xl font-extrabold leading-none mb-3">
                      <AnimatedBenefit end={100} suffix="%" duration={2500} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">de tranquilidad</h3>
                    <p className="text-white/80 text-sm opacity-90">Controlas tu negocio, nosotros el papeleo.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - Multas */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-xl p-6 bg-white/10 backdrop-blur border border-white/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-200/30 transition-all duration-300 group cursor-pointer"
                data-gtm="benefit_card_multas"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    className="bg-white p-3 rounded-full text-primary-600 flex-shrink-0 shadow-lg"
                  >
                    <Ban size={24} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-5xl md:text-6xl font-extrabold leading-none mb-3">
                      <AnimatedBenefit end={0} duration={2000} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">multas</h3>
                    <p className="text-white/80 text-sm opacity-90">Prevenimos problemas antes de que ocurran.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - Soporte */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-xl p-6 bg-white/10 backdrop-blur border border-white/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-200/30 transition-all duration-300 group cursor-pointer"
                data-gtm="benefit_card_soporte"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    className="bg-white p-3 rounded-full text-primary-600 flex-shrink-0 shadow-lg"
                  >
                    <Headphones size={24} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-5xl md:text-6xl font-extrabold leading-none mb-3">
                      24/7
                    </div>
                    <h3 className="text-xl font-bold mb-2">Soporte</h3>
                    <p className="text-white/80 text-sm opacity-90">Comunicación directa y sin esperas.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 4 - Visibilidad */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-xl p-6 bg-white/10 backdrop-blur border border-white/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-200/30 transition-all duration-300 group cursor-pointer"
                data-gtm="benefit_card_transparencia"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    className="bg-white p-3 rounded-full text-primary-600 flex-shrink-0 shadow-lg"
                  >
                    <Eye size={24} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-5xl md:text-6xl font-extrabold leading-none mb-3">
                      360°
                    </div>
                    <h3 className="text-xl font-bold mb-2">de transparencia</h3>
                    <p className="text-white/80 text-sm opacity-90">Todo en tiempo real.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 5 - Tiempo */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="rounded-xl p-6 bg-white/10 backdrop-blur border border-white/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-200/30 transition-all duration-300 group cursor-pointer"
                data-gtm="benefit_card_tiempo"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    className="bg-white p-3 rounded-full text-primary-600 flex-shrink-0 shadow-lg"
                  >
                    <Clock size={24} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-5xl md:text-6xl font-extrabold leading-none mb-3">
                      +<AnimatedBenefit end={8} duration={2200} />h
                    </div>
                    <h3 className="text-xl font-bold mb-2">libres al mes</h3>
                    <p className="text-white/80 text-sm opacity-90">Dedícalas a crecer tu negocio.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 6 - Equipo */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="rounded-xl p-6 bg-white/10 backdrop-blur border border-white/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-200/30 transition-all duration-300 group cursor-pointer"
                data-gtm="benefit_card_equipo"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    className="bg-white p-3 rounded-full text-primary-600 flex-shrink-0 shadow-lg"
                  >
                    <Users size={24} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-5xl md:text-6xl font-extrabold leading-none mb-3">
                      <AnimatedBenefit end={3} duration={1800} /> en 1
                    </div>
                    <h3 className="text-xl font-bold mb-2">Un solo equipo</h3>
                    <p className="text-white/80 text-sm opacity-90">Contabilidad, impuestos y laboral integrados.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Final brutalista */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-16"
            >
              <Link to="/cotizador">
                <motion.button
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileActive={{ y: 0, scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-gray-900 font-black text-lg transition-all duration-300 hover:shadow-[6px_6px_0_#000]"
                  style={{ boxShadow: '4px 4px 0 #000' }}
                  data-gtm="benefits_cta"
                  aria-label="Quiero empezar a ganar estos beneficios con Contadoor"
                >
                  👉 Quiero empezar a ganar estos beneficios →
                </motion.button>
              </Link>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="text-sm text-white/80 mt-4 font-medium"
              >
                🔥 Solo quedan 5 cupos para este mes
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comparemos opciones - Optimizado 2025 */}
      <section id="comparacion" data-section-name="Comparación" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold ring-1 ring-primary-200 mb-4">
              COMPARACIÓN HONESTA
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-2">
              ¿Cuál opción te conviene <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">realmente</span>?
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Te mostramos la realidad sin filtros para que tomes la mejor decisión para tu negocio.
            </p>
          </motion.div>

          {/* Grid de tarjetas diferenciadas - Desktop / Carrusel - Mobile */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-6 mt-12 pt-6 overflow-visible">

            {/* Card 1 - Contador Independiente (Roja - Problemas) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl bg-white border-2 border-red-200 p-6 shadow-lg hover:shadow-red-100 transition-all"
              data-gtm="compare_card_independiente"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <h3 className="text-2xl font-bold text-gray-900">Contador Independiente</h3>
              </div>
              <p className="text-sm text-red-600 font-medium mb-6">Lo tradicional que ya no funciona</p>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg">❌</span>
                  <span className="text-gray-700 font-medium">Te deja en visto cuando lo necesitas</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg">❌</span>
                  <span className="text-gray-700 font-medium">Se va de vacaciones sin respaldo</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg">❌</span>
                  <span className="text-gray-700 font-medium">Solo reacciona cuando ya hay problemas</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg">❌</span>
                  <span className="text-gray-700 font-medium">Trabajo manual = más errores</span>
                </motion.div>
              </div>

              <div className="mt-6 p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-700 text-sm font-medium text-center">
                  ⚠️ Alto riesgo de multas y atrasos
                </p>
              </div>
            </motion.div>

            {/* Card 2 - Software Contable (Amarilla - Advertencia) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl bg-white border-2 border-yellow-200 p-6 shadow-lg hover:shadow-yellow-100 transition-all"
              data-gtm="compare_card_software"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                <h3 className="text-2xl font-bold text-gray-900">Software Contable</h3>
              </div>
              <p className="text-sm text-yellow-600 font-medium mb-6">Tecnología sin el factor humano</p>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg">⚠️</span>
                  <span className="text-gray-700 font-medium">Necesitas ser experto para usarlo bien</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg">❌</span>
                  <span className="text-gray-700 font-medium">Cero asesoría cuando tienes dudas</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg">❌</span>
                  <span className="text-gray-700 font-medium">Si te equivocas, el problema es tuyo</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg">⚠️</span>
                  <span className="text-gray-700 font-medium">Soporte técnico básico y lento</span>
                </motion.div>
              </div>

              <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-700 text-sm font-medium text-center">
                  ⚠️ Responsabilidad 100% tuya
                </p>
              </div>
            </motion.div>

            {/* Card 3 - Contadoor (Morada - Destacada y más grande) */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", damping: 20 }}
              className="relative rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 text-white p-6 shadow-2xl ring-2 ring-primary-300 md:transform md:scale-105"
              data-gtm="compare_card_contadoor"
            >
              {/* Badge RECOMENDADO animado con pulse */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, type: "spring", damping: 15 }}
                className="hidden md:block absolute -top-4 left-10 px-3 py-1 rounded-full bg-white text-primary-600 text-xs font-black shadow-lg"
              >
                ✨ RECOMENDADO ✨
              </motion.div>

              <div className="flex items-center gap-3 mb-4 mt-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <h3 className="text-2xl font-bold">Contadoor</h3>
              </div>
              <p className="text-sm text-white/90 font-medium mb-6">La solución que sí funciona</p>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg">✅</span>
                  <span className="text-white font-medium">Equipo completo siempre disponible</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg">✅</span>
                  <span className="text-white font-medium">Tecnología + asesoría humana</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg">✅</span>
                  <span className="text-white font-medium">Prevención antes que los problemas</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg">✅</span>
                  <span className="text-white font-medium">Garantía total de cumplimiento</span>
                </motion.div>
              </div>

              <div className="mt-6 p-4 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                <p className="text-white font-bold text-center">
                  🏆 Tranquilidad garantizada al 100%
                </p>
              </div>

              {/* Botón brutalista mejorado */}
              <Link to="/cotizador">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileActive={{ y: 0, scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white text-primary-600 font-black text-lg mt-8 transition-all focus:outline-none focus:ring-2 focus:ring-white/20 hover:shadow-[6px_6px_0_#000]"
                  style={{ boxShadow: '4px 4px 0 #000' }}
                  data-gtm="compare_cta_contadoor"
                  aria-label="Elegir Contadoor como mi solución contable"
                >
                  👉 Tranquilidad ahora →
                </motion.button>
              </Link>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-white/80 text-sm text-center mt-3"
              >
                ⚡ Solo 5 cupos disponibles este mes
              </motion.p>
            </motion.div>
          </div>

          {/* Carrusel móvil */}
          <div className="md:hidden mt-12 pt-6 max-w-full overflow-hidden">
            <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory scrollbar-hide overflow-y-visible max-w-full">

              {/* Card Mobile 1 - Contador Independiente */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex-shrink-0 w-72 rounded-3xl bg-white border-2 border-red-200 p-6 shadow-lg snap-center"
                data-gtm="compare_card_independiente"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <h3 className="text-xl font-bold text-gray-900">Contador Independiente</h3>
                </div>
                <p className="text-sm text-red-600 font-medium mb-4">Lo tradicional que ya no funciona</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">❌</span>
                    <span className="text-gray-700 font-medium text-sm">Te deja en visto cuando lo necesitas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">❌</span>
                    <span className="text-gray-700 font-medium text-sm">Se va de vacaciones sin respaldo</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">❌</span>
                    <span className="text-gray-700 font-medium text-sm">Solo reacciona cuando ya hay problemas</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-700 text-sm font-medium text-center">
                    ⚠️ Alto riesgo de multas
                  </p>
                </div>
              </motion.div>

              {/* Card Mobile 2 - Software Contable */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-shrink-0 w-72 rounded-3xl bg-white border-2 border-yellow-200 p-6 shadow-lg snap-center"
                data-gtm="compare_card_software"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                  <h3 className="text-xl font-bold text-gray-900">Software Contable</h3>
                </div>
                <p className="text-sm text-yellow-600 font-medium mb-4">Tecnología sin el factor humano</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">⚠️</span>
                    <span className="text-gray-700 font-medium text-sm">Necesitas ser experto para usarlo</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">❌</span>
                    <span className="text-gray-700 font-medium text-sm">Cero asesoría cuando tienes dudas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">❌</span>
                    <span className="text-gray-700 font-medium text-sm">Si te equivocas, el problema es tuyo</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-700 text-sm font-medium text-center">
                    ⚠️ Responsabilidad 100% tuya
                  </p>
                </div>
              </motion.div>

              {/* Card Mobile 3 - Contadoor (Destacada) */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring", damping: 20 }}
                className="relative flex-shrink-0 w-72 rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 text-white p-6 shadow-2xl ring-2 ring-primary-300 snap-center"
                data-gtm="compare_card_contadoor"
              >
                {/* Badge RECOMENDADO */}
                <div className="hidden absolute -top-4 left-6 px-3 py-1 rounded-full bg-white text-primary-600 text-xs font-black shadow-lg">
                  ✨ RECOMENDADO ✨
                </div>

                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <h3 className="text-xl font-bold">Contadoor</h3>
                </div>
                <p className="text-sm text-white/90 font-medium mb-4">La solución que sí funciona</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">✅</span>
                    <span className="text-white font-medium text-sm">Equipo completo siempre disponible</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">✅</span>
                    <span className="text-white font-medium text-sm">Tecnología + asesoría humana</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">✅</span>
                    <span className="text-white font-medium text-sm">Prevención antes que problemas</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                  <p className="text-white font-bold text-center text-sm">
                    🏆 Tranquilidad garantizada al 100%
                  </p>
                </div>

                {/* Botón móvil */}
                <Link to="/cotizador">
                  <motion.button
                    whileHover={{ y: -1, scale: 1.02 }}
                    whileActive={{ y: 0, scale: 0.98 }}
                    className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-white text-primary-600 font-black text-base mt-6 transition-all focus:outline-none hover:shadow-[4px_4px_0_#000]"
                    style={{ boxShadow: '2px 2px 0 #000' }}
                    data-gtm="compare_cta_contadoor"
                  >
                    👉 Tranquilidad ahora →
                  </motion.button>
                </Link>
                <p className="text-white/80 text-xs text-center mt-2">
                  ⚡ Solo 5 cupos disponibles este mes
                </p>
              </motion.div>
            </div>

            {/* Indicador de scroll */}
            <div className="flex justify-center mt-4 gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <div className="w-6 h-2 rounded-full bg-primary-600" />
            </div>
          </div>

          {/* Bloque inferior claim optimizado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 rounded-3xl bg-gradient-to-r from-primary-50 to-white p-6 md:p-12 text-center border border-primary-100"
          >
            <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              La diferencia está en los <span className="text-primary-600">resultados reales</span>
            </h4>
            <p className="text-gray-700 text-lg max-w-4xl mx-auto mb-6">
              Con Contadoor no solo cumples obligaciones. <span className="font-semibold text-primary-600">Optimizas tu negocio</span> con información clara, prevención proactiva y un equipo que realmente se preocupa por tu éxito.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>0 multas en 3 años</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Respuesta en 15 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>98% nos recomienda</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ - Preguntas Frecuentes */}
      <LazySection fallback={<div className="h-[600px] bg-gray-50 animate-pulse rounded-lg mx-4" />}>
        <section id="faq" data-section-name="FAQ" className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold ring-1 ring-primary-200 mb-4">
              ❓ PREGUNTAS FRECUENTES
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Resolvemos tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">dudas más comunes</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Más de 500 empresas han hecho estas mismas preguntas. Aquí tienes las respuestas claras.
            </p>

            {/* Badge de urgencia adicional */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              className="mt-6 inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold"
            >
              ⏰ Diagnóstico gratuito solo hasta fin de mes
            </motion.div>
          </motion.div>

          {/* FAQ Items */}
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

          {/* CTA final con urgencia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-primary-50 to-white p-6 rounded-2xl border border-primary-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Tienes otra pregunta? Hablemos directamente
              </h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Agenda una llamada de 15 minutos y te respondemos todo. Sin compromiso, sin costo.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/cotizador">
                  <motion.button
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileActive={{ y: 0, scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-600 text-white font-black text-lg transition-all duration-300 hover:shadow-[6px_6px_0_#000]"
                    style={{ boxShadow: '4px 4px 0 #000' }}
                    data-gtm="faq_cta_primary"
                    aria-label="Agendar llamada gratuita para resolver dudas"
                  >
                    📞 Agendar llamada gratuita →
                  </motion.button>
                </Link>

                <div className="text-center">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-sm text-gray-600 font-medium"
                  >
                    Solo quedan <span className="font-bold text-red-600">5 cupos</span> este mes
                  </motion.p>
                  <p className="text-xs text-gray-500 mt-1">Sin costo, sin compromiso</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </section>
      </LazySection>

      {/* CTA Final - Último empujón para conversión */}
      <section id="cta-final" data-section-name="CTA Final" className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge de urgencia máxima */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full text-sm font-black mb-8 shadow-lg"
            >
              🚨 ATENCIÓN: Solo quedan 5 cupos para este mes
            </motion.div>

            {/* Headline final potente */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
            >
              ¿Listo para dormir tranquilo sabiendo que
              <span className="block text-primary-200">todo está en orden?</span>
            </motion.h2>

            {/* Subheadline emocional */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Únete a las <strong>500+ empresas</strong> que ya transformaron su contabilidad.
              Sin estrés, sin multas, sin sorpresas. Solo resultados.
            </motion.p>

            {/* Stats de impacto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  <AnimatedBenefit end={500} suffix="+" duration={2500} />
                </div>
                <p className="text-white/80">Empresas confían en nosotros</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  <AnimatedBenefit end={0} duration={2000} />
                </div>
                <p className="text-white/80">Multas SII en 3 años</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  <AnimatedBenefit end={98} suffix="%" duration={2200} />
                </div>
                <p className="text-white/80">Nos recomienda</p>
              </div>
            </motion.div>

            {/* CTAs finales potentes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link
                  to="/cotizador"
                  className="block w-full sm:w-auto bg-white text-primary-600 hover:shadow-[6px_6px_0_#000000] transition-all focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 font-black shadow-[4px_4px_0_#000000] py-4 px-8 text-base md:text-lg rounded-lg text-center"
                  data-gtm="final_cta_primary"
                >
                  Cotizar mi plan
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link
                  to="/contacto"
                  className="block w-full sm:w-auto bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-600 transition-all focus:ring-2 focus:ring-white focus:ring-offset-2 font-bold flex items-center gap-2 justify-center py-4 px-8 text-base md:text-lg rounded-lg"
                  data-gtm="final_cta_secondary"
                >
                  <MessageCircle size={18} />
                  Hablar con un asesor
                </Link>
              </motion.div>
            </motion.div>

            {/* Garantía y urgencia final */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-center gap-2 text-primary-200">
                <span className="text-lg">🛡️</span>
                <span className="font-semibold">Garantía de 60 días o te devolvemos el dinero</span>
              </div>
              <p className="text-white/70 text-sm">
                ⏰ <strong className="text-primary-200">Solo 5 cupos disponibles</strong> este mes
              </p>
              <p className="text-white/60 text-xs">
                Sin compromisos a largo plazo • Cancela cuando quieras • Soporte 24/7
              </p>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
}
