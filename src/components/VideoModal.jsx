import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes } from 'react-icons/fa';

export default function VideoModal({ isOpen, onClose, onVideoEnd, videoSrc = '/test.mp4' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Auto-play cuando se abre el modal
      setTimeout(() => {
        videoRef.current.play();
        setIsPlaying(true);
      }, 500);
    }
  }, [isOpen]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleVideoEnd = () => {
    setHasEnded(true);
    setIsPlaying(false);
    // Esperar un momento antes de ejecutar la acción
    setTimeout(() => {
      onVideoEnd();
    }, 1500);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkip = () => {
    if (progress > 80) { // Solo permitir skip después del 80% del video
      onVideoEnd();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && progress > 80 && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl my-8"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-6">
              <div className="flex justify-between items-start">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-1">
                    Conoce cómo transformamos tu contabilidad
                  </h3>
                  <p className="text-white/80 text-sm">
                    2 minutos que cambiarán tu perspectiva
                  </p>
                </div>
                {progress > 80 && (
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors p-2"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                )}
              </div>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
                onClick={handlePlayPause}
              />

              {/* Play/Pause Overlay */}
              {!isPlaying && !hasEnded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                  onClick={handlePlayPause}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <FaPlay className="text-3xl text-primary-600 ml-1" />
                  </motion.button>
                </motion.div>
              )}

              {/* Video Ended State */}
              {hasEnded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-600/90 to-[#65276B]/90"
                >
                  <div className="text-center text-white p-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <h4 className="text-2xl font-bold mb-2">Perfecto, ahora agendemos tu reunión</h4>
                    <p className="text-white/80">Redirigiendo en un momento...</p>
                  </div>
                </motion.div>
              )}

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <motion.div
                  className="h-full bg-primary-600"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-br from-primary-600 to-[#65276B] p-6">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <p className="font-semibold">Después del video podrás:</p>
                  <p className="text-sm text-white/80">Agendar una reunión personalizada con nuestros asesores</p>
                </div>
                {progress > 80 && !hasEnded && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSkip}
                    className="bg-white text-primary-600 px-6 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors"
                  >
                    Continuar a agendar
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}