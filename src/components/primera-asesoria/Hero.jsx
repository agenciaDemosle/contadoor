import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative bg-white pt-12 pb-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-primary/10 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-6"
          >
           <h1 className="text-3xl md:text-4xl font-display font-bold text-black leading-tight">
  👋 ¡Hola! Soy Luciano, CEO de Contadoor, y{" "}
  <span className="bg-primary text-white px-2 py-1 rounded">
    quiero darte la bienvenida.
  </span>
</h1>
            <p className="text-base md:text-lg text-gray-600">
              El hecho de que ya hayas agendado tu llamada con nosotros significa que estás listo para dar un paso importante hacia una gestión contable y tributaria mucho más clara y ordenada. 🚀
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-xl hidden md:block" />
            <div className="relative bg-white rounded-2xl border-2 border-primary/20 shadow-card p-4 md:p-8">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="relative inline-block"
                  >
                    <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full p-1 bg-gradient-to-br from-primary to-primary/70 shadow-xl">
                      <img 
                        src="https://contadoor.cl/wp/wp-content/uploads/2025/09/luciano.png" 
                        alt="Luciano - CEO Contadoor"
                        className="w-full h-full rounded-full object-cover bg-white"
                      />
                    </div>
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(160, 86, 153, 0.4)",
                          "0 0 0 20px rgba(160, 86, 153, 0)",
                          "0 0 0 0 rgba(160, 86, 153, 0)"
                        ]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      className="absolute inset-0 rounded-full"
                    />
                  </motion.div>
                  <p className="text-sm md:text-base text-black font-medium mt-4">Luciano - CEO Contadoor</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">Tu asesor contable experto</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;