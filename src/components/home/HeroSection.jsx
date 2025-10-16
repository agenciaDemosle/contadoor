import { motion } from 'framer-motion';
import { MessageCircle, Bell, FileText, Rocket } from 'lucide-react';
import Container from '../Container';
import Button from '../Button';

export default function HeroSection() {
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
    <section className="relative min-h-[700px] flex items-center overflow-hidden bg-primary-600 text-white py-16 lg:py-24">
      <div className="absolute inset-0 bg-black/10 md:bg-transparent" />
      <Container className="relative z-10 px-6 md:px-4">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideIn}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <motion.div
              variants={bounceIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="hidden md:inline-block mb-6"
            >
              <a
                href="#reseñas"
                className="bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer block group relative"
                data-gtm="hero_badge_trust"
                title="Empresas de todas las industrias en Chile confían en nosotros"
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-block mr-2 text-yellow-400"
                >
                  ⭐
                </motion.span>
                +500 empresas confían en nosotros
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Empresas de todas las industrias en Chile confían en nosotros
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                </div>
              </a>
            </motion.div>

            <motion.div
              variants={bounceIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="hidden md:inline-block mb-6 ml-4"
            >
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200">
                <span className="mr-2">🛡️</span>
                Garantía 60 días o te devolvemos el dinero
              </div>
            </motion.div>

            <motion.h1
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 leading-tight tracking-tight"
              data-gtm="hero_headline"
              role="banner"
            >
              <span className="text-5xl md:text-6xl font-extrabold text-white">
                Ahorra tiempo y evita multas
              </span>
              <br />
              <span className="text-4xl md:text-5xl font-medium text-primary-200">
                Tu negocio <span className="underline decoration-primary-400 decoration-4">al día</span>, siempre.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-6 max-w-[56ch] opacity-90 leading-relaxed"
            >
              Contabilidad, impuestos y laboral en un solo lugar, con un asesor directo que te avisa antes de cada vencimiento.
            </motion.p>

            <div className="mb-8 space-y-3 hidden md:block">
              {[
                { icon: Bell, text: "Te avisamos antes de cada vencimiento", delay: 0.4 },
                { icon: MessageCircle, text: "Habla directo con tu asesor por WhatsApp", delay: 0.5 },
                { icon: FileText, text: "Informe mensual claro (sin letra chica)", delay: 0.6 },
                { icon: Rocket, text: "Onboarding en 48h con traspaso guiado", delay: 0.7 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  className="flex items-start gap-3 text-base opacity-90"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4, delay: item.delay + 0.1, type: "spring" }}
                    className="bg-green-500 p-1.5 rounded-full mt-0.5 flex-shrink-0"
                  >
                    <item.icon size={14} className="text-white" />
                  </motion.div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                  <Button
                    to="/cotizador"
                    className="!bg-white !text-primary-600 hover:shadow-[6px_6px_0_#000000] transition-all focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 font-black shadow-[4px_4px_0_#000000] w-full sm:w-auto"
                    data-gtm="hero_cta_primary"
                    aria-label="Cotizar mi plan de contabilidad"
                  >
                    Cotizar mi plan
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                  <Button
                    to="/contacto"
                    className="!bg-transparent !text-white border-2 border-white hover:!bg-white hover:!text-primary-600 transition-all focus:ring-2 focus:ring-white focus:ring-offset-2 font-bold flex items-center gap-2 justify-center w-full sm:w-auto"
                    data-gtm="hero_cta_secondary"
                    aria-label="Hablar con un asesor ahora"
                  >
                    <MessageCircle size={18} />
                    Hablar con un asesor
                  </Button>
                </motion.div>
              </div>
              <div className="space-y-1">
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                  className="text-xs text-yellow-300 font-semibold bg-yellow-500/20 px-3 py-1 rounded-full inline-block border border-yellow-400/30"
                >
                  ⚡ Solo 8 cupos disponibles este mes
                </motion.p>
                <p className="text-xs text-white/70">
                  Respuesta en &lt;15 min hábiles.
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-xs text-white/60"
                >
                  100% gratis, sin compromiso.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileInView={{ y: [-5, 5, -5] }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.15,
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative hidden lg:block"
            data-gtm="hero_image"
          >
            <div className="absolute inset-0 bg-white/60 rounded-2xl transform rotate-6 scale-105 h-[520px] w-[400px]" />
            <img
              src="/images/hero.jpg"
              alt="Equipo profesional de Contadoor trabajando"
              className="rounded-2xl shadow-xl shadow-primary-900/20 relative z-10 object-cover h-[520px] w-[400px] object-top"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}