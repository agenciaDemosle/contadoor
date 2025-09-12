import { motion } from 'framer-motion';
import { FaUsers, FaUserTie } from 'react-icons/fa';
import { useState } from 'react';

export default function StepTrabajadoresInicio({ data, updateData, onNext, onPrev }) {
  const [hasTrabajadores, setHasTrabajadores] = useState(data?.hasTrabajadores || null);
  const [cantidad, setCantidad] = useState(data?.cantidadTrabajadores || '');

  const handleSelection = (value) => {
    setHasTrabajadores(value);
    if (!value) {
      setCantidad('');
      updateData({ hasTrabajadores: false, cantidadTrabajadores: 0 });
    } else {
      updateData({ hasTrabajadores: true });
    }
  };

  const handleCantidadChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setCantidad(value);
      updateData({ 
        hasTrabajadores: true, 
        cantidadTrabajadores: value ? parseInt(value) : 0 
      });
    }
  };

  const handleNext = () => {
    if (hasTrabajadores !== null) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¿Tendrás trabajadores contratados al comenzar?
          </h2>
          <p className="text-gray-600">
            Esto nos ayuda a preparar todo lo necesario desde el inicio
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelection(true)}
            className={`group border-2 rounded-xl p-6 text-center transition-all duration-300 ${
              hasTrabajadores === true
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-primary/50 hover:shadow-sm'
            }`}
          >
            <div className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-colors ${
                hasTrabajadores === true
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary'
              }`}>
                <FaUsers className="text-2xl" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Sí</h4>
              <p className="text-sm text-gray-600 mt-1">
                Contrataré trabajadores desde el inicio
              </p>
            </div>
            {hasTrabajadores === true && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-3"
              >
                <div className="w-6 h-6 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelection(false)}
            className={`group border-2 rounded-xl p-6 text-center transition-all duration-300 ${
              hasTrabajadores === false
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-primary/50 hover:shadow-sm'
            }`}
          >
            <div className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-colors ${
                hasTrabajadores === false
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary'
              }`}>
                <FaUserTie className="text-2xl" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">No</h4>
              <p className="text-sm text-gray-600 mt-1">
                Empezaré solo o con socios
              </p>
            </div>
            {hasTrabajadores === false && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-3"
              >
                <div className="w-6 h-6 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>
            )}
          </motion.button>
        </div>

        {hasTrabajadores === true && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cuántos trabajadores aproximadamente? (Opcional)
            </label>
            <input
              type="text"
              value={cantidad}
              onChange={handleCantidadChange}
              placeholder="Ej: 3"
              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Esto nos ayuda a estimar mejor los costos
            </p>
          </motion.div>
        )}

        <div className="space-y-3 mb-8">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 Si contratas trabajadores, incluiremos en el servicio:
            </p>
            <ul className="text-sm text-blue-700 mt-2 ml-4 space-y-1">
              <li>• Inscripción en mutual de seguridad</li>
              <li>• Contratos de trabajo</li>
              <li>• Registro en Dirección del Trabajo</li>
              <li>• Gestión de cotizaciones previsionales</li>
            </ul>
          </div>

          {hasTrabajadores === false && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-green-50 rounded-lg"
            >
              <p className="text-sm text-green-800">
                ✅ No te preocupes, cuando decidas contratar te ayudaremos con todo el proceso.
              </p>
            </motion.div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onPrev}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            ← Volver
          </button>
          <button
            onClick={handleNext}
            disabled={hasTrabajadores === null}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              hasTrabajadores !== null
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuar →
          </button>
        </div>

        {hasTrabajadores !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-green-600 font-medium">
              ¡Excelente! Un paso más para tu cotización 💪
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}