import { useState, useEffect } from 'react';
import { WP_CONFIG } from '../config/wordpress';

export function useWordPressPosts(options = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const {
    page = 1,
    perPage = WP_CONFIG.postsPerPage,
    category = null,
    search = '',
    slug = null
  } = options;

  useEffect(() => {
    fetchPosts();
  }, [page, perPage, category, search, slug]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let url = `${WP_CONFIG.baseUrl}${WP_CONFIG.api.posts}`;
      const params = new URLSearchParams();
      
      // Siempre incluir _embed para obtener todos los datos relacionados
      params.append('_embed', 'true');
      
      if (slug) {
        params.append('slug', slug);
      } else {
        params.append('per_page', perPage.toString());
        params.append('page', page.toString());
        
        if (category) {
          params.append('categories', category);
        }
        
        if (search) {
          params.append('search', search);
        }
      }
      
      url += '?' + params.toString();
      
      console.log('Fetching from WordPress API:', url);
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Obtener el total de páginas del header
      const totalPagesHeader = response.headers.get('X-WP-TotalPages');
      if (totalPagesHeader) {
        setTotalPages(parseInt(totalPagesHeader) || 1);
      }
      
      const data = await response.json();
      
      // Procesar las URLs de medios para asegurar que sean absolutas
      const processedData = Array.isArray(data) ? data : [data];
      const finalData = processedData.map(post => {
        // Procesar contenido renderizado
        if (post.content && post.content.rendered) {
          post.content.rendered = processContentUrls(post.content.rendered);
        }
        
        // Procesar extracto
        if (post.excerpt && post.excerpt.rendered) {
          post.excerpt.rendered = processContentUrls(post.excerpt.rendered);
        }
        
        // Procesar imagen destacada
        if (post._embedded && post._embedded['wp:featuredmedia']) {
          const featuredMedia = post._embedded['wp:featuredmedia'][0];
          if (featuredMedia && featuredMedia.source_url) {
            featuredMedia.source_url = ensureAbsoluteUrl(featuredMedia.source_url);
          }
        }
        
        return post;
      });
      
      console.log('Posts procesados:', finalData);
      setPosts(slug ? finalData[0] : finalData);
      
    } catch (err) {
      console.error('Error fetching WordPress posts:', err);
      setError(err.message);
      setPosts(slug ? null : []);
    } finally {
      setLoading(false);
    }
  };

  const processContentUrls = (content) => {
    if (!content) return content;
    
    // Reemplazar URLs relativas con URLs absolutas
    return content
      // Imágenes y otros recursos src
      .replace(/src="\/wp-content\//g, `src="${WP_CONFIG.baseUrl}/wp-content/`)
      .replace(/src='\/wp-content\//g, `src='${WP_CONFIG.baseUrl}/wp-content/'`)
      // Enlaces href
      .replace(/href="\/wp-content\//g, `href="${WP_CONFIG.baseUrl}/wp-content/`)
      .replace(/href='\/wp-content\//g, `href='${WP_CONFIG.baseUrl}/wp-content/'`)
      // URLs que empiezan con / pero no son //
      .replace(/src="\/(?!\/)/g, `src="${WP_CONFIG.baseUrl}/`)
      .replace(/href="\/(?!\/)/g, `href="${WP_CONFIG.baseUrl}/`)
      // Corregir URLs de localhost
      .replace(/http:\/\/localhost:\d+/g, WP_CONFIG.baseUrl)
      .replace(/https:\/\/localhost:\d+/g, WP_CONFIG.baseUrl);
  };

  const ensureAbsoluteUrl = (url) => {
    if (!url) return url;
    
    // Si ya es una URL absoluta válida, retornarla
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // Pero corregir si es localhost
      if (url.includes('localhost')) {
        return url.replace(/https?:\/\/localhost:\d+/, WP_CONFIG.baseUrl);
      }
      return url;
    }
    
    // Si es una URL relativa, hacerla absoluta
    if (url.startsWith('/')) {
      return WP_CONFIG.baseUrl + url;
    }
    
    return url;
  };

  return {
    posts,
    loading,
    error,
    totalPages,
    refetch: fetchPosts
  };
}

export default useWordPressPosts;