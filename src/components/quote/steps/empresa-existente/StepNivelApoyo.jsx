import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaRocket, FaShieldAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function StepNivelApoyo({ data, updateData, onNext, onPrev }) {
  const [selected, setSelected] = useState(data?.plan || '');

  const planes = [
    {
      id: 'completo',
      title: 'Plan Completo',
      subtitle: 'Asesoría integral',
      description: 'Planificación tributaria, gestión de trabajadores y acompañamiento permanente con un equipo de asesores siempre listos para apoyarte y reportes contables completos.',
      features: [
        'Asesor dedicado',
        'Planificación tributaria',
        'Gestión de trabajadores',
        'Reportes mensuales detallados',
        'Respuesta prioritaria',
        'Reuniones de estrategia'
      ],
      icon: FaRocket,
      recommended: true,
      color: 'primary'
    },
    {
      id: 'esencial',
      title: 'Plan Esencial',
      subtitle: 'Lo básico para cumplir',
      description: 'Lo necesario para cumplir con tus obligaciones contables y tributarias.',
      features: [
        'Declaraciones mensuales',
        'Libro de compras y ventas',
        'Balance anual',
        'Soporte por email'
      ],
      icon: FaShieldAlt,
      recommended: false,
      color: 'gray'
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
            ¿Qué tipo de apoyo necesitas?
          </h2>
          <p className="text-gray-600">
            Elige el plan que mejor se adapte a tus necesidades
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
                      <div key={index} className="flex items-center space-x-2">
                        <FaCheckCircle className={`text-sm ${
                          isSelected
                            ? plan.color === 'primary' ? 'text-primary' : 'text-gray-600'
                            : 'text-gray-400'
                        }`} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
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

        <div className="p-4 bg-yellow-50 rounded-lg mb-8">
          <p className="text-sm text-yellow-800">
            ⭐ <strong>Tip:</strong> El 85% de nuestros clientes eligen el Plan Completo por la tranquilidad y el ahorro en multas que genera la planificación tributaria.
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
              ¡Excelente elección! Preparando tu cotización... 🎉
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}