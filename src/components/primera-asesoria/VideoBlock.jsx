import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef } from 'react';

const VideoBlock = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="pt-12 md:pt-16 bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <div 
          className="w-full shadow-xl"
          style={{ backgroundColor: '#A967A3' }}
        >
          <div className="container mx-auto px-4 py-8 md:py-12">
              <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                {/* Text Content - Left side on desktop, top on mobile */}
                <div className="text-center md:text-left order-2 md:order-1">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur border border-white/30 rounded-full text-sm mb-4"
                  >
                    <Play className="w-4 h-4 text-white" />
                    <span className="text-white">▶️ Video de bienvenida</span>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl font-display font-bold text-white mb-4 leading-tight"
                  >
                    Antes de reunirnos, necesito pedirte algo muy simple pero clave para que aproveches al máximo nuestra llamada:
                  </motion.h2>

                  {/* Call to action steps */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">1️⃣</span>
                      </div>
                      <p className="text-sm md:text-base text-white">
                        <span className="font-semibold">Mira este video de 3 minutos</span> donde te explico exactamente cómo trabajamos y qué puedes esperar de Contadoor.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">2️⃣</span>
                      </div>
                      <p className="text-sm md:text-base text-white">
                        <span className="font-semibold">Completa el formulario</span> que verás más abajo: esto nos ayudará a conocerte mejor y a personalizar nuestra conversación.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-sm md:text-base text-white mt-4"
                  >
                    👉 Te tomará solo unos minutos y hará toda la diferencia para que saques provecho de nuestra reunión.
                  </motion.p>
                </div>

                {/* Video Container - Right side on desktop, top on mobile */}
                <div className="flex justify-center md:justify-end order-1 md:order-2">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]"
                  >
                    <div className="relative bg-black">
                      <div className="aspect-[9/16] relative">
                        <video
                          ref={videoRef}
                          className="absolute inset-0 w-full h-full object-contain"
                          src="https://contadoor.cl/wp/wp-content/uploads/2025/09/luciano.mov"
                          muted={isMuted}
                          loop
                          playsInline
                          controls={false}
                          onClick={!isPlaying ? handlePlayClick : undefined}
                        />
                        
                        {/* Play Button Overlay */}
                        {!isPlaying && (
                          <div 
                            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30 transition-opacity hover:bg-black/40"
                            onClick={handlePlayClick}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              animate={{ 
                                boxShadow: [
                                  "0 0 0 0 rgba(255, 255, 255, 0.7)",
                                  "0 0 0 20px rgba(255, 255, 255, 0)",
                                  "0 0 0 0 rgba(255, 255, 255, 0)"
                                ]
                              }}
                              transition={{ 
                                boxShadow: { duration: 2, repeat: Infinity }
                              }}
                              className="w-14 h-14 md:w-16 md:h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center"
                            >
                              <Play className="w-6 h-6 md:w-8 md:h-8 text-primary ml-1" fill="currentColor" />
                            </motion.div>
                          </div>
                        )}

                        {/* Mute Button - Solo visible cuando está reproduciendo */}
                        {isPlaying && (
                          <button
                            onClick={toggleMute}
                            className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                          >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Video Info Bar */}
                    <div className="p-3 bg-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-black">Luciano - CEO Contadoor</p>
                          <p className="text-xs text-gray-500">Mensaje de bienvenida</p>
                        </div>
                        <div className="text-xs text-primary font-medium">
                          3:00 min
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoBlock;