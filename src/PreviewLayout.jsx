import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import PorQueContadoor from './pages/PorQueContadoor';
import Contacto from './pages/Contacto';
import Cotizador from './pages/Cotizador';
import Blog from './pages/Blog';
import Privacidad from './pages/Privacidad';
import Terminos from './pages/Terminos';

export default function PreviewLayout() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [frameLoading, setFrameLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Verificar si estamos en modo preview por query params o dominio
    const urlParams = new URLSearchParams(window.location.search);
    const preview = urlParams.get('preview') === 'true';
    setIsPreviewMode(preview);
  }, []);

  if (!isPreviewMode) {
    // Modo normal sin preview
    return (
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/por-que-contadoor" element={<PorQueContadoor />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/cotizador" element={<Cotizador />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/terminos" element={<Terminos />} />
      </Routes>
    );
  }

  // Modo preview con header y iframe
  return (
    <div className="full-screen-preview">
      {/* Header de vista previa */}
      <div className="preview__header">
        <div className="preview__envato-logo">
          <a className="header-envato_market" href="/">
            <svg width="140" height="32" viewBox="0 0 140 32" fill="none">
              <text x="0" y="24" fontSize="20" fontWeight="bold" fill="#A0569A">
                Contadoor
              </text>
            </svg>
          </a>
        </div>

        <div className="preview__actions">
          <div className="preview__action--responsive">
            <button className="preview__responsive-btn preview__responsive-btn--desktop active" title="Vista Desktop">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/>
              </svg>
            </button>
            <button className="preview__responsive-btn preview__responsive-btn--tablet" title="Vista Tablet">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-6 22c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7-4H5V4h14v14z"/>
              </svg>
            </button>
            <button className="preview__responsive-btn preview__responsive-btn--mobile" title="Vista Móvil">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/>
              </svg>
            </button>
          </div>
          <div className="preview__action--buy">
            <a className="header-buy-now" href="/contacto">
              Contactar ahora
            </a>
          </div>
        </div>
      </div>

      {/* Iframe con el contenido */}
      <div className="preview__frame-container">
        {frameLoading && (
          <div className="preview__loader">
            <div className="spinner"></div>
            <p>Cargando vista previa...</p>
          </div>
        )}
        <iframe 
          className="full-screen-preview__frame"
          src={window.location.origin + location.pathname}
          name="preview-frame"
          frameBorder="0"
          onLoad={() => setFrameLoading(false)}
          allow="geolocation 'self'; autoplay 'self'"
        />
      </div>

      <style jsx>{`
        .full-screen-preview {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          background: #f5f5f5;
        }

        .preview__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          height: 70px;
          background: white;
          border-bottom: 1px solid #e0e0e0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          z-index: 1000;
        }

        .preview__envato-logo {
          display: flex;
          align-items: center;
        }

        .header-envato_market {
          display: flex;
          align-items: center;
          text-decoration: none;
          font-size: 24px;
          font-weight: bold;
          color: #A0569A;
        }

        .preview__actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .preview__action--responsive {
          display: flex;
          gap: 8px;
          padding: 4px;
          background: #f8f8f8;
          border-radius: 8px;
        }

        .preview__responsive-btn {
          padding: 8px;
          background: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          color: #666;
          transition: all 0.2s;
        }

        .preview__responsive-btn:hover {
          background: #e0e0e0;
          color: #333;
        }

        .preview__responsive-btn.active {
          background: #A0569A;
          color: white;
        }

        .header-buy-now {
          display: inline-block;
          padding: 12px 32px;
          background: linear-gradient(135deg, #A0569A 0%, #7B3F78 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(160, 86, 154, 0.3);
        }

        .header-buy-now:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(160, 86, 154, 0.4);
        }

        .preview__frame-container {
          flex: 1;
          position: relative;
          overflow: hidden;
          background: #f5f5f5;
        }

        .preview__loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 10;
        }

        .spinner {
          width: 40px;
          height: 40px;
          margin: 0 auto 16px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #A0569A;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .preview__loader p {
          color: #666;
          font-size: 14px;
        }

        .full-screen-preview__frame {
          width: 100%;
          height: 100%;
          border: none;
          background: white;
        }

        /* Responsive design para diferentes tamaños de vista */
        @media (max-width: 768px) {
          .preview__action--responsive {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .preview__header {
            padding: 0 12px;
            height: 60px;
          }

          .header-buy-now {
            padding: 8px 20px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}