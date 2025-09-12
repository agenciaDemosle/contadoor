import { motion } from 'framer-motion';
import { FaUser, FaBriefcase, FaBuilding, FaUniversity, FaQuestionCircle } from 'react-icons/fa';
import { useState } from 'react';

export default function StepTipoEmpresaCrear({ data, updateData, onNext, onPrev }) {
  const [selected, setSelected] = useState(data?.tipoEmpresa || '');
  const [showHelp, setShowHelp] = useState(false);

  const tipos = [
    {
      id: 'persona-natural',
      icon: FaUser,
      title: 'Persona Natural con Giro',
      description: 'Ideal para empezar rápido, con menos trámites y costos iniciales.',
      pros: ['Rápido de crear', 'Menos requisitos', 'Menor costo inicial'],
      color: 'blue'
    },
    {
      id: 'eirl',
      icon: FaBriefcase,
      title: 'E.I.R.L.',
      description: 'Empresa individual, separa tu patrimonio personal.',
      pros: ['Protege patrimonio personal', 'Un solo dueño', 'Responsabilidad limitada'],
      color: 'green'
    },
    {
      id: 'spa',
      icon: FaBuilding,
      title: 'SpA',
      description: 'Flexible, ideal si piensas tener socios o inversionistas.',
      pros: ['Permite socios', 'Flexible', 'Atractiva para inversión'],
      color: 'purple'
    },
    {
      id: 'sociedad',
      icon: FaUniversity,
      title: 'Sociedad Limitada / Anónima',
      description: 'Más formal, pensada para empresas consolidadas.',
      pros: ['Mayor credibilidad', 'Estructura formal', 'Múltiples socios'],
      color: 'indigo'
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

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-400 to-blue-600',
      green: 'from-green-400 to-green-600',
      purple: 'from-purple-400 to-purple-600',
      indigo: 'from-indigo-400 to-indigo-600'
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
            ¿Qué tipo de empresa quieres crear?
          </h2>
          <p className="text-gray-600">
            Te ayudaremos a elegir la mejor opción para tu negocio
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {tipos.map((tipo) => {
            const Icon = tipo.icon;
            const isSelected = selected === tipo.id;
            
            return (
              <motion.button
                key={tipo.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(tipo.id)}
                className={`relative border-2 rounded-xl p-5 text-left transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? 'border-primary shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {isSelected && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(tipo.color)} opacity-5`} />
                )}
                
                <div className="relative space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">
                        {tipo.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {tipo.description}
                      </p>
                    </div>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${getColorClasses(tipo.color)} flex items-center justify-center`}>
                      <Icon className="text-white text-lg" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    {tipo.pros.map((pro, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getColorClasses(tipo.color)}`} />
                        <span className="text-xs text-gray-700">{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2"
                  >
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
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
          <span>No sé cuál elegir</span>
        </button>

        {showHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-blue-50 rounded-lg"
          >
            <p className="text-sm text-blue-800 mb-2">
              💡 <strong>Recomendaciones:</strong>
            </p>
            <ul className="text-sm text-blue-700 space-y-1 ml-4">
              <li>• <strong>Persona Natural:</strong> Si recién empiezas y quieres probar tu negocio</li>
              <li>• <strong>E.I.R.L.:</strong> Si ya tienes clientes y quieres proteger tu patrimonio</li>
              <li>• <strong>SpA:</strong> Si planeas crecer y buscar socios o inversión</li>
              <li>• <strong>Sociedad:</strong> Si ya tienes socios o un negocio establecido</li>
            </ul>
          </motion.div>
        )}

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
              ¡Buena elección! Sigamos configurando tu empresa 🚀
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}