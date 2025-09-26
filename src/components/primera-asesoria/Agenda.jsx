import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, FileSearch, Briefcase, CheckCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';

const agendaItems = [
  {
    icon: Users,
    title: 'Te conoceremos a ti y a tu empresa',
    description: 'Entenderemos tu modelo de negocio y objetivos.',
    id: 'agenda-1'
  },
  {
    icon: FileSearch,
    title: 'Revisaremos tus principales cuellos de botella',
    description: 'Identificaremos problemas contables, tributarios o de gestión laboral.',
    id: 'agenda-2'
  },
  {
    icon: Briefcase,
    title: 'Te mostraremos cómo funciona el Modelo Contadoor',
    description: 'Conocerás nuestra metodología y cómo puede beneficiarte.',
    id: 'agenda-3'
  },
  {
    icon: CheckCircle,
    title: 'Al final, sabrás si realmente podemos ayudarte o no',
    description: 'Con transparencia total, evaluaremos si somos el partner adecuado.',
    id: 'agenda-4'
  }
];

const Agenda = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  return (
    <section 
      className="relative overflow-hidden" 
      style={{ backgroundColor: '#7A4075' }}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
          y: backgroundY
        }}
      />
      
      
      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 60
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-4 shadow-lg border border-white/30"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </motion.div>
              <span className="text-white">Tu reunión con</span>
              <motion.span 
                className="bg-white text-[#7A4075] px-2 py-0.5 rounded font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Contadoor
              </motion.span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl md:text-3xl font-display font-bold text-white mb-4"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="inline-block"
              >
                🔎
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                ¿Qué veremos juntos?
              </motion.span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-white/90 text-base md:text-lg"
            >
              Nuestra reunión está diseñada para aportarte valor desde el primer minuto.
            </motion.p>
          </div>

          {/* Agenda Items with Journey Path */}
          <div className="relative">
            {/* Progress line background (desktop) */}
            <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-white/10" />
            
            {/* Animated progress line (desktop) */}
            <motion.div
              className="hidden md:block absolute left-8 top-8 w-0.5 bg-gradient-to-b from-yellow-300 to-white/50"
              initial={{ height: 0 }}
              whileInView={{ height: "calc(100% - 4rem)" }}
              viewport={{ once: true }}
              transition={{ 
                duration: 3,
                delay: 0.8,
                ease: "easeInOut"
              }}
            />
            
            {agendaItems.map((item, index) => (
              <div key={item.id} className="relative">
                <motion.div
                  id={item.id}
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    delay: index * 0.8,
                    duration: 1.2,
                    type: "spring",
                    stiffness: 40
                  }}
                  className="relative"
                >
                  <div className="flex items-center gap-4">
                    {/* Step Number Circle */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.8 + 0.4,
                        duration: 1,
                        type: "spring",
                        stiffness: 80,
                        damping: 25
                      }}
                      className="relative z-10 flex-shrink-0"
                    >
                      <motion.div 
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg relative"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {/* Pulsing ring effect */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-white/40"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: index * 0.4
                          }}
                        />
                        <span className="text-[#7A4075] font-bold text-xl relative z-10">{index + 1}</span>
                      </motion.div>
                    </motion.div>

                    {/* Content Card */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        x: 10,
                        transition: { duration: 0.4 }
                      }}
                      onHoverStart={() => setHoveredCard(index)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="flex-1 flex gap-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/15 transition-all duration-300 group border border-white/20 relative overflow-hidden"
                    >
                      {/* Animated gradient background on hover */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                        }}
                      />
                      
                      {/* Shimmer effect */}
                      {hoveredCard === index && (
                        <motion.div
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
                          }}
                          animate={{
                            x: ['-100%', '200%']
                          }}
                          transition={{
                            duration: 1,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      
                      <div className="flex-shrink-0 relative z-10">
                        <motion.div 
                          animate={hoveredCard === index ? { rotate: 360 } : {}}
                          transition={{ duration: 1.2 }}
                          className="w-12 h-12 bg-white/20 backdrop-blur rounded-full border-2 border-white/40 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300"
                        >
                          <item.icon className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                      <div className="flex-1 relative z-10">
                        <motion.h3 
                          className="text-base md:text-lg font-semibold text-white mb-1"
                          animate={hoveredCard === index ? { x: [0, 5, 0] } : {}}
                          transition={{ duration: 0.6 }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p 
                          className="text-white/80"
                          initial={{ opacity: 0.8 }}
                          animate={hoveredCard === index ? { opacity: 1 } : { opacity: 0.8 }}
                        >
                          {item.description}
                        </motion.p>
                      </div>
                    </motion.div>

                  </div>
                </motion.div>

                {/* Spacing between items on mobile */}
                {index < agendaItems.length - 1 && (
                  <div className="md:hidden h-6" />
                )}

                {/* Spacing between items on desktop */}
                {index < agendaItems.length - 1 && (
                  <div className="hidden md:block h-6" />
                )}
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Agenda;