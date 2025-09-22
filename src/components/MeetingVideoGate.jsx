import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Calendar } from 'lucide-react';

// Helper para dataLayer
const dl = (event) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event);
  }
};

export default function MeetingVideoGate({
  open = false,
  onClose = () => {},
  src = '',
  poster = '',
  schedulerUrl = '',
  title = 'Conoce cómo transformamos tu contabilidad',
  subtitle = '2 minutos que cambiarán tu perspectiva',
  unlockAt = 0.6,
  rememberKey = 'meeting_video_unlocked_v1'
}) {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [milestones, setMilestones] = useState(new Set());
  const [showCTA, setShowCTA] = useState(false);

  // Verificar si ya está desbloqueado al abrir
  useEffect(() => {
    if (open) {
      const alreadyUnlocked = localStorage.getItem(rememberKey) === '1';
      const instantUnlock = unlockAt === 0;

      if (alreadyUnlocked || instantUnlock) {
        setIsUnlocked(true);
        setShowCTA(true);
        if (instantUnlock) {
          dl({ event: 'meet_video_unlocked', threshold: 0 });
        }
      }

      // Track modal open
      dl({ event: 'meet_video_open' });
    }
  }, [open, unlockAt, rememberKey]);

  // Manejar visibilidad de página (pausar en background)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (videoRef.current && document.visibilityState === 'hidden') {
        videoRef.current.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;
    const duration = video.duration;

    if (duration > 0) {
      const currentProgress = currentTime / duration;
      setProgress(currentProgress);

      // Solo desbloquear cuando se alcance el % requerido
      if (currentProgress >= unlockAt && !isUnlocked) {
        setIsUnlocked(true);
        setShowCTA(true);
        localStorage.setItem(rememberKey, '1');
        dl({ event: 'meet_video_unlocked', threshold: unlockAt });
      }

      // Milestones para GTM
      [0.25, 0.5, 0.75, 1.0].forEach(milestone => {
        if (currentProgress >= milestone && !milestones.has(milestone)) {
          setMilestones(prev => new Set([...prev, milestone]));
          dl({ event: 'meet_video_progress', progress: milestone });
        }
      });
    }
  };

  const handlePlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
  };

  const handleClose = () => {
    dl({ event: 'meet_video_close' });
    onClose();
  };

  const handleScheduleClick = () => {
    dl({ event: 'meet_schedule_click', href: schedulerUrl });
    window.open(schedulerUrl, '_blank', 'noopener,noreferrer');
  };

  const progressPercentage = Math.round(progress * 100);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-black/70 backdrop-blur flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          className="max-w-2xl md:max-w-4xl w-full mx-auto bg-[#121212] text-white rounded-3xl shadow-2xl overflow-hidden relative"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center transition-colors"
            aria-label="Cerrar video"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video container with header overlay */}
          <div className="relative">
            {/* Header overlay */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
                {title}
              </h2>
              <p className="text-white/70 text-lg">
                {subtitle}
              </p>
            </div>

            {/* Video player */}
            <div className="relative aspect-[9/16] md:aspect-[4/5] lg:aspect-video max-h-[70vh]">
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-contain bg-black"
                controls
                preload="metadata"
                controlsList="nodownload noplaybackrate"
                onTimeUpdate={handleTimeUpdate}
                onPlay={handlePlay}
                onLoadedData={() => {
                  // Focus trap simple
                  if (videoRef.current) {
                    videoRef.current.focus();
                  }
                }}
              >
                Tu navegador no soporta el elemento video.
              </video>
            </div>
          </div>

          {/* Bottom badge with CTA */}
          <div className="bg-gradient-to-r from-[#8A3F83] to-[#6F326A] text-white p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="font-bold text-lg mb-1">Después del video podrás:</p>
                <p className="text-white/90">Agendar una reunión personalizada con nuestros asesores</p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-3">
                <AnimatePresence mode="wait">
                  {!isUnlocked ? (
                    <motion.div
                      key="locked"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="bg-white/20 text-white/70 px-4 py-2 rounded-full text-sm font-medium">
                        Mira el video para desbloquear
                      </div>
                      <div className="text-sm text-white/60">
                        Progreso: {progressPercentage}%
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="unlocked"
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                      onClick={handleScheduleClick}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#8A3F83] rounded-xl font-bold text-lg shadow-[0_8px_0_rgba(255,255,255,0.2)] hover:translate-y-[-2px] hover:shadow-[0_10px_0_rgba(255,255,255,0.2)] active:translate-y-0 active:shadow-[0_6px_0_rgba(255,255,255,0.2)] transition-all duration-200"
                    >
                      <Calendar className="w-5 h-5" />
                      Agendar reunión ahora
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}