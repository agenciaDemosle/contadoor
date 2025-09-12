import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Paso inicial
import StepInicial from './steps/StepInicial';
// Flujo empresa existente
import StepTipoEmpresa from './steps/empresa-existente/StepTipoEmpresa';
import StepTamanoEmpresa from './steps/empresa-existente/StepTamanoEmpresa';
import StepTrabajadores from './steps/empresa-existente/StepTrabajadores';
import StepNivelApoyo from './steps/empresa-existente/StepNivelApoyo';
// Flujo formalización
import StepTipoEmpresaCrear from './steps/formalizacion/StepTipoEmpresaCrear';
import StepGiroActividad from './steps/formalizacion/StepGiroActividad';
import StepTrabajadoresInicio from './steps/formalizacion/StepTrabajadoresInicio';
import StepNivelApoyoFormalizacion from './steps/formalizacion/StepNivelApoyoFormalizacion';
// Resultado
import StepResultadoFinal from './steps/StepResultadoFinal';

export default function CotizadorWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [flujo, setFlujo] = useState(null); // null, 'empresa-existente', 'formalizacion'
  const wizardRef = useRef(null);
  const [formData, setFormData] = useState({
    inicial: {},
    empresaExistente: {},
    formalizacion: {},
    contacto: {}
  });

  // Definir los pasos según el flujo seleccionado
  const getSteps = () => {
    if (!flujo) {
      // Paso inicial
      return [
        { id: 'inicial', title: 'Inicio', component: StepInicial }
      ];
    } else if (flujo === 'empresa-existente') {
      // Flujo para empresas existentes
      return [
        { id: 'inicial', title: 'Inicio', component: StepInicial },
        { id: 'tipoEmpresa', title: 'Tipo de empresa', component: StepTipoEmpresa },
        { id: 'tamano', title: 'Tamaño', component: StepTamanoEmpresa },
        { id: 'trabajadores', title: 'Trabajadores', component: StepTrabajadores },
        { id: 'nivelApoyo', title: 'Nivel de apoyo', component: StepNivelApoyo },
        { id: 'resultado', title: 'Tu cotización', component: StepResultadoFinal }
      ];
    } else {
      // Flujo para formalización
      return [
        { id: 'inicial', title: 'Inicio', component: StepInicial },
        { id: 'tipoEmpresaCrear', title: 'Tipo de empresa', component: StepTipoEmpresaCrear },
        { id: 'giro', title: 'Actividad', component: StepGiroActividad },
        { id: 'trabajadoresInicio', title: 'Trabajadores', component: StepTrabajadoresInicio },
        { id: 'nivelApoyoForm', title: 'Nivel de apoyo', component: StepNivelApoyoFormalizacion },
        { id: 'resultado', title: 'Tu cotización', component: StepResultadoFinal }
      ];
    }
  };

  const steps = getSteps();

  const updateFormData = (stepId, data) => {
    // Manejar el paso inicial especialmente
    if (stepId === 'inicial' && data.hasCompany !== undefined) {
      setFlujo(data.hasCompany ? 'empresa-existente' : 'formalizacion');
      setFormData(prev => ({
        ...prev,
        inicial: data
      }));
      // Avanzar automáticamente al siguiente paso después de establecer el flujo
      setCurrentStep(1);
    } else {
      // Determinar en qué sección guardar los datos
      let section = 'contacto';
      if (flujo === 'empresa-existente') {
        section = 'empresaExistente';
      } else if (flujo === 'formalizacion') {
        section = 'formalizacion';
      }
      
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          ...data
        }
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Hacer scroll suave al top del wizard
      if (wizardRef.current) {
        const yOffset = -100; // Offset para el header sticky
        const element = wizardRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (index) => {
    setCurrentStep(index);
  };

  const CurrentStepComponent = steps[currentStep].component;
  const totalSteps = flujo ? (flujo === 'empresa-existente' ? 6 : 6) : 1;
  const adjustedStep = flujo ? currentStep : 0;
  const progress = ((adjustedStep + 1) / totalSteps) * 100;
  
  // Obtener mensajes motivacionales según el progreso
  const getMotivationalMessage = () => {
    const percentage = Math.round(progress);
    if (percentage < 20) return '¡Empecemos! 🚀';
    if (percentage < 40) return '¡Vas muy bien! 💪';
    if (percentage < 60) return '¡Ya casi! 🎯';
    if (percentage < 80) return '¡Un poco más! 🔥';
    if (percentage < 100) return '¡Último paso! 🏁';
    return '¡Completado! 🎉';
  };

  // Auto-scroll cuando cambia el paso
  useEffect(() => {
    if (wizardRef.current && currentStep > 0) {
      const yOffset = -100;
      const element = wizardRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [currentStep]);

  return (
    <div ref={wizardRef} className="max-w-3xl mx-auto px-4">
      {/* Progress Bar - Solo mostrar si ya se seleccionó un flujo */}
      {flujo && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="flex justify-between flex-1">
              {steps.slice(1).map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => index + 1 <= currentStep && goToStep(index + 1)}
                  className={`text-xs md:text-sm font-medium transition-colors ${
                    index + 1 <= currentStep
                      ? 'text-primary cursor-pointer hover:text-primary/80'
                      : 'text-gray-400 cursor-default'
                  }`}
                  disabled={index + 1 > currentStep}
                >
                  {step.title}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/80"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-2"
            >
              <span className="text-sm font-medium text-primary">
                {getMotivationalMessage()} {Math.round(progress)}% completado
              </span>
            </motion.div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStepComponent
            data={formData[steps[currentStep].id] || (flujo === 'empresa-existente' ? formData.empresaExistente : formData.formalizacion)}
            allData={formData}
            updateData={(data) => updateFormData(steps[currentStep].id, data)}
            onNext={nextStep}
            onPrev={prevStep}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === steps.length - 1}
            isFormalizacion={flujo === 'formalizacion'}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}