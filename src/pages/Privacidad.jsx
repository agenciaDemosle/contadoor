import Container from '../components/Container';
import Section from '../components/Section';
import SEO from '../components/SEO';

export default function Privacidad() {
  return (
    <>
      <SEO 
        title="Política de Privacidad"
        description="Política de privacidad de Contadoor. Conoce cómo protegemos y manejamos tu información personal."
        keywords="política privacidad, protección datos, privacidad contadoor, datos personales"
        noindex={true}
      />
      
      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-black mb-8">Política de Privacidad</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Última actualización:</strong> 1 de Diciembre, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Información que Recopilamos</h2>
                <p className="text-gray-700 mb-4">
                  En Contadoor recopilamos información que nos proporcionas directamente, tales como:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Nombre y apellidos</li>
                  <li>Correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Información de tu empresa (RUT, razón social, giro)</li>
                  <li>Información financiera y contable necesaria para prestarte nuestros servicios</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Uso de la Información</h2>
                <p className="text-gray-700 mb-4">
                  Utilizamos la información recopilada para:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Proporcionar nuestros servicios contables y de asesoría</li>
                  <li>Comunicarnos contigo sobre tu cuenta y servicios</li>
                  <li>Cumplir con obligaciones legales y tributarias</li>
                  <li>Mejorar nuestros servicios y atención al cliente</li>
                  <li>Enviarte información relevante sobre actualizaciones tributarias y contables</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Protección de Datos</h2>
                <p className="text-gray-700 mb-4">
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, pérdida o alteración. Esto incluye:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Encriptación de datos sensibles</li>
                  <li>Acceso restringido a la información personal</li>
                  <li>Monitoreo continuo de nuestros sistemas</li>
                  <li>Capacitación regular de nuestro equipo en protección de datos</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Compartir Información</h2>
                <p className="text-gray-700 mb-4">
                  No vendemos ni alquilamos tu información personal a terceros. Podemos compartir tu información únicamente en los siguientes casos:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Con tu consentimiento explícito</li>
                  <li>Para cumplir con obligaciones legales (SII, organismos reguladores)</li>
                  <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio, bajo estrictos acuerdos de confidencialidad</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Tus Derechos</h2>
                <p className="text-gray-700 mb-4">
                  Tienes derecho a:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Acceder a tu información personal</li>
                  <li>Corregir información inexacta</li>
                  <li>Solicitar la eliminación de tu información (sujeto a obligaciones legales)</li>
                  <li>Oponerte al procesamiento de tus datos</li>
                  <li>Solicitar la portabilidad de tus datos</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
                <p className="text-gray-700 mb-4">
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web, analizar el tráfico y personalizar el contenido. Puedes configurar tu navegador para rechazar cookies, aunque esto podría afectar algunas funcionalidades del sitio.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Retención de Datos</h2>
                <p className="text-gray-700 mb-4">
                  Mantenemos tu información personal durante el tiempo necesario para proporcionar nuestros servicios y cumplir con obligaciones legales. Los registros contables y tributarios se mantienen según lo requerido por la legislación chilena (generalmente 5 años).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Cambios a esta Política</h2>
                <p className="text-gray-700 mb-4">
                  Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre cambios significativos por correo electrónico o mediante un aviso en nuestro sitio web.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Contacto</h2>
                <p className="text-gray-700 mb-4">
                  Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tu información, contáctanos:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> info@contadoor.cl<br />
                    <strong>Teléfono:</strong> +56 9 7988 1891<br />
                    <strong>Dirección:</strong> Santiago, Chile
                  </p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}