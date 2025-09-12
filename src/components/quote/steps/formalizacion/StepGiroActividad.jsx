import { motion } from 'framer-motion';
import { FaStore, FaBriefcase, FaHeartbeat, FaLaptopCode, FaGraduationCap, FaUtensils, FaTruck, FaIndustry } from 'react-icons/fa';
import { useState } from 'react';

export default function StepGiroActividad({ data, updateData, onNext, onPrev }) {
  const [selected, setSelected] = useState(data?.giro || '');
  const [otroGiro, setOtroGiro] = useState(data?.otroGiro || '');

  const giros = [
    {
      id: 'comercio',
      icon: FaStore,
      title: 'Comercio',
      description: 'Venta de productos, retail, importación',
      color: 'blue'
    },
    {
      id: 'servicios-profesionales',
      icon: FaBriefcase,
      title: 'Servicios Profesionales',
      description: 'Consultoría, asesoría, servicios especializados',
      color: 'green'
    },
    {
      id: 'salud',
      icon: FaHeartbeat,
      title: 'Salud y Bienestar',
      description: 'Clínicas, centros médicos, terapias',
      color: 'red'
    },
    {
      id: 'tecnologia',
      icon: FaLaptopCode,
      title: 'Tecnología',
      description: 'Software, desarrollo, servicios digitales',
      color: 'purple'
    },
    {
      id: 'educacion',
      icon: FaGraduationCap,
      title: 'Educación',
      description: 'Capacitación, cursos, coaching',
      color: 'yellow'
    },
    {
      id: 'gastronomia',
      icon: FaUtensils,
      title: 'Gastronomía',
      description: 'Restaurantes, cafeterías, delivery',
      color: 'orange'
    },
    {
      id: 'transporte',
      icon: FaTruck,
      title: 'Transporte y Logística',
      description: 'Envíos, distribución, courier',
      color: 'indigo'
    },
    {
      id: 'manufactura',
      icon: FaIndustry,
      title: 'Manufactura',
      description: 'Producción, fabricación, industria',
      color: 'gray'
    }
  ];

  const handleSelect = (giro) => {
    setSelected(giro);
    if (giro !== 'otro') {
      setOtroGiro('');
    }
    updateData({ giro, otroGiro: giro === 'otro' ? otroGiro : '' });
  };

  const handleOtroChange = (e) => {
    setOtroGiro(e.target.value);
    updateData({ giro: 'otro', otroGiro: e.target.value });
  };

  const handleNext = () => {
    if (selected && (selected !== 'otro' || otroGiro.trim())) {
      onNext();
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-400 to-blue-500',
      green: 'from-green-400 to-green-500',
      red: 'from-red-400 to-red-500',
      purple: 'from-purple-400 to-purple-500',
      yellow: 'from-yellow-400 to-yellow-500',
      orange: 'from-orange-400 to-orange-500',
      indigo: 'from-indigo-400 to-indigo-500',
      gray: 'from-gray-400 to-gray-500'
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
            ¿A qué se dedicará tu empresa?
          </h2>
          <p className="text-gray-600">
            Esto nos ayuda a preparar los códigos de actividad correctos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {giros.map((giro) => {
            const Icon = giro.icon;
            const isSelected = selected === giro.id;
            
            return (
              <motion.button
                key={giro.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(giro.id)}
                className={`relative border-2 rounded-lg p-3 text-center transition-all duration-300 ${
                  isSelected
                    ? 'border-primary shadow-md'
                    : 'border-gray-200 hover:border-primary/50 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getColorClasses(giro.color)} flex items-center justify-center ${
                    isSelected ? 'shadow-lg' : ''
                  }`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900">
                      {giro.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                      {giro.description}
                    </p>
                  </div>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mb-6">
          <button
            onClick={() => handleSelect('otro')}
            className={`w-full border-2 rounded-lg p-3 text-left transition-all duration-300 ${
              selected === 'otro'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <span className="font-medium text-gray-900">Otro giro o actividad</span>
          </button>
          
          {selected === 'otro' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3"
            >
              <input
                type="text"
                value={otroGiro}
                onChange={handleOtroChange}
                placeholder="Describe tu actividad principal"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </motion.div>
          )}
        </div>

        <div className="p-4 bg-blue-50 rounded-lg mb-8">
          <p className="text-sm text-blue-800">
            💡 No te preocupes si tu negocio abarca varias áreas. Podrás agregar más actividades después de la formalización.
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
            disabled={!selected || (selected === 'otro' && !otroGiro.trim())}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              selected && (selected !== 'otro' || otroGiro.trim())
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuar →
          </button>
        </div>

        {selected && (selected !== 'otro' || otroGiro.trim()) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-green-600 font-medium">
              ¡Perfecto! Ya casi terminamos 💼
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}