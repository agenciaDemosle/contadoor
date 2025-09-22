import { useState, useEffect } from 'react';
import { Search, FileText } from 'lucide-react';
import { trackPageView } from '../lib/gtm';

// Posts reales de contabilidad
const realPosts = [
  {
    id: 1,
    title: 'Nuevas obligaciones tributarias para PyMES 2024',
    excerpt: 'Conoce los cambios normativos que afectan a pequeñas y medianas empresas este año fiscal.',
    category: 'Tutoriales',
    date: '2024-01-15',
    readingTime: '5 min',
    tags: ['pymes', 'tributario', 'normativas', '2024'],
    slug: 'nuevas-obligaciones-tributarias-pymes-2024'
  },
  {
    id: 2,
    title: 'Guía completa del F29: Paso a paso',
    excerpt: 'Todo lo que necesitas saber para presentar correctamente tu formulario 29 ante el SII.',
    category: 'Tutoriales',
    date: '2024-01-10',
    readingTime: '8 min',
    tags: ['f29', 'sii', 'formularios', 'declaracion'],
    slug: 'guia-completa-f29-paso-a-paso'
  },
  {
    id: 3,
    title: 'Software contable chileno: Comparativa 2024',
    excerpt: 'Análisis de las mejores opciones de software contable disponibles en el mercado chileno.',
    category: 'Herramientas',
    date: '2024-01-08',
    readingTime: '6 min',
    tags: ['software', 'chile', 'contabilidad', 'comparativa'],
    slug: 'software-contable-chileno-comparativa-2024'
  },
  {
    id: 4,
    title: 'Beneficios tributarios para emprendedores',
    excerpt: 'Descubre los incentivos fiscales disponibles para nuevos emprendimientos en Chile.',
    category: 'Herramientas',
    date: '2024-01-05',
    readingTime: '4 min',
    tags: ['emprendedores', 'beneficios', 'tributarios', 'chile'],
    slug: 'beneficios-tributarios-emprendedores'
  }
];

const categories = ['Todas', 'Herramientas', 'Tutoriales', 'Uncategorized'];

// Componente Hero
function HeroBlog() {
  return (
    <section className="relative bg-gradient-to-b from-[#6F326A] to-[#8A3F83]">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Blog Contadoor
        </h1>
        <p className="mt-2 text-white/85 text-lg md:text-xl">
          Consejos, noticias y recursos para hacer crecer tu negocio
        </p>
      </div>
    </section>
  );
}

// Componente Barra de Filtros
function FiltersBar({ query, setQuery, activeCategory, setActiveCategory }) {
  return (
    <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
      <div className="rounded-[28px] bg-white border border-[#F0E5EF] shadow-[0_20px_40px_rgba(138,63,131,0.08)] p-3 md:p-4 flex flex-col md:flex-row md:items-center gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A3F83] w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar artículos…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 rounded-[999px] border border-gray-200 pl-11 pr-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D0A5CC]"
            aria-label="Buscar artículos"
          />
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold border transition whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-[#8A3F83] text-white border-transparent'
                  : 'border-gray-200 text-gray-800 hover:border-[#8A3F83]/50'
              }`}
              role="tab"
              aria-selected={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente Card de Post
function PostCard({ post }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="rounded-3xl border border-gray-200 bg-white overflow-hidden hover:translate-y-[-2px] hover:shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition cursor-pointer">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-40 w-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}

      <div className="p-5">
        <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 text-xs px-3 py-1">
          {post.category}
        </span>

        <h3 className="mt-3 text-lg font-extrabold text-gray-900">
          {post.title}
        </h3>

        <p className="mt-1 text-gray-600">
          {post.excerpt}
        </p>

        <div className="mt-3 text-sm text-gray-500">
          {formatDate(post.date)} • {post.readingTime} de lectura
        </div>
      </div>
    </article>
  );
}

// Componente Grid de Posts
function PostsGrid({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-3xl bg-gray-50 border border-gray-200 p-12 flex flex-col items-center justify-center text-center text-gray-500">
        <FileText className="text-5xl text-gray-300 w-16 h-16" />
        <h3 className="mt-3 font-semibold text-gray-600">
          No se encontraron artículos
        </h3>
        <p className="mt-1">
          Intenta con otros términos de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// Componente Principal
export default function Blog() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [posts] = useState(realPosts);

  // Track page load
  useEffect(() => {
    trackPageView('Blog', '/blog');
  }, []);

  // Filtrar posts
  const visiblePosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'Todas' || post.category === activeCategory;
    const searchContent = (post.title + post.excerpt + (post.tags || []).join(' ')).toLowerCase();
    const matchesQuery = query === '' || searchContent.includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  // Scroll to top cuando cambia la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HeroBlog />

      <FiltersBar
        query={query}
        setQuery={setQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="max-w-7xl mx-auto px-6 mt-6 pb-16">
        <PostsGrid posts={visiblePosts} />
      </div>
    </div>
  );
}