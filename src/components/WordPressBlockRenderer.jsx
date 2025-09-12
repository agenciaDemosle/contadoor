import React from 'react';
import { Play, Download, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { WP_CONFIG } from '../config/wordpress';

function WordPressBlockRenderer({ content }) {
  if (!content) return null;

  // Función para procesar y renderizar bloques de Gutenberg
  const renderGutenbergBlocks = (htmlContent) => {
    // Crear un parser temporal para procesar el HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Procesar todos los elementos del contenido
    const processElement = (element) => {
      // Procesar imágenes
      const images = element.querySelectorAll('img');
      images.forEach(img => {
        // Asegurar que las URLs sean absolutas
        if (img.src && img.src.startsWith('/')) {
          img.src = `${WP_CONFIG.baseUrl}${img.src}`;
        }
        // Corregir URLs relativas de wp-content
        if (img.src && img.src.includes('/wp-content/') && !img.src.includes('http')) {
          img.src = `${WP_CONFIG.baseUrl}${img.src}`;
        }
        // Agregar clases de estilo
        img.className = 'rounded-xl shadow-lg w-full h-auto object-cover';
        
        // Si la imagen está en un enlace, mantenerlo
        if (img.parentElement?.tagName === 'A') {
          img.parentElement.className = 'block my-6';
        }
      });

      // Procesar videos
      const videos = element.querySelectorAll('video');
      videos.forEach(video => {
        if (video.src && video.src.startsWith('/')) {
          video.src = `${WP_CONFIG.baseUrl}${video.src}`;
        }
        // Corregir URLs relativas de wp-content
        if (video.src && video.src.includes('/wp-content/') && !video.src.includes('http')) {
          video.src = `${WP_CONFIG.baseUrl}${video.src}`;
        }
        video.className = 'rounded-xl shadow-lg w-full h-auto';
        video.controls = true;
      });

      // Procesar iframes (YouTube, Vimeo, etc.)
      const iframes = element.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        // Crear wrapper responsive si no existe
        if (!iframe.parentElement?.classList.contains('video-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'video-wrapper relative pb-[56.25%] h-0 my-8 rounded-xl overflow-hidden shadow-lg';
          iframe.parentNode.insertBefore(wrapper, iframe);
          wrapper.appendChild(iframe);
          iframe.className = 'absolute top-0 left-0 w-full h-full';
        }
      });

      // Procesar bloques de galería
      const galleries = element.querySelectorAll('.wp-block-gallery, .gallery');
      galleries.forEach(gallery => {
        gallery.className = 'grid grid-cols-2 md:grid-cols-3 gap-4 my-8';
        const galleryImages = gallery.querySelectorAll('img');
        galleryImages.forEach(img => {
          img.className = 'w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer';
        });
      });

      // Procesar botones
      const buttons = element.querySelectorAll('.wp-block-button__link, .wp-block-buttons a');
      buttons.forEach(button => {
        button.className = 'inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl no-underline transition-all hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5';
      });

      // Procesar bloques de archivo
      const files = element.querySelectorAll('.wp-block-file');
      files.forEach(file => {
        file.className = 'flex items-center justify-between p-4 bg-gray-50 rounded-xl my-6';
        const link = file.querySelector('a');
        if (link) {
          link.className = 'flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium';
          // Agregar icono de descarga
          const icon = document.createElement('span');
          icon.innerHTML = '⬇';
          icon.className = 'text-lg';
          link.appendChild(icon);
        }
      });

      // Procesar bloques de audio
      const audioElements = element.querySelectorAll('audio');
      audioElements.forEach(audio => {
        if (audio.src && audio.src.startsWith('/')) {
          audio.src = `${WP_CONFIG.baseUrl}${audio.src}`;
        }
        // Corregir URLs relativas de wp-content
        if (audio.src && audio.src.includes('/wp-content/') && !audio.src.includes('http')) {
          audio.src = `${WP_CONFIG.baseUrl}${audio.src}`;
        }
        audio.className = 'w-full my-6';
        audio.controls = true;
      });

      // Procesar embeds de redes sociales
      const twitterEmbeds = element.querySelectorAll('.twitter-tweet');
      const instagramEmbeds = element.querySelectorAll('.instagram-media');
      
      // Los embeds de Twitter e Instagram se procesarán con el hook useWordPressContent
      
      // Procesar bloques de código
      const codeBlocks = element.querySelectorAll('pre');
      codeBlocks.forEach(pre => {
        pre.className = 'bg-gray-900 text-gray-100 rounded-xl p-6 overflow-x-auto my-6';
      });

      // Procesar tablas
      const tables = element.querySelectorAll('table');
      tables.forEach(table => {
        // Crear wrapper para hacer la tabla responsive
        if (!table.parentElement?.classList.contains('table-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'table-wrapper overflow-x-auto my-8';
          table.parentNode.insertBefore(wrapper, table);
          wrapper.appendChild(table);
          table.className = 'min-w-full divide-y divide-gray-200';
        }
      });

      // Procesar blockquotes
      const quotes = element.querySelectorAll('blockquote');
      quotes.forEach(quote => {
        quote.className = 'border-l-4 border-primary-400 pl-6 my-8 italic text-gray-600 bg-primary-50 py-4 pr-4 rounded-r-xl';
      });

      // Procesar separadores
      const separators = element.querySelectorAll('hr');
      separators.forEach(hr => {
        hr.className = 'my-12 border-t-2 border-gray-200';
      });

      // Procesar listas
      const lists = element.querySelectorAll('ul, ol');
      lists.forEach(list => {
        if (list.tagName === 'UL') {
          list.className = 'list-disc pl-6 my-6 space-y-2 text-gray-700';
        } else {
          list.className = 'list-decimal pl-6 my-6 space-y-2 text-gray-700';
        }
      });

      // Procesar párrafos
      const paragraphs = element.querySelectorAll('p');
      paragraphs.forEach(p => {
        // Solo agregar clases si el párrafo tiene contenido
        if (p.textContent.trim()) {
          p.className = 'text-gray-700 leading-relaxed mb-6';
        }
      });

      // Procesar encabezados
      const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        const level = heading.tagName.toLowerCase();
        const classes = {
          h1: 'text-4xl font-bold text-gray-900 mt-8 mb-6',
          h2: 'text-3xl font-bold text-primary-700 mt-8 mb-4',
          h3: 'text-2xl font-bold text-gray-900 mt-6 mb-3',
          h4: 'text-xl font-semibold text-gray-800 mt-4 mb-2',
          h5: 'text-lg font-semibold text-gray-800 mt-3 mb-2',
          h6: 'text-base font-semibold text-gray-700 mt-3 mb-2'
        };
        heading.className = classes[level] || '';
      });

      // Procesar enlaces
      const links = element.querySelectorAll('a');
      links.forEach(link => {
        // No procesar enlaces que ya tienen clases (como botones)
        if (!link.className || link.className === '') {
          link.className = 'text-primary-600 hover:text-primary-700 underline';
        }
        // Asegurar URLs absolutas
        if (link.href && link.href.startsWith('/')) {
          link.href = `${WP_CONFIG.baseUrl}${link.href}`;
        }
      });

      return element;
    };

    // Procesar el documento
    processElement(doc.body);
    
    // Retornar el HTML procesado
    return doc.body.innerHTML;
  };

  // Renderizar el contenido procesado
  const processedContent = renderGutenbergBlocks(content);

  return (
    <div 
      className="wp-block-content"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}

export default WordPressBlockRenderer;