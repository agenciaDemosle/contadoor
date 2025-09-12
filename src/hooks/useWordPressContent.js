import { useEffect } from 'react';

export function useWordPressContent(content) {
  useEffect(() => {
    if (!content) return;

    // Procesar todos los elementos multimedia y embeds
    const processMediaContent = () => {
      const container = document.querySelector('.wp-content, .wp-block-content');
      if (!container) return;

      // Procesar todas las imágenes para asegurar URLs absolutas
      const images = container.querySelectorAll('img');
      images.forEach(img => {
        // Corregir URLs relativas
        if (img.src && (img.src.includes('localhost') || !img.src.includes('http'))) {
          const urlParts = img.src.split('/wp-content/');
          if (urlParts.length > 1) {
            img.src = `https://contadoor.cl/wp/wp-content/${urlParts[1]}`;
          }
        }
        
        // Hacer imágenes clickeables para ampliar
        if (!img.closest('a')) {
          img.style.cursor = 'pointer';
          img.addEventListener('click', function() {
            window.open(this.src, '_blank');
          });
        }
      });

      // Procesar videos
      const videos = container.querySelectorAll('video');
      videos.forEach(video => {
        if (video.src && video.src.includes('localhost')) {
          const urlParts = video.src.split('/wp-content/');
          if (urlParts.length > 1) {
            video.src = `https://contadoor.cl/wp/wp-content/${urlParts[1]}`;
          }
        }
      });

      // Twitter embeds
      const twitterEmbeds = container.querySelectorAll('.twitter-tweet');
      if (twitterEmbeds.length > 0 && window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(container);
      }

      // Instagram embeds
      const instagramEmbeds = container.querySelectorAll('.instagram-media');
      if (instagramEmbeds.length > 0 && window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }

      // Facebook embeds
      const facebookEmbeds = container.querySelectorAll('.fb-post, .fb-video');
      if (facebookEmbeds.length > 0 && window.FB && window.FB.XFBML) {
        window.FB.XFBML.parse(container);
      }
    };

    // Ejecutar procesadores después de que el DOM se actualice
    setTimeout(() => {
      processMediaContent();
    }, 100);

    // Cargar scripts externos si es necesario
    const loadExternalScripts = () => {
      // Twitter
      if (!window.twttr) {
        const twitterScript = document.createElement('script');
        twitterScript.src = 'https://platform.twitter.com/widgets.js';
        twitterScript.async = true;
        document.body.appendChild(twitterScript);
      }

      // Instagram
      if (!window.instgrm) {
        const instagramScript = document.createElement('script');
        instagramScript.src = 'https://www.instagram.com/embed.js';
        instagramScript.async = true;
        document.body.appendChild(instagramScript);
      }
    };

    loadExternalScripts();
  }, [content]);
}

export default useWordPressContent;