import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Tag, Share2, BookOpen } from 'lucide-react';
import { useWordPressContent } from '../hooks/useWordPressContent';
import WordPressBlockRenderer from './WordPressBlockRenderer';
import { WP_CONFIG } from '../config/wordpress';

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const wpBaseUrl = WP_CONFIG.baseUrl;
  
  // Hook para procesar contenido WordPress
  useWordPressContent(post?.content?.rendered);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      // Obtener el post con todos los embeds y datos completos
      const response = await fetch(
        `${wpBaseUrl}${WP_CONFIG.api.posts}?slug=${slug}&_embed=true`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const postData = data[0];
        
        // Si el contenido está en formato de bloques, procesarlo
        if (postData.content && postData.content.raw) {
          // Intentar obtener el contenido raw si está disponible
          postData.content.processed = postData.content.raw;
        } else if (postData.content && postData.content.rendered) {
          postData.content.processed = postData.content.rendered;
        }
        
        // Procesar el contenido para asegurar que las URLs de medios sean absolutas
        if (postData.content.rendered) {
          postData.content.rendered = postData.content.rendered
            .replace(/src="\//g, `src="${wpBaseUrl}/`)
            .replace(/href="\//g, `href="${wpBaseUrl}/`);
        }
        
        console.log('Post data completo:', postData);
        setPost(postData);
        
        if (postData.categories && postData.categories.length > 0) {
          fetchRelatedPosts(postData.categories[0], postData.id);
        }
      }
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (categoryId, currentPostId) => {
    try {
      const response = await fetch(
        `${wpBaseUrl}${WP_CONFIG.api.posts}?categories=${categoryId}&exclude=${currentPostId}&per_page=3&_embed`
      );
      const data = await response.json();
      setRelatedPosts(data);
    } catch (error) {
      console.error('Error loading related posts:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]+>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min de lectura`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title.rendered,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Artículo no encontrado</h2>
        <Link 
          to="/blog" 
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero con imagen */}
      {post._embedded && post._embedded['wp:featuredmedia'] ? (
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={post._embedded['wp:featuredmedia'][0].source_url}
            alt={post.title.rendered}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto max-w-4xl">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al blog
              </Link>
              <h1 
                className="text-3xl md:text-5xl font-bold mb-4"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>
            <h1 
              className="text-3xl md:text-5xl font-bold"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </div>
        </div>
      )}

      {/* Contenido del artículo */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Meta información */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b-2 border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5 text-primary-400" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5 text-primary-400" />
            <span>{getReadingTime(post.content.rendered)}</span>
          </div>
          {post._embedded && post._embedded['wp:author'] && (
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-5 h-5 text-primary-400" />
              <span>{post._embedded['wp:author'][0].name}</span>
            </div>
          )}
          <button
            onClick={handleShare}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Compartir
          </button>
        </div>

        {/* Categorías */}
        {post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post._embedded['wp:term'][0].map(term => (
              <span
                key={term.id}
                className="inline-flex items-center gap-1.5 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <Tag className="w-4 h-4" />
                {term.name}
              </span>
            ))}
          </div>
        )}

        {/* Contenido con estilos WordPress - Renderizado completo */}
        <div className="wp-content">
          <WordPressBlockRenderer content={post.content.rendered} />
        </div>

        {/* CTA final */}
        <div className="mt-16 p-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border-2 border-primary-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">¿Te gustó este artículo?</h3>
          <p className="text-gray-600 mb-6">
            Suscríbete a nuestro newsletter y recibe más contenido como este directamente en tu correo.
          </p>
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-primary-200 focus:outline-none focus:border-primary-500"
            />
            <button className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">
              Suscribirme
            </button>
          </div>
        </div>

        {/* Posts relacionados */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Artículos relacionados</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 overflow-hidden border border-gray-100">
                    {relatedPost._embedded && relatedPost._embedded['wp:featuredmedia'] && relatedPost._embedded['wp:featuredmedia'][0] ? (
                      <div className="h-40 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50">
                        <img
                          src={relatedPost._embedded['wp:featuredmedia'][0].source_url}
                          alt={relatedPost.title.rendered}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-primary-300" />
                      </div>
                    )}
                    <div className="p-5">
                      <h4 
                        className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                      />
                      <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 text-primary-400" />
                        <time>{formatDate(relatedPost.date)}</time>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default BlogPost;