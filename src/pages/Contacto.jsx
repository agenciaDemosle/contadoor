import { useState, useRef, useEffect } from 'react';
import Container from '../components/Container';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import { trackFormStart, trackFormSubmit, trackConversion, trackExternalLink, trackPageView } from '../lib/gtm';

function ContactCTA({
  waHref = "https://wa.me/56979881891",
  meetHref = "https://outlook.office.com/book/Contadoor@contadoor.cl/s/328-yS0DYEm9h2tm4lDIHQ2",
  phone = "+569 79881891",
  hoursTitle = "Lunes a Viernes",
  hoursTime = "9:00 - 18:00"
}) {
  const handleContactClick = (channel) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'contact_action',
        channel: channel
      });
    }
  };

  return (
    <section className="bg-[#F7F9FB] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Hablemos de tu empresa
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Contáctanos y descubre cómo podemos ayudarte a crecer
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-10">
          {/* WhatsApp Card */}
          <div className="rounded-3xl border border-[#E8D9E7] bg-gradient-to-b from-[#F7EEF6] to-[#F3E5F2] p-8 shadow-[0_12px_40px_rgba(17,24,39,0.08)] hover:translate-y-[-2px] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition">
            <div className="mx-auto w-14 h-14 grid place-items-center rounded-full bg-[#8A3F83]/12 text-[#8A3F83] text-2xl">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 text-center mt-3">
              Habla con nosotros ahora
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Respuesta inmediata por WhatsApp. Resolvemos tus dudas y te asesoramos en tiempo real.
            </p>
            <button
              onClick={() => {
                handleContactClick('whatsapp');
                window.open(waHref, '_blank');
              }}
              disabled={!waHref}
              data-gtm="contact_whatsapp_cta"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8A3F83] text-white font-semibold px-6 py-3 shadow-[0_8px_0_#111] hover:translate-y-[-1px] hover:shadow-[0_7px_0_#111] active:translate-y-0 active:shadow-none transition focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Iniciar conversación por WhatsApp
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Atención inmediata de lunes a viernes
            </p>
          </div>

          {/* Meeting Card */}
          <div className="rounded-3xl border border-gray-200 bg-gradient-to-b from-white to-[#F6F8FA] p-8 shadow-[0_12px_40px_rgba(17,24,39,0.06)] hover:translate-y-[-2px] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition">
            <div className="mx-auto w-14 h-14 grid place-items-center rounded-full bg-gray-900/10 text-gray-900 text-2xl">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 text-center mt-3">
              Agenda una reunión virtual
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Reunión personalizada por videollamada. Analizamos tu caso y te ofrecemos soluciones a medida.
            </p>
            <button
              onClick={() => {
                handleContactClick('meeting');
                window.open(meetHref, '_blank');
              }}
              disabled={!meetHref}
              data-gtm="contact_meeting_cta"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#8A3F83] text-[#8A3F83] font-semibold px-6 py-3 hover:bg-[#8A3F83] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              Agendar videollamada
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Elige el horario que más te acomode
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="rounded-3xl bg-white border border-gray-200 p-6 text-center shadow-sm">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">WhatsApp</h4>
            <p className="text-gray-600">{phone}</p>
          </div>

          <div className="rounded-3xl bg-white border border-gray-200 p-6 text-center shadow-sm">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Horario</h4>
            <p className="text-gray-600">{hoursTitle}<br/>{hoursTime}</p>
          </div>

          <div className="rounded-3xl bg-white border border-gray-200 p-6 text-center shadow-sm">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Respuesta</h4>
            <p className="text-gray-600">Inmediata por WhatsApp<br/>24 hrs por email</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    mensaje: ''
  });
  const [hasStartedForm, setHasStartedForm] = useState(false);

  // Track page load
  useEffect(() => {
    trackPageView('Contacto', '/contacto');
  }, []);

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
    <ContactCTA
      waHref="https://wa.me/56979881891"
      meetHref="https://outlook.office.com/book/Contadoor@contadoor.cl/s/328-yS0DYEm9h2tm4lDIHQ2"
      phone="+569 79881891"
      hoursTitle="Lunes a Viernes"
      hoursTime="9:00 - 18:00"
    />
  );
}