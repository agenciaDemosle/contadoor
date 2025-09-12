import Container from '../components/Container';
import Section from '../components/Section';
import SEO from '../components/SEO';

export default function Terminos() {
  return (
    <>
      <SEO 
        title="Términos y Condiciones"
        description="Términos y condiciones de uso de los servicios de Contadoor. Lee nuestros términos de servicio."
        keywords="términos condiciones, términos servicio, condiciones uso, contrato servicio contadoor"
        noindex={true}
      />
      
      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-black mb-8">Términos y Condiciones</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Última actualización:</strong> 1 de Diciembre, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Aceptación de los Términos</h2>
                <p className="text-gray-700 mb-4">
                  Al contratar los servicios de Contadoor, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestros servicios.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Descripción de los Servicios</h2>
                <p className="text-gray-700 mb-4">
                  Contadoor ofrece servicios de:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Contabilidad y gestión financiera</li>
                  <li>Asesoría tributaria y cumplimiento de obligaciones fiscales</li>
                  <li>Gestión de remuneraciones y cumplimiento laboral</li>
                  <li>Asesoría estratégica empresarial</li>
                  <li>Creación y formalización de empresas</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  Los servicios específicos contratados se detallan en el plan seleccionado por el cliente.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Obligaciones del Cliente</h2>
                <p className="text-gray-700 mb-4">
                  El cliente se compromete a:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Proporcionar información veraz, completa y oportuna</li>
                  <li>Entregar documentación requerida en los plazos establecidos</li>
                  <li>Informar cambios relevantes en su situación empresarial</li>
                  <li>Pagar puntualmente los servicios contratados</li>
                  <li>Mantener confidencialidad de las credenciales de acceso proporcionadas</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Obligaciones de Contadoor</h2>
                <p className="text-gray-700 mb-4">
                  Contadoor se compromete a:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Prestar los servicios con profesionalismo y diligencia</li>
                  <li>Mantener confidencialidad de la información del cliente</li>
                  <li>Cumplir con los plazos legales establecidos</li>
                  <li>Mantener actualizado al cliente sobre cambios normativos relevantes</li>
                  <li>Responder consultas en un plazo máximo de 24 horas hábiles</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Tarifas y Pagos</h2>
                <p className="text-gray-700 mb-4">
                  Las tarifas de los servicios se establecen según el plan contratado y están sujetas a:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Los precios están expresados en UF + IVA</li>
                  <li>El pago debe realizarse mensualmente por adelantado</li>
                  <li>El atraso en el pago puede resultar en la suspensión de servicios</li>
                  <li>Los precios pueden ajustarse con 30 días de aviso previo</li>
                  <li>No hay reembolsos por servicios ya prestados</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Responsabilidad</h2>
                <p className="text-gray-700 mb-4">
                  Contadoor no será responsable por:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Multas o sanciones derivadas de información incorrecta o incompleta proporcionada por el cliente</li>
                  <li>Decisiones empresariales tomadas por el cliente basadas en nuestras recomendaciones</li>
                  <li>Pérdidas indirectas o consecuenciales</li>
                  <li>Problemas derivados de casos fortuitos o fuerza mayor</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  Nuestra responsabilidad máxima está limitada al valor de los servicios prestados en los últimos 3 meses.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Confidencialidad</h2>
                <p className="text-gray-700 mb-4">
                  Ambas partes se comprometen a mantener confidencial toda información sensible intercambiada durante la prestación de servicios. Esta obligación permanece vigente incluso después de terminada la relación contractual.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Propiedad Intelectual</h2>
                <p className="text-gray-700 mb-4">
                  Todo el material, metodologías, software y contenido proporcionado por Contadoor permanece como propiedad intelectual de la empresa. El cliente no puede reproducir, distribuir o utilizar este material fuera del contexto de los servicios contratados.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Duración y Terminación</h2>
                <p className="text-gray-700 mb-4">
                  Los servicios tienen una duración mínima de 3 meses. Después de este período:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>El contrato se renueva automáticamente mes a mes</li>
                  <li>Cualquier parte puede terminar el contrato con 30 días de aviso</li>
                  <li>La terminación debe ser comunicada por escrito</li>
                  <li>Se debe cumplir con todas las obligaciones pendientes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Modificaciones</h2>
                <p className="text-gray-700 mb-4">
                  Contadoor se reserva el derecho de modificar estos términos y condiciones. Los cambios serán notificados con 30 días de anticipación y se considerarán aceptados si el cliente continúa utilizando los servicios.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">11. Ley Aplicable y Jurisdicción</h2>
                <p className="text-gray-700 mb-4">
                  Estos términos se rigen por las leyes de la República de Chile. Cualquier disputa será sometida a los tribunales competentes de Santiago de Chile.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">12. Contacto</h2>
                <p className="text-gray-700 mb-4">
                  Para consultas sobre estos términos y condiciones:
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