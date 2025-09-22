import { useReducer, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackQuoteEvent, trackButtonClick, trackCTAClick } from '../lib/gtm';
import MeetingVideoGate from '../components/MeetingVideoGate';
import {
  Building,
  Star,
  Lightbulb,
  User,
  Store,
  University,
  Sprout,
  TrendingUp,
  Rocket,
  Users,
  UserCheck,
  CheckCircle,
  FileText,
  Check,
  MessageCircle,
  Video
} from 'lucide-react';

// Types
const CompanyTypes = {
  persona: 'Persona Natural',
  eirl: 'E.I.R.L.',
  spa: 'SpA',
  ltda_sa: 'Sociedad Limitada / Anónima'
};

const SizeTiers = {
  emprendiendo: 'Emprendiendo',
  crecimiento: 'En Crecimiento',
  consolidada: 'Consolidada'
};

const SupportLevels = {
  esencial: 'Plan Esencial',
  completo: 'Plan Completo'
};

// Pricing configuration
const UF_RATE = 38000;

// Precios base por tamaño de empresa
const precios = {
  emprendiendo: {
    esencial: 1.5,
    completo: 5.0
  },
  crecimiento: {
    esencial: 3.0,
    completo: 10.0
  },
  consolidada: {
    esencial: 5.0,
    completo: 20.0
  }
};

// Costo por trabajador adicional
const costoTrabajador = 0.30;

// Precios creación de empresas (en CLP)
const preciosCreacion = {
  basica: 150000,
  completa: 250000
};

// State management
const initialState = {
  currentStep: -1, // -1 for welcome screen
  hasCompany: null,
  companyType: null,
  size: null,
  hasEmployees: null,
  employeesCount: null,
  support: null,
  resultUF: null,
  resultCLP: null,
  isCreation: false,
};

const quoteReducer = (state, action) => {
  const newState = { ...state, ...action.payload };

  // Save to localStorage
  localStorage.setItem('cotizador_state_v1', JSON.stringify(newState));

  return newState;
};

// Components
const StepLayout = ({ children, step, total }) => (
  <div className="max-w-3xl mx-auto px-4">
    {step >= 0 && <Stepper currentStep={step} totalSteps={total} />}
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mt-8"
    >
      {children}
    </motion.div>
  </div>
);

const Stepper = ({ currentStep, totalSteps }) => {
  const steps = ['Tipo de empresa', 'Tamaño', 'Trabajadores', 'Nivel de apoyo', 'Tu cotización'];
  const progress = (currentStep / (totalSteps - 1)) * 100;

  const getProgressMessage = () => {
    if (currentStep === 0) return '¡Vas muy bien! 20% completado';
    if (currentStep === 1) return '¡Ya casi! 40% completado';
    if (currentStep === 2) return '¡Un poco más! 60% completado';
    if (currentStep === 3) return '¡Último paso! 80% completado';
    if (currentStep === 4) return '¡Completado! 100% completado';
    return '';
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`${index <= currentStep ? 'text-[#8A3F83] font-semibold' : 'text-gray-400'}`}
          >
            {step}
          </span>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
        <motion.div
          className="bg-[#8A3F83] h-1.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-center">
        <span className="text-sm font-medium text-[#8A3F83]">
          {getProgressMessage()}
        </span>
      </div>
    </div>
  );
};

const SelectCard = ({ title, subtitle, icon, active, onClick, recommended, ...props }) => (
  <button
    onClick={onClick}
    className={`w-full rounded-2xl border p-5 text-left transition-all hover:border-[#8A3F83]/50 ${
      active
        ? 'bg-[#8A3F83]/6 border-[#8A3F83]'
        : 'border-gray-200'
    } relative`}
    {...props}
  >
    {recommended && (
      <span className="absolute -top-2 left-4 bg-[#8A3F83] text-white text-xs font-semibold px-3 py-1 rounded-full">
        RECOMENDADO
      </span>
    )}
    <div className="flex items-start gap-4">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  </button>
);

