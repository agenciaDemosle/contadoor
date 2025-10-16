import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, User, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Carlos Martínez',
    company: 'CEO - TechPro Importaciones',
    text: (
      <>
        <span className="inline-block bg-primary text-white px-1.5 py-0.5 rounded text-sm">
          Contadoor
        </span>{' '}
        transformó completamente nuestra gestión financiera. Pasamos de tener multas constantes a cero problemas con el SII. El ROI fue evidente desde el tercer mes.
      </>
    ),
    rating: 5
  },
  {
    id: 2,
    name: 'María González',
    company: 'Directora - E-commerce Fashion',
    text: 'La transparencia y proactividad del equipo es excepcional. Por primera vez tengo visibilidad completa de mi flujo de caja y puedo tomar decisiones informadas.',
    rating: 5
  },
  {
    id: 3,
    name: 'Roberto Silva',
    company: 'Gerente - Constructora Innova',
    text: 'Increíble el cambio. De tener 4 meses de retraso a recibir reportes el día 5 de cada mes. La plataforma es intuitiva y el equipo siempre está disponible.',
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-4">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <User className="w-8 h-8 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-black">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {testimonials[currentIndex].company}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
                        >
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <span className="text-6xl text-primary/20 absolute -top-2 -left-2">"</span>
                  <div className="text-gray-700 italic pl-8">
                    {testimonials[currentIndex].text}
                  </div>
                  <span className="text-6xl text-primary/20 absolute -bottom-6 right-2 rotate-180">"</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-primary transition-all duration-300"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Ir al testimonio ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-primary transition-all duration-300"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;