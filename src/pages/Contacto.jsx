import { useState, useRef } from 'react';
import Container from '../components/Container';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import { trackFormStart, trackFormSubmit, trackConversion, trackExternalLink } from '../lib/gtm';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    mensaje: ''
  });
  const [hasStartedForm, setHasStartedForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Tracking del submit
    trackFormSubmit('contact_form', 'contact', {
      has_company: !!formData.empresa,
      message_length: formData.mensaje.length
    });
    
    // Tracking de conversión
    trackConversion('contact_form', null, {
      contact_method: 'web_form',
      source_page: 'contact'
    });
    
    console.log('Formulario enviado:', formData);
    alert('Gracias por contactarnos. Te responderemos pronto.');
  };

  const handleChange = (field, value) => {
    // Trackear inicio del formulario en la primera interacción
    if (!hasStartedForm) {
      trackFormStart('contact_form', 'contact');
      setHasStartedForm(true);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Section background="gray">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black mb-4">
              Hablemos de tu empresa
            </h1>
            <p className="text-xl text-gray-700">
              Contáctanos y descubre cómo podemos ayudarte a crecer
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre completo</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Teléfono</label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => handleChange('telefono', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Empresa</label>
                  <input
                    type="text"
                    value={formData.empresa}
                    onChange={(e) => handleChange('empresa', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mensaje</label>
                  <textarea
                    rows="4"
                    value={formData.mensaje}
                    onChange={(e) => handleChange('mensaje', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full shadow-brutal hover:shadow-none transform hover:translate-x-2 hover:translate-y-2 transition-all font-bold"
                  trackingName="Solicitar contacto ahora"
                  trackingSection="contact_form"
                  trackingPosition="form_submit"
                >
                  Solicitar contacto ahora
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3">Información de contacto</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start">
                    <span className="font-medium mr-2">Email:</span>
                    <span>contacto@contadoor.cl</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium mr-2">WhatsApp:</span>
                    <a 
                      href="https://wa.me/56979881891" 
                      className="text-green-600 hover:text-green-700 underline"
                      onClick={() => trackExternalLink('https://wa.me/56979881891', 'WhatsApp +569 79881891', 'contact_info')}
                    >
                      +569 79881891
                    </a>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium mr-2">Horario:</span>
                    <span>Lunes a Viernes, 9:00 - 18:00</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3">Agenda una reunión</h3>
                <p className="text-gray-700 mb-4">
                  Prefiere agendar directamente una videollamada con uno de nuestros asesores.
                </p>
                <Button 
                  href="https://outlook.office.com/book/Contadoor@contadoor.cl/s/328-yS0DYEm9h2tm4lDIHQ2" 
                  variant="outline"
                  className="w-full"
                  trackingName="Agendar una reunión"
                  trackingSection="contact_scheduling"
                  trackingPosition="contact_card"
                >
                  Agendar una reunión
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3">Oficina central</h3>
                <p className="text-gray-700">
                  Santiago, Chile
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Detalles específicos disponibles al agendar una reunión
                </p>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}