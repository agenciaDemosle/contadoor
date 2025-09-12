import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, Search, Tag } from 'lucide-react';
import { WP_CONFIG } from '../config/wordpress';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const postsPerPage = WP_CONFIG.postsPerPage;
  const wpBaseUrl = WP_CONFIG.baseUrl;

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [currentPage, selectedCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `${wpBaseUrl}${WP_CONFIG.api.posts}?per_page=${postsPerPage}&page=${currentPage}&_embed=true`;
      
      if (selectedCategory) {
        url += `&categories=${selectedCategory}`;
      }

      console.log('Fetching posts from:', url);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const totalPagesHeader = response.headers.get('X-WP-TotalPages');
      setTotalPages(parseInt(totalPagesHeader) || 1);
      
      const data = await response.json();
      
      // Procesar URLs de imágenes para asegurar que sean absolutas
      const processedData = data.map(post => {
        if (post.content && post.content.rendered) {
          post.content.rendered = post.content.rendered
            .replace(/src="\/(?!\/)/g, `src="${wpBaseUrl}/`)
            .replace(/href="\/(?!\/)/g, `href="${wpBaseUrl}/`);
        }
        if (post.excerpt && post.excerpt.rendered) {
          post.excerpt.rendered = post.excerpt.rendered
            .replace(/src="\/(?!\/)/g, `src="${wpBaseUrl}/`)
            .replace(/href="\/(?!\/)/g, `href="${wpBaseUrl}/`);
        }
        return post;
      });
      
      console.log('Posts loaded:', processedData);
      setPosts(processedData);
    } catch (error) {
      console.error('Error cargando posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${wpBaseUrl}${WP_CONFIG.api.categories}`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error cargando categorías:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const extractExcerpt = (content, maxLength = 150) => {
    const textContent = content.replace(/<[^>]+>/g, '');
    if (textContent.length <= maxLength) return textContent;
    return textContent.substr(0, maxLength) + '...';
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]+>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min de lectura`;
  };

  const filteredPosts = posts.filter(post => 
    post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
    extractExcerpt(post.content.rendered).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog Contadoor</h1>
          <p className="text-xl opacity-95">
            Consejos, noticias y recursos para hacer crecer tu negocio
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filtros y búsqueda */}
        <div className="mb-8 bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Categorías */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                  !selectedCategory
                    ? 'bg-primary-500 text-white shadow-soft'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Todas
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white shadow-soft'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredPosts.map(post => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  {/* Imagen destacada */}
                  {post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] ? (
                    <div className="h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50">
                      <img
                        src={post._embedded['wp:featuredmedia'][0].source_url}
                        alt={post.title.rendered}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentElement.innerHTML = `
                            <div class="h-48 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                              <svg class="w-20 h-20 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                            </div>`;
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                      <svg className="w-20 h-20 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Categorías */}
                    {post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && (
                      <div className="flex gap-2 mb-3">
                        {post._embedded['wp:term'][0].slice(0, 2).map(term => (
                          <span
                            key={term.id}
                            className="inline-flex items-center gap-1 text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium"
                          >
                            <Tag className="w-3 h-3" />
                            {term.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Título */}
                    <h2
                      className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    {/* Extracto */}
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {extractExcerpt(post.excerpt.rendered || post.content.rendered)}
                    </p>

                    {/* Meta información */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary-400" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary-400" />
                        {getReadingTime(post.content.rendered)}
                      </span>
                    </div>

                    {/* Botón leer más */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold group/link"
                    >
                      Leer artículo completo
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-primary-200 transition-all font-medium"
                >
                  Anterior
                </button>
                
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded-xl font-medium transition-all ${
                        currentPage === index + 1
                          ? 'bg-primary-500 text-white shadow-soft'
                          : 'bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-primary-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-primary-200 transition-all font-medium"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">No se encontraron artículos</p>
            <p className="text-gray-400 mt-2">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;