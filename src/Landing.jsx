import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Play,
  Clock,
  Users,
  TrendingUp,
  Shield,
  MessageSquare,
  ArrowRight,
  Phone,
  ChevronDown,
  Target,
  Search,
  Lightbulb,
  FileCheck,
  AlertCircle,
  Calculator,
  Zap,
  HelpCircle,
  FileText
} from 'lucide-react';

const Landing = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRefs = useRef([]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToCalendar = () => {
    document.getElementById('calendario-section').scrollIntoView({ behavior: 'smooth' });
  };

  // Mouse parallax effect - only on desktop
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      const handleMouseMove = (e) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);


  // Intersection Observer for animations
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { 
        threshold: isMobile ? 0.05 : 0.1, // Lower threshold for mobile
        rootMargin: isMobile ? '50px' : '0px' // Earlier trigger on mobile
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const faqs = [
    {
      question: "¿Qué es Contadoor?",
      answer: "Asesoría contable y tributaria especializada para pymes."
    },
    {
      question: "¿Qué voy a conseguir en esta llamada?",
      answer: "Claridad sobre tu situación y conocer si podemos ayudarte."
    },
    {
      question: "¿Quién se reunirá conmigo?",
      answer: "Nuestro contador Líder, Luciano"
    },
    {
      question: "¿Tiene algún costo esta llamada?",
      answer: "No, es gratuita."
    },
    {
      question: "¿Qué pasa después de la llamada?",
      answer: "Si tus objetivos se alinean a nuestra forma de trabajar avanzamos con un plan de acción."
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - Ultra Modern 2025 */}
      <section 
        id="hero"
        ref={el => sectionRefs.current[0] = el}
        className={`relative px-4 py-20 lg:py-32 overflow-hidden transition-all duration-1000 ${
          visibleSections.has('hero') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Animated background elements with parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
          ></div>
          <div 
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`, animationDelay: '1s' }}
          ></div>
          {/* Floating particles - visible on all devices */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 md:w-3 md:h-3 bg-white/30 rounded-full animate-float"
              style={{
                left: `${30 + (i * 20)}%`,
                top: `${20 + (i * 15)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            {/* Animated badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 transition-all duration-700 ${
              visibleSections.has('hero') ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}>
              <Calculator className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">Consultoría 100% Gratuita</span>
            </div>

            <h1 className={`mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl transition-all duration-700 delay-100 ${
              visibleSections.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Tu empresa merece tranquilidad, somos la{' '}
              <span className="relative">
                <span className="text-white font-bold">
                  Puerta a tu solución!
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-white rounded-full"></span>
              </span>
              {'  '}🚀
            </h1>
            
            <p className={`mx-auto mb-10 max-w-3xl text-xl text-white/90 transition-all duration-700 delay-200 ${
              visibleSections.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Sigue estos pasos para que tengamos una reunión inicial perfecta!
              <br />
              <span className="text-lg font-medium">(no te saltes ninguno de ellos)</span>
            </p>

            <div className={`flex flex-col items-center gap-6 transition-all duration-700 delay-300 ${
              visibleSections.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <button 
                onClick={scrollToCalendar}
                className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#8A3F83] shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,255,255,0.3)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#9D9D9C]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative flex items-center gap-2">
                  Agendar consultoría gratuita
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </span>
              </button>
              
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
                {[
                  { icon: Shield, text: '100% Confidencial', color: 'text-white/80' },
                  { icon: Users, text: '+200 Empresas Activas', color: 'text-white/80' },
                  { icon: Zap, text: '4.9/5 Satisfacción', color: 'text-white' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 opacity-0 animate-fadeIn" style={{ animationDelay: `${400 + i * 100}ms` }}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-white/90 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - Modern Style */}
      <section 
        id="video"
        ref={el => sectionRefs.current[1] = el}
        className={`relative px-4 py-20 transition-all duration-1000 ${
          visibleSections.has('video') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className={`mb-4 inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 transition-all duration-700 ${
              visibleSections.has('video') ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
              <span className="text-sm font-bold text-white">PASO 1</span>
            </div>
            <h2 className={`mb-4 text-3xl font-bold text-white sm:text-4xl transition-all duration-700 delay-100 ${
              visibleSections.has('video') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Video de Bienvenida
            </h2>
            <p className={`mb-10 text-lg text-white/80 transition-all duration-700 delay-200 ${
              visibleSections.has('video') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Mira este video antes de agendar tu llamada. Dura solo 2 minutos 
              y te dará claridad sobre cómo funciona Contadoor
            </p>
          </div>
          
          <div className={`relative transition-all duration-700 delay-300 ${
            visibleSections.has('video') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Mobile: Reels format (9:16) */}
            <div className="md:hidden flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-1">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/rrMm5nfrEeU"
                      title="Video de Bienvenida Contadoor"
                      className="absolute inset-0 w-full h-full rounded-xl"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    >
                    </iframe>
                    {/* Mobile overlay badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full">
                        <Play className="h-3 w-3 text-white" />
                        <span className="text-xs font-medium text-white">Video</span>
                      </div>
                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full">
                        <Clock className="h-3 w-3 text-white" />
                        <span className="text-xs font-medium text-white">2 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Horizontal format (16:9) */}
            <div className="hidden md:block">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-2">
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/rrMm5nfrEeU"
                    title="Video de Bienvenida Contadoor"
                    className="w-full h-full rounded-2xl"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  >
                  </iframe>
                </div>
                {/* Desktop video badge */}
                <div className="absolute top-6 right-6 flex items-center gap-2 bg-purple-900/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                  <Clock className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">Video Explicativo</span>
                </div>
              </div>
            </div>
            
            {/* Additional video context - Stack on mobile */}
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 text-sm">
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Play className="h-4 w-4 text-white" />
                <span className="text-white/90 text-xs sm:text-sm">Dale play para conocernos</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Users className="h-4 w-4 text-white" />
                <span className="text-white/90 text-xs sm:text-sm">Conoce a Luciano, nuestro CEO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Already Modern */}
      <section 
        id="benefits"
        ref={el => sectionRefs.current[2] = el}
        className="relative px-4 py-20 overflow-hidden"
      >
        {/* Keep existing benefits section as is - it's already modern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className={`mb-4 inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 transition-all duration-700 ${
              visibleSections.has('benefits') ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
              <span className="text-sm font-bold text-white">PASO 2</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              ¿Qué veremos en la reunión?
            </h2>
            <p className="text-lg text-white/80">Descubre todo lo que lograremos juntos en solo 45 minutos</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {[
              {
                icon: Users,
                title: "Te conoceremos a ti y a tu empresa",
                iconBg: "bg-white",
                delay: "0"
              },
              {
                icon: Search,
                title: "Revisaremos tus principales cuellos de botella; contables, tributarios o de gestión laboral",
                iconBg: "bg-white/90",
                delay: "100"
              },
              {
                icon: TrendingUp,
                title: "Te mostraremos cómo funciona el Modelo Contadoor",
                iconBg: "bg-white/80",
                delay: "200"
              },
              {
                icon: Target,
                title: "Al final, sabrás si realmente podemos ayudarte o no",
                iconBg: "bg-white/70",
                delay: "300"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              const isVisible = visibleSections.has('benefits');
              return (
                <div
                  key={index}
                  className={`group relative transform transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${item.delay}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8A3F83]/5 to-transparent rounded-2xl transform transition-all duration-300 group-hover:scale-105"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 hover:bg-white/15">
                    <div className={`inline-flex p-3 rounded-xl ${item.iconBg} mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="h-8 w-8 text-[#8A3F83]" />
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className={`h-6 w-6 text-[#10B981] flex-shrink-0 mt-1 transform transition-all duration-300 ${
                        isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                      }`} />
                      <p className="text-white font-medium leading-relaxed">
                        {item.title}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 text-6xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-300">
                      {index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

{/* Filtros de Agendamiento Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="mb-4 inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2">
              <span className="text-sm font-bold text-white">PASO 3</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              FILTROS DE AGENDAMIENTO
            </h2>
            <p className="text-xl text-white/80">
              Importante: Lee esto antes de agendar tu reunión
            </p>
          </div>

          {/* Filtros Container */}
          <div className="bg-gradient-to-br from-[#9A4F93] to-[#7A3F73] rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <div className="space-y-8">
              {/* Condiciones positivas */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white text-lg leading-relaxed">
                      <span className="font-bold">Solo agenda si eres dueño de una empresa</span> que quiere ganar tranquilidad y tener la confianza que los procesos contables se están ejecutando de forma correcta.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white text-lg leading-relaxed">
                      <span className="font-bold">Solo trabajamos con empresas serias y profesionales.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/20"></div>

              {/* Condiciones negativas */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <XCircle className="h-8 w-8 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white text-lg leading-relaxed">
                      <span className="font-bold">No trabajamos con dueños de empresas</span> que buscan actuar sobre las normativas legales y lo que los organismos reguladores regulan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <XCircle className="h-8 w-8 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white text-lg leading-relaxed">
                      <span className="font-bold">No trabajamos con personas</span> que buscan evadir obligaciones con sus trabajadores.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nota destacada */}
            <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-yellow-400" />
                </div>
                <p className="text-white/90 text-sm md:text-base">
                  <span className="font-bold">📌 Importante:</span> Al agendar tu reunión, confirmas que cumples con estos criterios y buscas una relación profesional de largo plazo con Contadoor.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <button 
              onClick={() => document.getElementById('calendario-section').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#8A3F83] rounded-full font-bold text-lg shadow-2xl transition-all hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,255,255,0.3)]"
            >
              Cumplo con los criterios, quiero agendar
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Calendar Section - Square Format */}
      <section 
        id="calendario-section"
        ref={el => sectionRefs.current[3] = el}
        className={`px-4 py-20 transition-all duration-1000 ${
          visibleSections.has('calendario-section') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className={`mb-4 inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 transition-all duration-700 ${
              visibleSections.has('calendario-section') ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
              <span className="text-sm font-bold text-white">PASO 4</span>
            </div>
            <h2 className={`mb-4 text-3xl font-bold text-white sm:text-4xl transition-all duration-700 delay-100 ${
              visibleSections.has('calendario-section') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Calendario de Agendamiento
            </h2>
            <p className={`text-lg text-white/80 transition-all duration-700 delay-200 ${
              visibleSections.has('calendario-section') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Selecciona el día y hora que más te acomode. Se mostrará en TU hora local.
            </p>
          </div>
          
          <div className={`bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-3xl shadow-2xl border border-white/20 transition-all duration-700 delay-300 ${
            visibleSections.has('calendario-section') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative bg-white rounded-2xl overflow-hidden aspect-square md:aspect-[4/3] lg:aspect-square">
              <iframe
                src="https://outlook.office.com/book/Contadoor@contadoor.cl/s/328-yS0DYEm9h2tm4lDIHQ2?ismsaljsauthenabled=true"
                className="absolute inset-0 w-full h-full border-0"
                title="Agenda tu cita con Contadoor"
                loading="lazy"
                style={{ backgroundColor: 'white' }}
              />
            </div>
            <div className="mt-6 bg-white/10 backdrop-blur-sm p-6 text-center rounded-2xl">
              <p className="text-white font-medium mb-3">
                Si no encuentras horario disponible, contáctanos por WhatsApp aquí 👉
              </p>
              <a 
                href="https://wa.me/56912345678" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#8A3F83] rounded-full font-semibold transition-all hover:bg-white/90 hover:scale-105 hover:shadow-lg"
              >
                <MessageSquare className="h-5 w-5" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section - Modern Update */}
      <section 
        id="faqs"
        ref={el => sectionRefs.current[4] = el}
        className={`bg-transparent px-4 py-20 transition-all duration-1000 ${
          visibleSections.has('faqs') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center mb-4 transition-all duration-700 ${
              visibleSections.has('faqs') ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
              <HelpCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className={`text-3xl font-bold text-white sm:text-4xl transition-all duration-700 ${
              visibleSections.has('faqs') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Preguntas frecuentes
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:border-white/40 hover:shadow-lg duration-700 ${
                  visibleSections.has('faqs') ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
                >
                  <span className="font-semibold text-white text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-white transition-all duration-300 ${
                      openFaq === index ? 'rotate-180 scale-110' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openFaq === index ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <div className="border-t border-white/10 bg-white/5 p-6">
                    <p className="text-white/90 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Section - Ultra Modern */}
      <section 
        id="cta"
        ref={el => sectionRefs.current[5] = el}
        className={`relative bg-gradient-to-br from-[#8A3F83] via-[#8A3F83]/90 to-[#8A3F83] px-4 py-24 overflow-hidden transition-all duration-1000 ${
          visibleSections.has('cta') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), 
                             radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'drift 20s infinite linear'
          }}></div>
        </div>
        
        {/* Floating elements */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"
            style={{
              left: `${30 * i}%`,
              top: `${20 * (i + 1)}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${10 + i * 2}s`
            }}
          ></div>
        ))}

        <div className="relative mx-auto max-w-4xl text-center">
          <div className={`mb-6 transition-all duration-700 ${
            visibleSections.has('cta') ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}>
            <FileText className="h-16 w-16 text-white/80 mx-auto" />
          </div>
          
          <h2 className={`mb-6 text-4xl font-bold text-white sm:text-5xl transition-all duration-700 delay-100 ${
            visibleSections.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            🚀 Da el primer paso hacia la tranquilidad y gana tiempo para ti y tu familia
          </h2>
          
          <p className={`mb-10 text-xl text-white/90 transition-all duration-700 delay-200 ${
            visibleSections.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Agenda tu llamada gratuita hoy. Nuestro equipo te guiará en cada paso.
          </p>
          
          <button 
            onClick={scrollToCalendar}
            className={`group relative overflow-hidden rounded-full bg-white px-10 py-5 text-lg font-bold text-[#8A3F83] shadow-2xl transition-all duration-700 delay-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,255,255,0.3)] ${
              visibleSections.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#10B981]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span className="relative flex items-center gap-3">
              📅 Agendar mi llamada con Contadoor
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
            </span>
          </button>
          
          {/* Trust badges */}
          <div className={`mt-12 flex flex-wrap justify-center gap-8 transition-all duration-700 delay-400 ${
            visibleSections.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {[
              { number: '+200', text: 'Empresas Activas' },
              { number: '10K+', text: 'Horas Ahorradas' },
              { number: '99%', text: 'Satisfacción' }
            ].map((stat, i) => (
              <div key={i} className="text-white">
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-50 animate-fadeIn">
        <a 
          href="https://wa.me/56912345678"
          className="group flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981] text-white shadow-2xl transition-all hover:scale-110 hover:shadow-[0_20px_40px_rgba(16,185,129,0.4)]"
        >
          <MessageSquare className="h-7 w-7" />
          <span className="absolute -top-12 right-0 bg-purple-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            ¿Necesitas ayuda?
          </span>
        </a>
      </div>
    </div>
  );
};

export default Landing;