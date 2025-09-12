import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ 
  title = '', 
  description = '', 
  keywords = '',
  image = '/logo-contadoor.png',
  type = 'website',
  noindex = false 
}) {
  const location = useLocation();
  const baseUrl = 'https://contadoor.cl';
  const currentUrl = `${baseUrl}${location.pathname}`;
  
  // Título completo con formato consistente
  const fullTitle = title 
    ? `${title} | Contadoor - Somos la puerta a tu solución`
    : 'Contadoor - Somos la puerta a tu solución | Contabilidad y Finanzas Chile';
  
  // Descripción por defecto
  const fullDescription = description || 
    'Contadoor - Somos la puerta a tu solución. Servicios contables digitales para emprendedores y empresas en Chile. Contabilidad, finanzas, impuestos y gestión laboral.';
  
  // Keywords por defecto + adicionales
  const baseKeywords = 'contadoor, contabilidad, contador, finanzas, impuestos, SII, gestión laboral, emprendedor, empresa, Chile, Santiago';
  const fullKeywords = keywords ? `${baseKeywords}, ${keywords}` : baseKeywords;
  
  useEffect(() => {
    // Actualizar título
    document.title = fullTitle;
    
    // Actualizar meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    
    // Meta tags básicos
    updateMetaTag('description', fullDescription);
    updateMetaTag('keywords', fullKeywords);
    
    // Open Graph
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', fullDescription, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:image', `${baseUrl}${image}`, true);
    updateMetaTag('og:type', type, true);
    
    // Twitter Cards
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', fullDescription);
    updateMetaTag('twitter:image', `${baseUrl}${image}`);
    
    // Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-image-preview:large');
    }
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);
    
    // Structured Data para páginas específicas
    const addStructuredData = (data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      script.setAttribute('data-seo-component', 'true');
      document.head.appendChild(script);
      return script;
    };
    
    // Limpiar datos estructurados previos de este componente
    document.querySelectorAll('script[data-seo-component="true"]').forEach(el => el.remove());
    
    // Agregar breadcrumbs dinámicos
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const breadcrumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": baseUrl
          }
        ]
      };
      
      let currentPath = '';
      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        breadcrumbs.itemListElement.push({
          "@type": "ListItem",
          "position": index + 2,
          "name": name,
          "item": `${baseUrl}${currentPath}`
        });
      });
      
      addStructuredData(breadcrumbs);
    }
    
    // Datos estructurados específicos por página
    if (location.pathname === '/servicios') {
      addStructuredData({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Servicios Contables",
        "provider": {
          "@type": "Organization",
          "name": "Contadoor"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios Contadoor",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Contabilidad y Finanzas",
                "description": "Gestión contable completa para tu empresa"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Gestión Tributaria",
                "description": "Cumplimiento de obligaciones tributarias"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Gestión Laboral",
                "description": "Administración de nómina y trabajadores"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Asesoría Estratégica",
                "description": "Consultoría para el crecimiento de tu negocio"
              }
            }
          ]
        }
      });
    }
    
    if (location.pathname === '/contacto') {
      addStructuredData({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contacto Contadoor",
        "description": "Contáctanos para resolver tus dudas sobre nuestros servicios contables",
        "url": `${baseUrl}/contacto`,
        "mainEntity": {
          "@type": "Organization",
          "name": "Contadoor",
          "telephone": "+56979881891",
          "email": "info@contadoor.cl"
        }
      });
    }
    
    if (location.pathname === '/cotizador') {
      addStructuredData({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Cotizador Contadoor",
        "description": "Obtén una cotización personalizada para tu servicio contable",
        "url": `${baseUrl}/cotizador`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "CLP",
          "description": "Uso gratuito del cotizador"
        }
      });
    }
    
  }, [location.pathname, fullTitle, fullDescription, fullKeywords, image, type, noindex]);
  
  return null;
}