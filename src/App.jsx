import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import GTMTracker from './components/GTMTracker';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Cotizador from './pages/Cotizador';
import Contacto from './pages/Contacto';
import ComoFunciona from './pages/ComoFunciona';
import PorQueContadoor from './pages/PorQueContadoor';
import SobreNosotros from './pages/SobreNosotros';
import Recursos from './pages/Recursos';
import Blog from './pages/Blog';
import Privacidad from './pages/Privacidad';
import Terminos from './pages/Terminos';

function PreviewWrapper({ children }) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [frameDevice, setFrameDevice] = useState('desktop');
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const preview = urlParams.get('preview') === 'true';
    setIsPreviewMode(preview);
  }, [location]);

  if (!isPreviewMode) {
    return children;
  }

  const deviceClasses = {
    desktop: 'preview-frame--desktop',
    tablet: 'preview-frame--tablet',
    mobile: 'preview-frame--mobile'
  };

  return (
    <div className="full-screen-preview">
      <div className="preview__header">
        <div className="preview__logo">
          <a href="/" className="preview__logo-link">
            <span className="preview__logo-text">Contadoor</span>
            <span className="preview__logo-badge">Vista Previa</span>
          </a>
        </div>

        <div className="preview__actions">
          <div className="preview__responsive">
            <button 
              className={`preview__device-btn ${frameDevice === 'desktop' ? 'active' : ''}`}
              onClick={() => setFrameDevice('desktop')}
              title="Vista Desktop"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/>
              </svg>
            </button>
            <button 
              className={`preview__device-btn ${frameDevice === 'tablet' ? 'active' : ''}`}
              onClick={() => setFrameDevice('tablet')}
              title="Vista Tablet"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-6 22c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7-4H5V4h14v14z"/>
              </svg>
            </button>
            <button 
              className={`preview__device-btn ${frameDevice === 'mobile' ? 'active' : ''}`}
              onClick={() => setFrameDevice('mobile')}
              title="Vista Móvil"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/>
              </svg>
            </button>
          </div>
          <a className="preview__cta" href="/contacto">
            Solicitar Demo
          </a>
        </div>
      </div>

      <div className={`preview__frame-wrapper ${deviceClasses[frameDevice]}`}>
        <div className="preview__frame-container">
          {children}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GTMTracker />
      <PreviewWrapper>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/cotizador" element={<Cotizador />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/como-funciona" element={<ComoFunciona />} />
              <Route path="/por-que-contadoor" element={<PorQueContadoor />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/recursos" element={<Recursos />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/terminos" element={<Terminos />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </PreviewWrapper>
    </Router>
  )
}

export default App
