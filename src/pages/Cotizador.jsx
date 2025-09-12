import { useEffect } from 'react';
import Container from '../components/Container';
import CotizadorWizard from '../components/quote/CotizadorWizard';

export default function Cotizador() {
  useEffect(() => {
    // Mantener el scroll en la parte superior cuando se monta el componente
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 lg:py-12">
      <Container>
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            COTIZADOR ONLINE
          </span>
          <h1 className="text-3xl lg:text-4xl font-black mb-4">
            Cotiza tu plan en 2 minutos
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            Responde algunas preguntas y obtén una estimación personalizada al instante
          </p>
        </div>
        
        <div className="sticky top-20">
          <CotizadorWizard />
        </div>
      </Container>
    </div>
  );
}