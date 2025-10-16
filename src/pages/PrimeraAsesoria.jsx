import { useEffect } from 'react';
import Hero from '../components/primera-asesoria/Hero';
import VideoBlock from '../components/primera-asesoria/VideoBlock';
import Agenda from '../components/primera-asesoria/Agenda';
import Checklist from '../components/primera-asesoria/Checklist';
import FormularioPreLlamada from '../components/primera-asesoria/FormularioPreLlamada';
import Counters from '../components/primera-asesoria/Counters';
import CompanyLogos from '../components/primera-asesoria/CompanyLogos';
import FAQs from '../components/primera-asesoria/FAQs';
import { analytics } from '../lib/analytics';
import { trackPageView, trackEngagement } from '../lib/gtm';

function PrimeraAsesoria() {
  useEffect(() => {
    // Track page view in both systems
    analytics.pageView('primera_asesoria');
    trackPageView('Primera Asesoría - Landing Page', '/primera-asesoria');

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        if (maxScroll % 25 === 0) {
          analytics.scrollDepth(maxScroll);
          trackEngagement('scroll_depth', {
            scroll_percentage: maxScroll,
            page: 'primera_asesoria'
          });
        }
      }
    };

    // Track time on page
    const startTime = Date.now();
    const timeThresholds = [30, 60, 120, 300]; // seconds
    const timeTracked = new Set();

    const trackTimeOnPage = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      timeThresholds.forEach(threshold => {
        if (timeSpent >= threshold && !timeTracked.has(threshold)) {
          timeTracked.add(threshold);
          trackEngagement('time_on_page', {
            time_seconds: threshold,
            page: 'primera_asesoria'
          });
        }
      });
    }, 1000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(trackTimeOnPage);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white w-full" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      <main className="w-full" style={{ maxWidth: '100vw' }}>
        <Hero />
        <VideoBlock />
        <Agenda />
        <FormularioPreLlamada />
        <Checklist />
        <Counters />
        <CompanyLogos />
        <FAQs />
      </main>

      {/* Mini footer */}
      <footer className="bg-primary-700 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/90 text-sm">
            © 2024 Contadoor | Simplificamos tu gestión contable y tributaria
          </p>
          <p className="text-white/70 text-xs mt-2">
            📧 contacto@contadoor.cl | 📞 +56 2 2345 6789
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PrimeraAsesoria;