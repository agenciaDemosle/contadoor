import { motion } from 'framer-motion';
import { FaSeedling, FaChartLine, FaRocket } from 'react-icons/fa';
import { useState } from 'react';

export default function StepTamanoEmpresa({ data, updateData, onNext, onPrev }) {
  const [selected, setSelected] = useState(data?.tamano || '');

  const tamanos = [
    {
      id: 'emprendiendo',
      icon: FaSeedling,
      title: 'Emprendiendo',
      description: 'Ventas anuales hasta $30M',
      color: 'green'
    },
    {
      id: 'crecimiento',
      icon: FaChartLine,
      title: 'En Crecimiento',
      description: '$30M - $150M anuales',
      color: 'blue'
    },
    {
      id: 'consolidada',
      icon: FaRocket,
      title: 'Consolidada',
      description: 'Más de $150M anuales',
      color: 'purple'
    }
  ];

  const handleSelect = (tamano) => {
    setSelected(tamano);
    updateData({ tamano });
  };

  const handleNext = () => {
    if (selected) {
      onNext();
    }
  };

  const getColorClasses = (color, isSelected) => {
    const colors = {
      green: {
        bg: isSelected ? 'bg-green-500' : 'bg-green-100 group-hover:bg-green-200',
        text: isSelected ? 'text-white' : 'text-green-600',
        border: isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
      },
      blue: {
        bg: isSelected ? 'bg-blue-500' : 'bg-blue-100 group-hover:bg-blue-200',
        text: isSelected ? 'text-white' : 'text-blue-600',
        border: isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
      },
      purple: {
        bg: isSelected ? 'bg-purple-500' : 'bg-purple-100 group-hover:bg-purple-200',
        text: isSelected ? 'text-white' : 'text-purple-600',
        border: isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
      }
    };
    return colors[color] || colors.blue;
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
            ¿Qué tan grande es tu empresa?
          </h2>
          <p className="text-gray-600">
            Esto nos ayuda a calcular un precio justo para tu negocio
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {tamanos.map((tamano) => {
            const Icon = tamano.icon;
            const colors = getColorClasses(tamano.color, selected === tamano.id);
            
            return (
              <motion.button
                key={tamano.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelect(tamano.id)}
                className={`group w-full border-2 rounded-xl p-5 text-left transition-all duration-300 ${colors.border}`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${colors.bg}`}>
                    <Icon className={`text-2xl ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {tamano.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {tamano.description}
                    </p>
                  </div>
                  {selected === tamano.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0"
                    >
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg mb-8">
          <p className="text-sm text-gray-600">
            💡 <strong>Nota:</strong> Esta información es solo para calcular un precio referencial. No te pediremos cifras exactas.
          </p>
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
            disabled={!selected}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              selected
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuar →
          </button>
        </div>

        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-green-600 font-medium">
              ¡Perfecto! Ya casi terminamos 🚀
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}