import { motion } from 'framer-motion';
import { FaFileAlt, FaRocket, FaStar, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

export default function StepNivelApoyoFormalizacion({ data, updateData, onNext, onPrev }) {
  const [selected, setSelected] = useState(data?.plan || '');

  const planes = [
    {
      id: 'basico',
      title: 'Formalización Básica',
      subtitle: 'Solo lo esencial',
      description: 'Constitución legal y obtención de inicio de actividades.',
      features: [
        'Constitución de empresa',
        'Inicio de actividades en SII',
        'RUT empresarial',
        'Asesoría inicial'
      ],
      price: 'Desde $250.000',
      icon: FaFileAlt,
      recommended: false,
      color: 'gray'
    },
    {
      id: 'completo',
      title: 'Formalización + Plan Completo',
      subtitle: 'Todo incluido',
      description: 'Constitución, inicio de actividades, planificación tributaria y gestión contable inicial.',
      features: [
        'Todo lo del plan básico',
        'Planificación tributaria inicial',
        'Apertura cuenta bancaria empresa',
        'Gestión contable primer mes incluida',
        'Asesor dedicado',
        'Capacitación inicial',
        'Soporte prioritario'
      ],
      price: 'Desde $450.000',
      icon: FaRocket,
      recommended: true,
      color: 'primary'
    }
  ];

  const handleSelect = (plan) => {
    setSelected(plan);
    updateData({ plan });
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
            ¿Quieres solo la formalización o un acompañamiento completo?
          </h2>
          <p className="text-gray-600">
            Elige el nivel de apoyo que necesitas para tu nueva empresa
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {planes.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selected === plan.id;
            
            return (
              <motion.button
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(plan.id)}
                className={`relative border-2 rounded-xl p-6 text-left transition-all duration-300 ${
                  isSelected
                    ? plan.color === 'primary'
                      ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg'
                      : 'border-gray-400 bg-gray-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                      <FaStar className="text-xs" />
                      <span>RECOMENDADO</span>
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {plan.title}
                      </h3>
                      <p className="text-sm font-medium text-gray-600">
                        {plan.subtitle}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? plan.color === 'primary' ? 'bg-primary text-white' : 'bg-gray-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="text-xl" />
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    {plan.description}
                  </p>

                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <FaCheckCircle className={`text-sm mt-0.5 flex-shrink-0 ${
                          isSelected
                            ? plan.color === 'primary' ? 'text-primary' : 'text-gray-600'
                            : 'text-gray-400'
                        }`} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-lg font-bold text-gray-900">
                      {plan.price}
                    </p>
                    <p className="text-xs text-gray-500">
                      + IVA. Valor referencial
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      plan.color === 'primary' ? 'bg-primary' : 'bg-gray-600'
                    }`}>
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-3 mb-8">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⭐ <strong>¿Por qué el Plan Completo?</strong> El 90% de los emprendedores que eligen el plan completo evitan multas y problemas tributarios en su primer año.
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Nota:</strong> Ambos planes incluyen acompañamiento durante todo el proceso de formalización. La diferencia está en el apoyo posterior.
            </p>
          </div>
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
            Ver mi cotización →
          </button>
        </div>

        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-green-600 font-medium">
              ¡Perfecto! Preparando tu cotización personalizada... 🎉
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}