import { motion } from 'framer-motion';
import { FaBuilding, FaRocket } from 'react-icons/fa';

export default function StepInicial({ data, updateData, onNext }) {
  const handleSelection = (hasCompany) => {
    updateData({ hasCompany });
    // No llamamos a onNext() aquí porque se maneja automáticamente en updateFormData
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Bienvenido a Contadoor!
        </h2>
        <p className="text-gray-600 mb-8">
          Comencemos con una pregunta simple para ofrecerte la mejor solución
        </p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            ¿Tienes empresa?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelection(true)}
              className="group relative bg-white border-2 border-gray-200 rounded-xl p-6 text-left hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FaBuilding className="text-primary text-xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Sí, ya tengo mi empresa
                  </h4>
                  <p className="text-sm text-gray-600">
                    Necesito servicios contables y tributarios para mi empresa existente
                  </p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelection(false)}
              className="group relative bg-white border-2 border-gray-200 rounded-xl p-6 text-left hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FaRocket className="text-primary text-xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    No, necesito crearla
                  </h4>
                  <p className="text-sm text-gray-600">
                    Quiero formalizar mi negocio y necesito ayuda con el proceso
                  </p>
                </div>
              </div>
            </motion.button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            💡 No te preocupes, en ambos casos te acompañaremos en todo el proceso
          </p>
        </div>
      </motion.div>
    </div>
  );
}