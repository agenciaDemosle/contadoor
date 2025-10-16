import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, User, Phone, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { analytics } from '../../lib/analytics';
import { trackFormStart, trackFormSubmit, trackButtonClick, trackConversion } from '../../lib/gtm';

const FormularioPreLlamada = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    sentimiento_gestion: '',
    frecuencia_comunicacion: '',
    uso_tiempo_futuro: '',
    rapidez_meta: '',
    buscar_apoyo: ''
  });

  const questions = [
    {
      id: 'datos_contacto',
      type: 'contact',
      fields: [
        { name: 'nombre', label: 'Nombre', type: 'text', icon: User, placeholder: 'Tu nombre completo' },
        { name: 'telefono', label: 'Número de teléfono', type: 'tel', icon: Phone, placeholder: '+56 9 1234 5678' },
        { name: 'email', label: 'Dirección de correo electrónico', type: 'email', icon: Mail, placeholder: 'tu@email.com' }
      ]
    },
    {
      id: 'sentimiento_gestion',
      question: '¿Cómo te sientes con la forma en que se están gestionando tus procesos contables-tributarios y de tus trabajadores?',
      options: [
        'No estoy conforme, no tengo control',
        'Mal, tuve una mala experiencia reciente',
        'Bien, pero me gustaría mejorarla',
        'Excelente, he delegado a mis asesores y me dan tranquilidad'
      ]
    },
    {
      id: 'frecuencia_comunicacion',
      question: '¿Qué tan seguido te comunicas con tus asesores?',
      options: [
        'No tengo, lo hago yo mismo',
        'Una vez al mes, cuando tengo que pagar',
        'No tengo ese acceso, es muy difícil',
        'Semanalmente, cada vez que necesito apoyo o aclarar dudas'
      ]
    },
    {
      id: 'uso_tiempo_futuro',
      question: 'Imagina que logras delegar o externalizar los procesos contables, tributarios y la gestión de tus trabajadores y logras ganar tranquilidad y confianza que se están gestionando de la mejor forma, ¿en qué utilizarías el tiempo que antes gastabas trabajando y entendiendo estos procesos? Sé optimista, no conservador.',
      type: 'textarea'
    },
    {
      id: 'rapidez_meta',
      question: 'Si pudieras elegir, ¿cuán rápido te gustaría llegar a esa meta?',
      options: [
        'Lo antes posible (3 a 12 meses)',
        'Prefiero esperar (un año o más)',
        'No es una prioridad el tiempo personal'
      ]
    },
    {
      id: 'buscar_apoyo',
      question: 'Dada tu respuesta anterior, ¿crees verdaderamente que es una buena idea buscar apoyo de profesionales que cuentan con la experiencia y conocimiento para delegar tus procesos?',
      options: [
        'Sí, para lograrlo me ayudaría tener apoyo de expertos',
        'No estoy seguro todavía',
        'No, prefiero mantener el control directo'
      ]
    }
  ];

  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleInputChange = (name, value) => {
    setFormData(prev => {
      const isFirstInput = !prev[name] && value;
      if (isFirstInput && currentStep === 0) {
        // Track form start on first input
        trackFormStart('formulario_pre_llamada', 'lead_qualification');
      }
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const isStepValid = () => {
    const currentQuestion = questions[currentStep];
    
    if (currentQuestion.type === 'contact') {
      return currentQuestion.fields.every(field => formData[field.name]?.trim());
    } else if (currentQuestion.type === 'textarea') {
      return formData[currentQuestion.id]?.trim();
    } else {
      return formData[currentQuestion.id];
    }
  };

  const handleNext = () => {
    if (isStepValid() && currentStep < totalSteps - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      // Track form step progression
      trackButtonClick('form_next_step', 'formulario_pre_llamada', {
        step_from: currentStep + 1,
        step_to: nextStep + 1,
        form_progress: `${nextStep + 1}/${totalSteps}`
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Use environment variable or fallback to production URL
      const baseUrl = import.meta.env.VITE_API_URL || 'https://contadoor.cl/api';
      const apiUrl = `${baseUrl}/form-submit.php`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        analytics.formSubmitted('prellamada', formData);

        // Track successful form submission
        trackFormSubmit('formulario_pre_llamada', 'lead_qualification', {
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          response_data: data
        });

        // Track conversion
        trackConversion('pre_meeting_form', 1, {
          lead_source: 'primera_asesoria_landing',
          form_type: 'qualification'
        });
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            nombre: '',
            telefono: '',
            email: '',
            sentimiento_gestion: '',
            frecuencia_comunicacion: '',
            uso_tiempo_futuro: '',
            rapidez_meta: '',
            buscar_apoyo: ''
          });
          setCurrentStep(0);
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus('error');
        console.error('Error:', data.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentStep];

    if (currentQuestion.type === 'contact') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-black mb-6">
            Información de contacto
          </h3>
          {currentQuestion.fields.map((field, idx) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <div className="relative">
                <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={field.type}
                  value={formData[field.name]}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </motion.div>
          ))}
        </div>
      );
    } else if (currentQuestion.type === 'textarea') {
      return (
        <div>
          <h3 className="text-xl font-semibold text-black mb-6">
            {currentQuestion.question}
          </h3>
          <motion.textarea
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            value={formData[currentQuestion.id]}
            onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
            placeholder="Escribe tu respuesta aquí..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
          />
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="text-xl font-semibold text-black mb-6">
            {currentQuestion.question}
          </h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <motion.label
                key={option}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/50"
                style={{
                  borderColor: formData[currentQuestion.id] === option
                    ? '#A05699'
                    : '#e5e7eb',
                  backgroundColor: formData[currentQuestion.id] === option
                    ? '#A0569910'
                    : 'white'
                }}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={formData[currentQuestion.id] === option}
                  onChange={() => handleInputChange(currentQuestion.id, option)}
                  className="sr-only"
                />
                <div
                  className="flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3"
                  style={{
                    borderColor: formData[currentQuestion.id] === option
                      ? '#A05699'
                      : '#d1d5db'
                  }}
                >
                  {formData[currentQuestion.id] === option && (
                    <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                  )}
                </div>
                <span className="text-black">{option}</span>
              </motion.label>
            ))}
          </div>
        </div>
      );
    }
  };

  if (submitStatus === 'success') {
    return (
      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl shadow-card p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>
            <h2 className="text-3xl font-bold text-black mb-4">
              ¡Formulario Enviado Exitosamente!
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Hemos recibido tu información. Nuestro equipo se pondrá en contacto contigo pronto para coordinar tu llamada de asesoría inicial.
            </p>
            <p className="text-sm text-gray-500">
              Te enviaremos un correo de confirmación a {formData.email}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="py-16 bg-gradient-to-br from-primary/5 to-white relative z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
            >
              <span className="text-sm font-medium text-primary">💡 Recomendado</span>
            </motion.div>
            <h2 className="text-3xl font-display font-bold text-black mb-4">
              📋 Conozcámonos mejor antes de la reunión
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estas preguntas nos ayudarán a preparar una reunión más personalizada y enfocada en lo que realmente importa para ti.
              <br />
              <br />
              <span className="text-primary font-medium">👉 Tu tiempo es valioso:</span> por eso queremos aprovechar cada minuto. Solo te tomará 2 minutos completar el formulario.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-8">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  Paso {currentStep + 1} de {totalSteps}
                </span>
                <span className="text-sm text-primary font-medium">
                  {Math.round(progress)}% completado
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Form content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-8"
              >
                {renderQuestion()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-6 py-3 text-black border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>

              {currentStep === totalSteps - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid() || isSubmitting}
                  className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      Enviar formulario
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">
                  Hubo un error al enviar el formulario. Por favor, intenta nuevamente.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FormularioPreLlamada;