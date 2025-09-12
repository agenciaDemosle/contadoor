import { motion } from 'framer-motion';
import { FaUser, FaBuilding, FaBriefcase, FaUniversity, FaQuestionCircle } from 'react-icons/fa';
import { useState } from 'react';

export default function StepTipoEmpresa({ data, updateData, onNext, onPrev }) {
  const [selected, setSelected] = useState(data?.tipoEmpresa || '');
  const [showHelp, setShowHelp] = useState(false);

  const tipos = [
    {
      id: 'persona-natural',
      icon: FaUser,
      title: 'Persona Natural',
      description: 'Con o sin giro comercial'
    },
    {
      id: 'eirl',
      icon: FaBriefcase,
      title: 'E.I.R.L.',
      description: 'Empresa Individual de Responsabilidad Limitada'
    },
    {
      id: 'spa',
      icon: FaBuilding,
      title: 'SpA',
      description: 'Sociedad por Acciones'
    },
    {
      id: 'sociedad',
      icon: FaUniversity,
      title: 'Sociedad Limitada / Anónima',
      description: 'Ltda. o S.A.'
    }
  ];

  const handleSelect = (tipo) => {
    setSelected(tipo);
    updateData({ tipoEmpresa: tipo });
  };

  const handleNext = () => {
    if (selected) {
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
            ¿Qué tipo de empresa tienes?
          </h2>
          <p className="text-gray-600">
            Selecciona el tipo de empresa para personalizar tu cotización
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {tipos.map((tipo) => {
            const Icon = tipo.icon;
            return (
              <motion.button
                key={tipo.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(tipo.id)}
                className={`group relative border-2 rounded-xl p-4 text-left transition-all duration-300 ${
                  selected === tipo.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-gray-200 hover:border-primary/50 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    selected === tipo.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary'
                  }`}>
                    <Icon className="text-lg" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {tipo.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {tipo.description}
                    </p>
                  </div>
                </div>
                {selected === tipo.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <button
          onClick={() => setShowHelp(!showHelp)}
          className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 mb-6"
        >
          <FaQuestionCircle />
          <span>No estoy seguro de mi tipo de empresa</span>
        </button>

        {showHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-blue-50 rounded-lg"
          >
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Si no estás seguro, puedes revisar tu RUT en SII o contactarnos para ayudarte a identificar tu tipo de empresa.
            </p>
          </motion.div>
        )}

        <div className="mt-8 flex justify-between">
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
              ¡Excelente! Vamos al siguiente paso 🎯
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}