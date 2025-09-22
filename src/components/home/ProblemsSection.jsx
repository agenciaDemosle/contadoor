import { motion } from 'framer-motion';

export default function ProblemsSection() {
  return (
    <section className="bg-[#F7F9FB] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16 pt-6 overflow-visible">
          {/* Card 1 - Contador fantasma */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="rounded-3xl bg-white border border-gray-200 shadow-[0_10px_30px_rgba(17,24,39,0.06)] p-6 md:p-8 relative hover:shadow-xl hover:shadow-primary-200/30 transition-all duration-300 mt-6 cursor-pointer"
            data-gtm="pain_point_1"
          >
            <div className="absolute -top-4 right-6 md:right-10 w-9 h-9 rounded-full grid place-items-center bg-primary-600 text-white font-semibold">
              1
            </div>
            <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
              <span className="text-xl">⏱️</span>
            </div>
            <h3 className="text-xl font-semibold mt-3 text-gray-900">Contador fantasma</h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Solo aparece a fin de mes para cobrar, pero nunca cuando lo necesitas.
            </p>
            <div className="mt-6 mb-3 h-px bg-gray-200"></div>
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
            className="rounded-3xl bg-primary-600 shadow-[0_12px_35px_rgba(17,24,39,0.08)] p-6 md:p-8 relative hover:shadow-2xl hover:shadow-primary-200/40 transition-all duration-300 mt-6 md:scale-105 cursor-pointer"
            data-gtm="pain_point_2"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 left-6 md:left-10 px-3 py-1 rounded-full bg-white text-primary-600 text-xs font-semibold shadow flex items-center gap-1"
            >
              🔥 MÁS COMÚN
            </motion.div>
            <div className="absolute -top-4 right-6 md:right-10 w-9 h-9 rounded-full grid place-items-center bg-white text-primary-600 font-semibold">
              2
            </div>
            <div className="bg-white/20 p-3 rounded-full w-fit mb-4">
              <span className="text-xl text-white">💸</span>
            </div>
            <h3 className="text-xl font-semibold mt-3 text-white">Multas por atrasos</h3>
            <p className="text-white/90 mt-2 leading-relaxed">
              Cada mes es una lotería: ¿llegaré a tiempo? ¿Habré olvidado algo importante?
            </p>
            <div className="mt-6 mb-3 h-px bg-white/30"></div>
            <div className="flex items-center justify-between">
              <span className="text-white font-medium text-sm">Muy alto impacto</span>
              <div className="flex gap-1">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-white"
                >
                  ●●●●
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Estrés */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="rounded-3xl bg-white border border-gray-200 shadow-[0_10px_30px_rgba(17,24,39,0.06)] p-6 md:p-8 relative hover:shadow-xl hover:shadow-primary-200/30 transition-all duration-300 mt-6 cursor-pointer"
            data-gtm="pain_point_3"
          >
            <div className="absolute -top-4 right-6 md:right-10 w-9 h-9 rounded-full grid place-items-center bg-primary-600 text-white font-semibold">
              3
            </div>
            <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
              <span className="text-xl">😰</span>
            </div>
            <h3 className="text-xl font-semibold mt-3 text-gray-900">Estrés constante</h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Nunca sabes si estás al día. Vives con la ansiedad de que llegue una carta del SII.
            </p>
            <div className="mt-6 mb-3 h-px bg-gray-200"></div>
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
        </div>
      </div>
    </section>
  );
}