import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ClipboardCheck, Target, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getLocal, setLocal } from '../../lib/storage';
import { analytics } from '../../lib/analytics';
import { trackButtonClick, trackEngagement } from '../../lib/gtm';

const checklistItems = [
  {
    id: 1,
    text: 'Tener a mano tus claves y accesos al portal del SII y Previred (si aplica).',
    icon: '🔐',
    tip: 'Asegúrate de tener acceso a tus portales'
  },
  {
    id: 2,
    text: 'Identificar los 3 principales problemas en la gestión de tus procesos contables.',
    icon: '🎯',
    tip: 'Piensa en lo que más te complica hoy'
  },
  {
    id: 3,
    text: 'Preparar preguntas sobre tu situación actual.',
    icon: '💭',
    tip: 'Anota todas tus dudas'
  },
  {
    id: 4,
    text: 'Tener claro tu objetivo dentro del mediano plazo (6 meses).',
    icon: '📈',
    tip: 'Define hacia dónde quieres llegar'
  }
];

const Checklist = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [hasCompletedBefore, setHasCompletedBefore] = useState(false);

  useEffect(() => {
    const saved = getLocal('checklistItems', {});
    setCheckedItems(saved);
    setHasCompletedBefore(Object.keys(saved).length === checklistItems.length);
  }, []);

  const handleCheck = (itemId) => {
    const newCheckedItems = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId]
    };

    setCheckedItems(newCheckedItems);
    setLocal('checklistItems', newCheckedItems);

    const completedCount = Object.values(newCheckedItems).filter(Boolean).length;
    const itemText = checklistItems.find(item => item.id === itemId)?.text;

    // Track individual item check/uncheck
    trackButtonClick(
      newCheckedItems[itemId] ? 'checklist_item_check' : 'checklist_item_uncheck',
      'preparation_checklist',
      {
        item_id: itemId,
        item_text: itemText,
        total_completed: completedCount,
        completion_percentage: Math.round((completedCount / checklistItems.length) * 100)
      }
    );

    if (completedCount === checklistItems.length && !hasCompletedBefore) {
      setHasCompletedBefore(true);
      analytics.checklistComplete(checklistItems.length);

      // Track checklist completion
      trackEngagement('checklist_complete', {
        total_items: checklistItems.length,
        page: 'primera_asesoria'
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A0569A', '#7A4075', '#C084BA', '#ffffff']
      });
    }
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = (completedCount / checklistItems.length) * 100;

  return (
    <section className="relative overflow-hidden">
      <div 
        className="w-full py-20"
        style={{ 
          background: 'linear-gradient(135deg, #A967A3 0%, #7A4075 100%)'
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`bg-element-${i}`}
              className="absolute w-32 h-32 bg-white/5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            {/* Header Section */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6 border border-white/30"
              >
                <ClipboardCheck className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Preparación para la reunión</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-4xl font-display font-bold text-white mb-4 px-2"
              >
                ¿Estás preparado para la reunión?
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/90 text-base md:text-lg max-w-2xl mx-auto px-2"
              >
                Completa este checklist para asegurar que aprovechemos al máximo nuestro tiempo juntos
              </motion.p>
            </div>
            {/* Progress Bar */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Target className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="text-white font-medium text-lg">
                    {completedCount} de {checklistItems.length} completados
                  </span>
                </div>
                <motion.span 
                  className="text-2xl font-bold text-white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(90deg, #A0569A 0%, #7A4075 100%)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-50"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
                    }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Checklist Items Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8 items-stretch">
              {checklistItems.map((item, idx) => (
                <motion.label
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative cursor-pointer h-full"
                >
                  <input
                    type="checkbox"
                    checked={checkedItems[item.id] || false}
                    onChange={() => handleCheck(item.id)}
                    className="sr-only"
                  />
                  <div className={`p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 h-full min-h-[140px] flex flex-col ${
                    checkedItems[item.id]
                      ? 'bg-white/20 border-primary shadow-lg'
                      : 'bg-white/10 border-white/30 hover:bg-white/15 hover:border-white/50'
                  }`}>
                    <div className="flex items-start gap-4 h-full">
                      {/* Icon */}
                      <motion.div
                        className="text-2xl md:text-3xl flex-shrink-0"
                        animate={checkedItems[item.id] ? { rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-semibold text-white transition-all ${
                            checkedItems[item.id] ? 'line-through opacity-70' : ''
                          }`}>
                            Paso {item.id}
                          </h3>
                          <div className="relative flex items-center justify-center w-7 h-7">
                            <div
                              className={`w-7 h-7 rounded-lg border-2 transition-all ${
                                checkedItems[item.id]
                                  ? 'bg-primary border-primary'
                                  : 'bg-white/10 border-white/40'
                              }`}
                            />
                            <AnimatePresence>
                              {checkedItems[item.id] && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  exit={{ scale: 0, rotate: 180 }}
                                  transition={{ type: "spring", stiffness: 200 }}
                                  className="absolute"
                                >
                                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        <p className={`text-white/90 text-xs md:text-sm mb-2 transition-all pr-2 flex-1 ${
                          checkedItems[item.id] ? 'line-through opacity-60' : ''
                        }`}>
                          {item.text}
                        </p>
                        <p className="text-white/60 text-xs italic mt-auto">
                          💡 {item.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.label>
              ))}
            </div>

            {/* Completion Message */}
            <AnimatePresence>
              {completedCount === checklistItems.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gradient-to-r from-gray-400/20 to-gray-600/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 md:p-8 text-center"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 0.5 }}
                    className="inline-block mb-4"
                  >
                    <Sparkles className="w-12 h-12 text-primary" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    ¡Excelente! Estás 100% preparado
                  </h3>
                  <p className="text-white/90 text-base md:text-lg">
                    Has completado todos los pasos. Nuestra reunión será productiva y clara.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Checklist;