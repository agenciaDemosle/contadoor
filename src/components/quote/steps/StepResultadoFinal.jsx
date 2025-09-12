import { motion } from 'framer-motion';
import { FaCheckCircle, FaPhone, FaEnvelope, FaWhatsapp, FaCalendarAlt, FaVideo } from 'react-icons/fa';
import { useState } from 'react';
import { sendLead } from '../../../lib/lead';

export default function StepResultadoFinal({ data, allData, updateData, onPrev, isFormalizacion }) {
  const [contactData, setContactData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // Calcular precio basado en el flujo y datos
  const calcularPrecio = () => {
    const UF_VALUE = 38000; // Valor aproximado de la UF
    
    if (isFormalizacion) {
      // Precios para creación de empresas
      const basePrice = allData.formalizacion?.plan === 'completo' ? 250000 : 150000;
      
      return {
        mensual: 0,
        formalizacion: basePrice,
        total: basePrice
      };
    } else {
      // Precios para empresa existente en UF
      let precioUF = 0;
      
      // Precio base según tamaño y plan
      const tamanoPreciosUF = {
        emprendiendo: { completo: 5, esencial: 1.5 },
        crecimiento: { completo: 10, esencial: 3 },
        consolidada: { completo: 20, esencial: 5 }
      };
      
      const tamano = allData.empresaExistente?.tamano || 'emprendiendo';
      const plan = allData.empresaExistente?.plan || 'esencial';
      
      precioUF = tamanoPreciosUF[tamano]?.[plan] || 1.5;
      
      // Ajuste por trabajadores: 0.30 UF por cada trabajador
      if (allData.empresaExistente?.hasTrabajadores && allData.empresaExistente?.cantidadTrabajadores) {
        const trabajadoresUF = allData.empresaExistente.cantidadTrabajadores * 0.30;
        precioUF += trabajadoresUF;
      }
      
      // Convertir UF a pesos
      const precioMensual = Math.round(precioUF * UF_VALUE);
      
      return {
        mensual: precioMensual,
        mensualUF: precioUF,
        formalizacion: 0,
        total: precioMensual
      };
    }
  };

  const precio = calcularPrecio();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      await sendLead({
        ...contactData,
        flujo: isFormalizacion ? 'formalizacion' : 'empresa-existente',
        datos: allData,
        precio: precio
      });
      setEnviado(true);
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Hubo un error al enviar tu información. Por favor intenta nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (enviado) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Cotización enviada exitosamente!
          </h2>
          <p className="text-gray-600 mb-6">
            Un asesor Contadoor se contactará contigo dentro de las próximas 24 horas
          </p>
          <div className="space-y-4 max-w-md mx-auto">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 mb-3">
                💡 También puedes:
              </p>
              <div className="space-y-3">
                <a 
                  href="https://outlook.office.com/book/Contadoor@contadoor.cl/s/328-yS0DYEm9h2tm4lDIHQ2"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all"
                >
                  <FaCalendarAlt />
                  <span>Agendar una reunión</span>
                </a>
                <a href="https://wa.me/56979881891" className="flex items-center justify-center space-x-2 text-green-600 hover:text-green-700">
                  <FaWhatsapp />
                  <span>WhatsApp +569 79881891</span>
                </a>
                <a href="mailto:contacto@contadoor.cl" className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700">
                  <FaEnvelope />
                  <span>contacto@contadoor.cl</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Tu cotización está lista! 🎉
          </h2>
          <p className="text-gray-600">
            Basado en la información proporcionada, este es tu plan personalizado
          </p>
        </div>

        {/* Resumen del precio */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 mb-8">
          <div className="text-center">
            {isFormalizacion ? (
              <>
                <p className="text-sm text-gray-600 mb-2">Inversión única de formalización</p>
                <p className="text-4xl font-bold text-primary mb-2">
                  {formatPrice(precio.formalizacion)}
                </p>
                <p className="text-sm text-gray-500">+ IVA</p>
                {allData.formalizacion?.plan === 'completo' && (
                  <p className="text-sm text-green-600 mt-2">
                    ✅ Incluye primer mes de servicio contable
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-2">Plan mensual</p>
                <p className="text-4xl font-bold text-primary mb-2">
                  {formatPrice(precio.mensual)}
                </p>
                {precio.mensualUF && (
                  <p className="text-lg text-gray-700 mb-1">
                    ({precio.mensualUF.toFixed(2)} UF)
                  </p>
                )}
                <p className="text-sm text-gray-500">+ IVA mensual</p>
              </>
            )}
          </div>
        </div>

        {/* Resumen de lo incluido */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-4">Tu plan incluye:</h3>
          {isFormalizacion ? (
            <div className="space-y-2">
              {allData.formalizacion?.plan === 'completo' ? (
                <>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Constitución de {allData.formalizacion?.tipoEmpresa?.toUpperCase()}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Inicio de actividades en SII</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Planificación tributaria inicial</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Apertura cuenta bancaria empresa</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Primer mes de contabilidad incluido</span>
                  </div>
                  {allData.formalizacion?.hasTrabajadores && (
                    <div className="flex items-start space-x-2">
                      <FaCheckCircle className="text-green-500 mt-0.5" />
                      <span className="text-sm">Gestión completa para contratación de trabajadores</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Constitución de empresa</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Inicio de actividades en SII</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">RUT empresarial</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Asesoría inicial</span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {allData.empresaExistente?.plan === 'completo' ? (
                <>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Asesor dedicado</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Planificación tributaria</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Reportes mensuales detallados</span>
                  </div>
                  {allData.empresaExistente?.hasTrabajadores && (
                    <div className="flex items-start space-x-2">
                      <FaCheckCircle className="text-green-500 mt-0.5" />
                      <span className="text-sm">Gestión completa de trabajadores</span>
                    </div>
                  )}
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Respuesta prioritaria</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Declaraciones mensuales</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Libro de compras y ventas</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Balance anual</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-sm">Soporte por email</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Formulario de contacto */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-bold text-gray-900 mb-4">
            Solicita tu cotización personalizada
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo *
            </label>
            <input
              type="text"
              name="nombre"
              value={contactData.nombre}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              name="telefono"
              value={contactData.telefono}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje adicional (opcional)
            </label>
            <textarea
              name="mensaje"
              value={contactData.mensaje}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onPrev}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              ← Volver
            </button>
            <button
              type="submit"
              disabled={enviando}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                enviando
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {enviando ? 'Enviando...' : 'Solicitar contacto →'}
            </button>
          </div>
        </form>

        {/* Separador con "O" */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500 font-medium">O si prefieres</span>
          </div>
        </div>

        {/* Opción de agendar reunión */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
          <div className="mb-4">
            <FaVideo className="text-4xl text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              ¿Prefieres una reunión personalizada?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Agenda una videollamada de 30 minutos con uno de nuestros asesores
            </p>
          </div>
          
          <a
            href="https://outlook.office.com/book/Contadoor@contadoor.cl/s/328-yS0DYEm9h2tm4lDIHQ2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <FaCalendarAlt className="text-lg" />
            <span>Agendar reunión ahora</span>
          </a>
          
          <p className="text-xs text-gray-500 mt-3">
            Elige el horario que más te acomode
          </p>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800 text-center">
            ⚡ Respuesta garantizada en menos de 24 horas hábiles
          </p>
        </div>
      </motion.div>
    </div>
  );
}