const Pill = ({ children, type = 'info' }) => {
  const colors = {
    info: 'bg-[#EDF5FF] text-[#1D4ED8]',
    warning: 'bg-yellow-50 text-yellow-800',
    success: 'bg-green-50 text-green-800'
  };

  return (
    <div className={`rounded-xl px-4 py-3 ${colors[type]} text-sm font-medium`}>
      {children}
    </div>
  );
};

const CTAButton = ({ children, onClick, disabled, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-[#8A3F83] text-white hover:bg-[#8A3F83]/90',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700',
    ghost: 'text-gray-600 hover:text-gray-800'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-6 py-3 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default function Cotizador() {
  const [state, dispatch] = useReducer(quoteReducer, initialState, (initial) => {
    // Load from localStorage
    const saved = localStorage.getItem('cotizador_state_v1');
    return saved ? { ...initial, ...JSON.parse(saved) } : initial;
  });

  // Video gate modal state
  const [showVideoGate, setShowVideoGate] = useState(false);

  // Track events
  const trackEvent = (event, data = {}) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event, ...data });
    }
  };

  // Track page load
  useEffect(() => {
    trackQuoteEvent('page_view', 'cotizador_load', {
      hasExistingData: !!localStorage.getItem('cotizador_state_v1'),
      currentStep: state.currentStep
    });
  }, []);

  // Calculate pricing
  const calculatePrice = () => {
    // Si no tiene empresa (nueva empresa), mostrar precios de creación
    if (state.hasCompany === false) {
      return {
        uf: null, // No aplica UF para creación
        clp: state.support === 'completo' ? preciosCreacion.completa : preciosCreacion.basica,
        isCreation: true
      };
    }

    // Para empresas existentes
    if (!state.size || !state.support) return { uf: 0, clp: 0 };

    // Precio base según tamaño y plan
    const precioBase = precios[state.size]?.[state.support] || 0;

    // Agregar costo por trabajadores adicionales
    const empleados = parseInt(state.employeesCount) || 0;
    const costoEmpleados = empleados * costoTrabajador;

    const totalUF = Number((precioBase + costoEmpleados).toFixed(2));
    const totalCLP = Math.round(totalUF * UF_RATE);

    return { uf: totalUF, clp: totalCLP, isCreation: false };
  };

  const formatCLP = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const nextStep = () => {
    let newStep = state.currentStep + 1;

    // Si no tiene empresa (creación), saltar pasos innecesarios
    if (state.hasCompany === false) {
      // Saltar tipo de empresa (paso 0) y tamaño (paso 1) y empleados (paso 2)
      if (newStep === 0 || newStep === 1 || newStep === 2) {
        newStep = 3; // Ir directo al plan de soporte
      }
    }

    dispatch({ payload: { currentStep: newStep } });

    trackEvent('quote_step', {
      step: newStep,
      label: ['welcome', 'company_type', 'size', 'employees', 'support', 'result'][newStep + 1] || 'unknown'
    });
  };

  const prevStep = () => {
    let newStep = Math.max(-1, state.currentStep - 1);

    // Si no tiene empresa y está en el paso de soporte (3), volver al welcome (-1)
    if (state.hasCompany === false && state.currentStep === 3) {
      newStep = -1;
    }

    dispatch({ payload: { currentStep: newStep } });
  };

  const goToResult = () => {
    const result = calculatePrice();
    dispatch({
      payload: {
        currentStep: 4,
        resultUF: result.uf,
        resultCLP: result.clp,
        isCreation: result.isCreation
      }
    });

    trackEvent('quote_result', {
      uf: result.uf,
      clp: result.clp,
      size: state.size,
      support: state.support,
      employeesCount: state.employeesCount,
      isCreation: result.isCreation
    });
  };

  const handleContactClick = (channel) => {
    // Track with existing function
    trackEvent('quote_contact', { channel });

    // Track with dataLayer as specified
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'quote_contact',
        channel: channel
      });
    }

    if (channel === 'whatsapp') {
      const message = state.isCreation
        ? `Hola! Acabo de cotizar la formalización de mi empresa en su sitio web. El costo es de ${formatCLP(state.resultCLP)}. ¿Podemos conversar sobre el proceso?`
        : `Hola! Acabo de hacer una cotización en su sitio web. Mi presupuesto es de ${formatCLP(state.resultCLP)} (${state.resultUF.toFixed(2)} UF). ¿Podemos conversar?`;
      window.open(`https://wa.me/56979881891?text=${encodeURIComponent(message)}`, '_blank');
    } else if (channel === 'meeting') {
      // Open video gate modal
      setShowVideoGate(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] py-8 lg:py-12">
      {/* Hero */}
      <div className="text-center mb-8 lg:mb-12">
        <span className="inline-block px-4 py-2 bg-[#8A3F83]/10 text-[#8A3F83] rounded-full text-sm font-semibold mb-4">
          COTIZADOR ONLINE
        </span>
        <h1 className="text-3xl lg:text-4xl font-black mb-4">
          Cotiza tu plan en 2 minutos
        </h1>
        <p className="text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto px-4">
          Responde algunas preguntas y obtén una estimación personalizada al instante
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* Welcome Screen */}
        {state.currentStep === -1 && (
          <StepLayout step={-1}>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">¡Bienvenido a Contadoor!</h2>
              <p className="text-gray-600 mb-8">
                Comencemos con una pregunta simple para ofrecerte la mejor solución
              </p>
              <h3 className="text-xl font-semibold mb-6">¿Tienes empresa?</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <SelectCard
                  title="Sí, ya tengo mi empresa"
                  subtitle="Necesito servicios contables y tributarios para mi empresa existente"
                  icon={<Building className="w-8 h-8" />}
                  active={state.hasCompany === true}
                  onClick={() => {
                    dispatch({ payload: { hasCompany: true } });
                    trackQuoteEvent('step_complete', 'has_company', { hasCompany: true });
                  }}
                  data-gtm="quote_has_company_yes"
                />
                <SelectCard
                  title="No, necesito crearla"
                  subtitle="Quiero formalizar mi negocio y necesito ayuda con el proceso"
                  icon={<Star className="w-8 h-8" />}
                  active={state.hasCompany === false}
                  onClick={() => {
                    dispatch({ payload: { hasCompany: false } });
                    trackQuoteEvent('step_complete', 'has_company', { hasCompany: false });
                  }}
                  data-gtm="quote_has_company_no"
                />
              </div>

              <Pill type="info">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  No te preocupes, en ambos casos te acompañaremos en todo el proceso
                </div>
              </Pill>

              <div className="flex justify-end mt-8">
                <CTAButton
                  onClick={() => {
                    nextStep();
                    trackQuoteEvent('start', 'welcome', { hasCompany: state.hasCompany });
                  }}
                  disabled={state.hasCompany === null}
                  data-gtm="quote_start_continue"
                >
                  Continuar →
                </CTAButton>
              </div>
            </div>
          </StepLayout>
        )}

        {/* Step 1: Company Type */}
        {state.currentStep === 0 && (
          <StepLayout step={0} total={5}>
            <div>
              <h2 className="text-2xl font-bold mb-2">¿Qué tipo de empresa tienes?</h2>
              <p className="text-gray-600 mb-6">Selecciona el tipo de empresa para personalizar tu cotización</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(CompanyTypes).map(([key, label]) => (
                  <SelectCard
                    key={key}
                    title={label}
                    subtitle={key === 'persona' ? 'Con o sin giro comercial' :
                             key === 'eirl' ? 'Empresa Individual de Responsabilidad Limitada' :
                             key === 'spa' ? 'Sociedad por Acciones' : 'Ltda. o S.A.'}
                    icon={
                      key === 'persona' ? <User className="w-8 h-8" /> :
                      key === 'eirl' ? <Store className="w-8 h-8" /> :
                      key === 'spa' ? <Building className="w-8 h-8" /> :
                      <University className="w-8 h-8" />
                    }
                    active={state.companyType === key}
                    onClick={() => {
                      dispatch({ payload: { companyType: key } });
                      trackQuoteEvent('step_complete', 'company_type', { companyType: key });
                    }}
                    data-gtm={`quote_company_type_${key}`}
                  />
                ))}
              </div>

              <p className="text-sm text-blue-600 mb-8 text-center">
                <a href="#" className="underline">¿No estoy seguro del tipo de empresa?</a>
              </p>

              <div className="flex justify-between">
                <CTAButton onClick={prevStep} variant="ghost">
                  ← Volver
                </CTAButton>
                <CTAButton
                  onClick={nextStep}
                  disabled={!state.companyType}
                >
                  Continuar →
                </CTAButton>
              </div>
            </div>
          </StepLayout>
        )}

        {/* Step 2: Company Size */}
        {state.currentStep === 1 && (
          <StepLayout step={1} total={5}>
            <div>
              <h2 className="text-2xl font-bold mb-2">¿Qué tan grande es tu empresa?</h2>
              <p className="text-gray-600 mb-6">Esto nos ayuda a calcular un precio justo para tu negocio</p>

              <div className="space-y-4 mb-6">
                <SelectCard
                  title="Emprendiendo"
                  subtitle="Ventas anuales hasta $30M"
                  icon={<Sprout className="w-8 h-8" />}
                  active={state.size === 'emprendiendo'}
                  onClick={() => {
                    dispatch({ payload: { size: 'emprendiendo' } });
                    trackQuoteEvent('step_complete', 'company_size', { size: 'emprendiendo' });
                  }}
                  data-gtm="quote_size_emprendiendo"
                />
                <SelectCard
                  title="En Crecimiento"
                  subtitle="$30M – $150M anuales"
                  icon={<TrendingUp className="w-8 h-8" />}
                  active={state.size === 'crecimiento'}
                  onClick={() => {
                    dispatch({ payload: { size: 'crecimiento' } });
                    trackQuoteEvent('step_complete', 'company_size', { size: 'crecimiento' });
                  }}
                  data-gtm="quote_size_crecimiento"
                />
                <SelectCard
                  title="Consolidada"
                  subtitle="Más de $150M anuales"
                  icon={<Rocket className="w-8 h-8" />}
                  active={state.size === 'consolidada'}
                  onClick={() => {
                    dispatch({ payload: { size: 'consolidada' } });
                    trackQuoteEvent('step_complete', 'company_size', { size: 'consolidada' });
                  }}
                  data-gtm="quote_size_consolidada"
                />
              </div>

              <Pill type="info">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Esta información es solo para calcular un precio referencial. No te pediremos cifras exactas.
                </div>
              </Pill>

              <div className="flex justify-between mt-8">
                <CTAButton onClick={prevStep} variant="ghost">
                  ← Volver
                </CTAButton>
                <CTAButton
                  onClick={nextStep}
                  disabled={!state.size}
                >
                  Continuar →
                </CTAButton>
              </div>
            </div>
          </StepLayout>
        )}

        {/* Step 3: Employees */}
        {state.currentStep === 2 && (
          <StepLayout step={2} total={5}>
            <div>
              <h2 className="text-2xl font-bold mb-2">¿Tienes trabajadores contratados?</h2>
              <p className="text-gray-600 mb-6">Esto nos ayuda a incluir servicios de gestión laboral si los necesitas</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <SelectCard
                  title="Sí"
                  subtitle="Tengo trabajadores contratados"
                  icon={<Users className="w-8 h-8" />}
                  active={state.hasEmployees === true}
                  onClick={() => dispatch({ payload: { hasEmployees: true } })}
                />
                <SelectCard
                  title="No"
                  subtitle="No tengo trabajadores"
                  icon={<UserCheck className="w-8 h-8" />}
                  active={state.hasEmployees === false}
                  onClick={() => dispatch({ payload: { hasEmployees: false, employeesCount: 0 } })}
                />
              </div>

              {state.hasEmployees === true && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cuántos trabajadores tienes? (Opcional)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8A3F83] focus:border-transparent"
                    placeholder="Número de trabajadores"
                    value={state.employeesCount || ''}
                    onChange={(e) => dispatch({ payload: { employeesCount: parseInt(e.target.value) || 0 } })}
                  />
                </div>
              )}

              <Pill type="info">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Si tienes trabajadores, incluiremos gestión de contratos, liquidaciones de sueldo y cumplimiento laboral en tu plan.
                </div>
              </Pill>

              <div className="flex justify-between mt-8">
                <CTAButton onClick={prevStep} variant="ghost">
                  ← Volver
                </CTAButton>
                <CTAButton
                  onClick={nextStep}
                  disabled={state.hasEmployees === null}
                >
                  Continuar →
                </CTAButton>
              </div>
            </div>
          </StepLayout>
        )}

        {/* Step 4: Support Level */}
        {state.currentStep === 3 && (
          <StepLayout step={3} total={5}>
            <div>
              <h2 className="text-2xl font-bold mb-2">¿Qué tipo de apoyo necesitas?</h2>
              <p className="text-gray-600 mb-6">Elige el plan que mejor se adapte a tus necesidades</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <SelectCard
                    title="Plan Completo"
                    subtitle="Asesoría integral"
                    icon={<Star className="w-8 h-8" />}
                    active={state.support === 'completo'}
                    onClick={() => dispatch({ payload: { support: 'completo' } })}
                    recommended
                  />
                  <div className="ml-6 space-y-2 mt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Asesor dedicado
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Planificación tributaria
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Gestión de trabajadores
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Reportes mensuales detallados
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Respuesta prioritaria
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Reuniones de estrategia
                    </div>
                  </div>
                </div>

                <div>
                  <SelectCard
                    title="Plan Esencial"
                    subtitle="Lo básico para cumplir"
                    icon={
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-3-7v2h-2v-2h2zm-4 0v2H9v-2h2z"/>
                      </svg>
                    }
                    active={state.support === 'esencial'}
                    onClick={() => dispatch({ payload: { support: 'esencial' } })}
                  />
                  <div className="ml-6 space-y-2 mt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                      Declaraciones mensuales
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Libro de compras y ventas
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Balance anual
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Soporte por email
                    </div>
                  </div>
                </div>
              </div>

              <Pill type="warning">
                <Star className="inline w-4 h-4 mr-1" /> Tip: El 85% de nuestros clientes eligen el Plan Completo por la tranquilidad y el ahorro en multas que genera la planificación tributaria.
              </Pill>

              <div className="flex justify-between mt-8">
                <CTAButton onClick={prevStep} variant="ghost">
                  ← Volver
                </CTAButton>
                <CTAButton
                  onClick={goToResult}
                  disabled={!state.support}
                >
                  Ver mi cotización →
                </CTAButton>
              </div>
            </div>
          </StepLayout>
        )}

        {/* Step 5: Result */}
        {state.currentStep === 4 && (
          <StepLayout step={4} total={5}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center flex items-center justify-center gap-2">
                ¡Tu cotización está lista!
                <CheckCircle className="w-8 h-8 text-green-500" />
              </h2>
              <p className="text-gray-600 text-center mt-1">
                Basado en la información proporcionada, este es tu plan personalizado
              </p>

              {/* Price Card */}
              <div className="mt-6 rounded-3xl p-6 md:p-8 bg-gradient-to-b from-[#F4E9F3] to-[#F8EEF6] border border-[#EED8EA]">
                <div className="text-sm text-gray-600 text-center">
                  {state.isCreation ? 'Costo de formalización' : 'Plan mensual'}
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mt-2">
                  {formatCLP(state.resultCLP)}
                </div>
                {state.resultUF && (
                  <div className="text-gray-600 text-center mt-1">({state.resultUF.toFixed(2)} UF)</div>
                )}
                <div className="text-gray-500 text-center">
                  {state.isCreation ? '+ IVA (costo único)' : '+ IVA mensual'}
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 rounded-3xl bg-white border border-gray-200 p-6 md:p-7">
                <h3 className="text-lg font-bold text-gray-900">
                  {state.isCreation ? 'El proceso incluye:' : 'Tu plan incluye:'}
                </h3>
                <div className="grid gap-3 mt-3">
                  {(state.isCreation ? (
                    state.support === 'completo' ? [
                      'Constitución de sociedad completa',
                      'Inscripción en SII y obtención de RUT',
                      'Apertura de cuenta corriente',
                      'Timbres y documentación legal',
                      'Primera asesoría contable incluida',
                      'Seguimiento post-constitución'
                    ] : [
                      'Constitución de sociedad',
                      'Inscripción en SII y RUT',
                      'Documentación básica',
                      'Asesoría inicial'
                    ]
                  ) : (
                    state.support === 'completo' ? [
                      'Asesor dedicado',
                      'Planificación tributaria',
                      'Reportes mensuales detallados',
                      'Gestión completa de trabajadores',
                      'Respuesta prioritaria'
                    ] : [
                      'Declaraciones mensuales',
                      'Libro de compras y ventas',
                      'Balance anual',
                      'Soporte por email'
                    ]
                  )).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 text-gray-700">
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-3xl border border-[#E8D9E7] bg-gradient-to-b from-[#F7EEF6] to-[#F3E5F2] p-6 md:p-7 hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition">
                  <MessageCircle className="w-11 h-11 text-[#8A3F83]" />
                  <div className="text-xl font-extrabold text-gray-900 mt-2">Hablar por WhatsApp</div>
                  <div className="text-gray-600">Conversación directa e inmediata con un asesor</div>
                  <button
                    onClick={() => {
                      handleContactClick('whatsapp');
                      trackCTAClick('Hablar ahora', 'quote_result', 'cotizador', 'whatsapp');
                      trackQuoteEvent('complete', 'final_result', {
                        resultUF: state.resultUF,
                        resultCLP: state.resultCLP,
                        channel: 'whatsapp'
                      });
                    }}
                    data-channel="whatsapp"
                    data-gtm="quote_cta_whatsapp"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#8A3F83] text-white font-semibold px-5 py-3 shadow-[0_8px_0_#111] hover:translate-y-[-1px] hover:shadow-[0_7px_0_#111] active:translate-y-0 active:shadow-none transition focus:outline-none focus:ring-2 focus:ring-black/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Hablar ahora
                  </button>
                  <div className="text-sm text-gray-500 mt-2">Respuesta inmediata</div>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-gradient-to-b from-white to-[#EFF3F6] p-6 md:p-7 hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition">
                  <Video className="w-11 h-11 text-gray-800" />
                  <div className="text-xl font-extrabold text-gray-900 mt-2">Agendar reunión virtual</div>
                  <div className="text-gray-600">Videollamada de 30 minutos con un asesor experto</div>
                  <button
                    onClick={() => {
                      handleContactClick('meeting');
                      trackCTAClick('Agendar reunión', 'quote_result', 'cotizador', 'meeting');
                      trackQuoteEvent('complete', 'final_result', {
                        resultUF: state.resultUF,
                        resultCLP: state.resultCLP,
                        channel: 'meeting'
                      });
                    }}
                    data-channel="meeting"
                    data-gtm="quote_cta_meeting"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white text-[#8A3F83] font-semibold px-5 py-3 shadow-[0_8px_0_#111] hover:translate-y-[-1px] hover:shadow-[0_7px_0_#111] active:translate-y-0 active:shadow-none transition focus:outline-none focus:ring-2 focus:ring-[#8A3F83]/20"
                  >
                    <Video className="w-4 h-4" />
                    Agendar reunión
                  </button>
                  <div className="text-sm text-gray-500 mt-2">Elige tu horario preferido</div>
                </div>
              </div>

              {/* Separator + Navigation */}
              <div className="mt-8 mb-3 h-px bg-gray-200"></div>
              <button
                onClick={prevStep}
                className="block text-center text-gray-600 hover:text-gray-900 mx-auto"
              >
                ← Volver al paso anterior
              </button>

              {/* Success Pill */}
              <div className="mt-4 rounded-2xl bg-[#EBF8EE] text-[#147D3F] border border-[#BAE7C4] px-5 py-4 text-center flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Tu cotización ha sido calculada y está lista para discutir
              </div>
            </div>
          </StepLayout>
        )}
      </AnimatePresence>

      {/* Video Gate Modal */}
      <MeetingVideoGate
        open={showVideoGate}
        onClose={() => setShowVideoGate(false)}
        src="/video_Contador.mov"
        poster=""
        schedulerUrl="https://outlook.office.com/book/Contadoor@contadoor.cl/s/328-yS0DYEm9h2tm4lDIHQ2?ismsaljsauthenabled=true"
        title="Conoce cómo transformamos tu contabilidad"
        subtitle="2 minutos que cambiarán tu perspectiva"
        unlockAt={0.6}
      />
    </div>
  );
}