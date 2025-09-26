import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, Send } from 'lucide-react';
import { setLocal } from '../../lib/storage';
import { analytics } from '../../lib/analytics';

const questions = [
  {
    id: 1,
    question: '¿Tienes tu contabilidad al día?',
    options: [
      { value: 3, label: 'Sí, todo al día' },
      { value: 2, label: 'Con retraso menor a 2 meses' },
      { value: 1, label: 'Con retraso de 2-6 meses' },
      { value: 0, label: 'Con retraso mayor a 6 meses' }
    ]
  },
  {
    id: 2,
    question: '¿Has tenido multas del SII en el último año?',
    options: [
      { value: 3, label: 'No, ninguna' },
      { value: 2, label: 'Una multa menor' },
      { value: 1, label: '2-3 multas' },
      { value: 0, label: 'Más de 3 multas' }
    ]
  },
  {
    id: 3,
    question: '¿Conoces tu flujo de caja proyectado?',
    options: [
      { value: 3, label: 'Sí, lo reviso mensualmente' },
      { value: 2, label: 'Tengo una idea general' },
      { value: 1, label: 'No muy claro' },
      { value: 0, label: 'No lo conozco' }
    ]
  },
  {
    id: 4,
    question: '¿Tienes separado lo personal de lo empresarial?',
    options: [
      { value: 3, label: 'Completamente separado' },
      { value: 2, label: 'Mayormente separado' },
      { value: 1, label: 'Algo mezclado' },
      { value: 0, label: 'Todo mezclado' }
    ]
  },
  {
    id: 5,
    question: '¿Recibes reportes financieros mensuales?',
    options: [
      { value: 3, label: 'Sí, completos y a tiempo' },
      { value: 2, label: 'Sí, pero básicos' },
      { value: 1, label: 'Ocasionalmente' },
      { value: 0, label: 'Nunca' }
    ]
  },
  {
    id: 6,
    question: '¿Tu contador actual es proactivo con recomendaciones?',
    options: [
      { value: 3, label: 'Muy proactivo' },
      { value: 2, label: 'Algo proactivo' },
      { value: 1, label: 'Solo cuando pregunto' },
      { value: 0, label: 'Nunca da recomendaciones' }
    ]
  },
  {
    id: 7,
    question: '¿Qué tan satisfecho estás con tu gestión contable actual?',
    options: [
      { value: 3, label: 'Muy satisfecho' },
      { value: 2, label: 'Satisfecho' },
      { value: 1, label: 'Poco satisfecho' },
      { value: 0, label: 'Insatisfecho' }
    ]
  }
];

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 3;
    return Math.round((totalScore / maxScore) * 100);
  };

  const handleSubmit = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
    
    setLocal('quizResults', { score: finalScore, answers, date: new Date().toISOString() });
    analytics.quizSubmitted(finalScore, answers);
    
    // TODO_AURORA: Enviar a endpoint real
    try {
      await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: finalScore, answers })
      });
    } catch (error) {
      console.log('Quiz submission stored locally');
    }
  };

  const getResultMessage = () => {
    if (score >= 70) {
      return {
        type: 'success',
        icon: CheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        title: '¡Excelente estado!',
        message: 'Tu gestión contable está en buen camino. Podemos ayudarte a optimizar aún más.'
      };
    } else if (score >= 40) {
      return {
        type: 'warning',
        icon: AlertCircle,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        title: 'Hay oportunidades de mejora',
        message: 'Identificamos áreas importantes para optimizar. Contadoor puede hacer la diferencia.'
      };
    } else {
      return {
        type: 'danger',
        icon: XCircle,
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        title: 'Necesitas apoyo urgente',
        message: 'Tu situación requiere atención inmediata. Podemos ayudarte a ordenar y optimizar tu gestión.'
      };
    }
  };

  const result = showResults ? getResultMessage() : null;

  return (
    <section id="quiz" className="py-16 bg-gradient-to-br from-brand-primary/5 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-brand-dark mb-4">
              Quiz de Diagnóstico Rápido
            </h2>
            <p className="text-gray-600">
              Evalúa el estado de tu gestión contable en 2 minutos
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-8">
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">
                        Pregunta {currentQuestion + 1} de {questions.length}
                      </span>
                      <span className="text-sm text-brand-primary font-medium">
                        {Math.round(((currentQuestion + 1) / questions.length) * 100)}% completado
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-brand-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-brand-dark mb-6">
                      {questions[currentQuestion].question}
                    </h3>
                    
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, idx) => (
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          key={option.value}
                          className="flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-brand-primary/50"
                          style={{
                            borderColor: answers[questions[currentQuestion].id] === option.value 
                              ? '#A05699' 
                              : '#e5e7eb'
                          }}
                        >
                          <input
                            type="radio"
                            name={`question-${questions[currentQuestion].id}`}
                            value={option.value}
                            checked={answers[questions[currentQuestion].id] === option.value}
                            onChange={() => handleAnswer(questions[currentQuestion].id, option.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3"
                            style={{
                              borderColor: answers[questions[currentQuestion].id] === option.value 
                                ? '#A05699' 
                                : '#d1d5db'
                            }}
                          >
                            {answers[questions[currentQuestion].id] === option.value && (
                              <div className="w-2.5 h-2.5 bg-brand-primary rounded-full" />
                            )}
                          </div>
                          <span className="text-brand-dark">{option.label}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="px-6 py-2 text-brand-dark border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Anterior
                    </button>
                    
                    {currentQuestion === questions.length - 1 ? (
                      <button
                        onClick={handleSubmit}
                        disabled={Object.keys(answers).length !== questions.length}
                        className="px-6 py-2 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 group"
                      >
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        Enviar diagnóstico
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        disabled={!answers[questions[currentQuestion].id]}
                        className="px-6 py-2 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Siguiente
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${result.bg} ${result.border} border-2 mb-4`}
                  >
                    <result.icon className={`w-10 h-10 ${result.color}`} />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-brand-dark mb-2">
                    {result.title}
                  </h3>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-4xl font-bold text-brand-primary mb-4"
                  >
                    {score}%
                  </motion.div>
                  
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {result.message}
                  </p>
                  
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setCurrentQuestion(0);
                      setAnswers({});
                    }}
                    className="px-8 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 transition-colors"
                  >
                    Hacer quiz nuevamente
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Quiz;