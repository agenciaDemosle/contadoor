import { useState, useEffect } from 'react';
import Card from '../../Card';
import Button from '../../Button';
import PriceBreakdown from '../PriceBreakdown';
import { estimate } from '../../../lib/pricing';
import { sendLead } from '../../../lib/lead';

export default function StepResultado({ allData, onPrev }) {
  const [estimate_, setEstimate] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    aceptaTerminos: false
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const result = estimate(allData);
    setEstimate(result);
  }, [allData]);

  const handleAcceptQuote = async () => {
    if (!contactData.nombre || !contactData.email || !contactData.telefono || !contactData.aceptaTerminos) {
      alert('Por favor completa todos los campos y acepta los términos');
      return;
    }

    setSending(true);
    try {
      await sendLead({
        quote: allData,
        estimate: estimate_,
        contact: contactData,
        timestamp: new Date().toISOString()
      });
      setSent(true);
    } catch (error) {
      console.error('Error enviando lead:', error);
      alert('Hubo un error. Por favor intenta nuevamente.');
    } finally {
      setSending(false);
    }
  };

  if (!estimate_) return <div>Calculando...</div>;

  if (sent) {
    return (
      <Card className="p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">¡Cotización enviada con éxito!</h2>
          <p className="text-gray-600">
            Un asesor se contactará contigo en las próximas 24 horas para afinar los detalles.
          </p>
        </div>
        <Button to="/">Volver al inicio</Button>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Tu estimación para Contadoor</h2>
        <div className="text-5xl font-black text-primary my-6">
          ${estimate_.min.toLocaleString('es-CL')} - ${estimate_.max.toLocaleString('es-CL')}
          <span className="text-lg font-normal text-gray-600 block mt-2">CLP/mes + IVA</span>
        </div>
      </div>

      <PriceBreakdown items={estimate_.items} />

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
        <p className="text-sm text-yellow-800">
          <strong>Nota importante:</strong> Esta es una estimación referencial basada en la información proporcionada. 
          El valor final será confirmado después de un diagnóstico inicial detallado de tu empresa.
        </p>
      </div>

      {!showContactForm ? (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => setShowContactForm(true)}>
            Acepto la cotización, quiero que me contacten
          </Button>
          <Button onClick={onPrev} variant="outline">
            Modificar respuestas
          </Button>
        </div>
      ) : (
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Completa tus datos para que te contactemos</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre completo</label>
              <input
                type="text"
                value={contactData.nombre}
                onChange={(e) => setContactData(prev => ({ ...prev, nombre: e.target.value }))}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={contactData.email}
                onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                placeholder="juan@empresa.cl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                type="tel"
                value={contactData.telefono}
                onChange={(e) => setContactData(prev => ({ ...prev, telefono: e.target.value }))}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                placeholder="+56 9 1234 5678"
              />
            </div>
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={contactData.aceptaTerminos}
                onChange={(e) => setContactData(prev => ({ ...prev, aceptaTerminos: e.target.checked }))}
                className="mr-2 mt-1"
              />
              <span className="text-sm text-gray-600">
                Acepto los términos y condiciones y autorizo a Contadoor a contactarme con información sobre sus servicios
              </span>
            </label>
            <div className="flex gap-4">
              <Button 
                onClick={handleAcceptQuote} 
                disabled={sending}
              >
                {sending ? 'Enviando...' : 'Enviar y solicitar contacto'}
              </Button>
              <Button 
                onClick={() => setShowContactForm(false)} 
                variant="outline"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}