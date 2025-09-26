import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, CheckCircle } from 'lucide-react';

const ScrollFlow = ({ children, sectionName, index, isUnlocked, onView, hasBeenViewed, totalSections }) => {
  const [isInView, setIsInView] = useState(false);
  const [viewPercentage, setViewPercentage] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        setViewPercentage(entry.intersectionRatio * 100);
        
        // Unlock next section when current is 70% visible
        if (entry.intersectionRatio > 0.7 && isUnlocked && !hasBeenViewed) {
          onView(index);
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [index, isUnlocked, hasBeenViewed, onView]);

  // Step connector line
  const showConnector = index < totalSections - 1;

  if (!isUnlocked) {
    return (
      <div className="relative">
        <div ref={sectionRef} className="relative min-h-[400px] flex items-center justify-center bg-gray-50/50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4"
            >
              <Lock className="w-8 h-8 text-gray-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Sección {index + 1}: {sectionName}
            </h3>
            <p className="text-sm text-gray-400">
              Sigue explorando para desbloquear
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-4"
            >
              <ChevronDown className="w-6 h-6 text-gray-400 mx-auto" />
            </motion.div>
          </motion.div>

          {/* Blur overlay with pattern */}
          <div className="absolute inset-0 backdrop-blur-md bg-white/70 pointer-events-none">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`
            }} />
          </div>
        </div>

        {/* Connector to next section */}
        {showConnector && (
          <div className="relative h-24 flex justify-center">
            <div className="w-0.5 h-full bg-gray-300" />
            <div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Step indicator */}
      <div className="absolute -left-12 top-0 h-full hidden lg:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 ${
            hasBeenViewed 
              ? 'bg-green-500 text-white' 
              : isInView 
                ? 'text-white' 
                : 'bg-gray-200 text-gray-500'
          }`}
          style={{
            backgroundColor: hasBeenViewed 
              ? undefined 
              : isInView 
                ? '#7A4075' 
                : undefined
          }}
        >
          {hasBeenViewed ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            index + 1
          )}
        </motion.div>
        
        {/* Connecting line */}
        {showConnector && (
          <div className="flex-1 w-0.5 bg-gray-300 relative">
            {hasBeenViewed && (
              <motion.div
                className="absolute top-0 left-0 w-full bg-green-500"
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            )}
          </div>
        )}
      </div>

      <div ref={sectionRef} className="relative">
        <AnimatePresence>
          {isUnlocked && !hasBeenViewed && index > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10"
            >
              <motion.div
                animate={{ 
                  y: [0, 10, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex flex-col items-center"
              >
                <div className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium mb-2 shadow-lg">
                  ¡Sección desbloqueada! Continúa bajando
                </div>
                <ChevronDown className="w-6 h-6 text-primary" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ 
            opacity: isUnlocked ? 1 : 0.3,
            transition: { duration: 0.5 }
          }}
        >
          {children}
        </motion.div>

        {/* Progress indicator for current section - Desktop only */}
        {isUnlocked && isInView && !hasBeenViewed && (
          <motion.div
            className="hidden lg:block fixed bottom-8 right-8 bg-white rounded-2xl shadow-xl p-4 z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                    fill="none"
                  />
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#A05699"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={126}
                    strokeDashoffset={126 - (126 * viewPercentage) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">
                  {Math.round(viewPercentage)}%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-black">
                  {sectionName}
                </p>
                <p className="text-xs text-gray-500">
                  {viewPercentage >= 70 ? 'Completado' : 'Viendo...'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile step indicator */}
      <div className="lg:hidden flex justify-center mt-8 mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
            hasBeenViewed 
              ? 'bg-green-500 text-white' 
              : isInView 
                ? 'text-white' 
                : 'bg-gray-200 text-gray-500'
          }`}
          style={{
            backgroundColor: hasBeenViewed 
              ? undefined 
              : isInView 
                ? '#7A4075' 
                : undefined
          }}
        >
          {hasBeenViewed ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            index + 1
          )}
        </motion.div>
      </div>

      {/* Connector to next section (mobile & desktop) */}
      {showConnector && (
        <div className="relative h-16 flex justify-center lg:hidden">
          <div className={`w-0.5 h-full ${hasBeenViewed ? 'bg-green-500' : 'bg-gray-300'}`} />
        </div>
      )}
    </div>
  );
};

export default ScrollFlow;