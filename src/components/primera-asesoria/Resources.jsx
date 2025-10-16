import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, FileIcon } from 'lucide-react';
import { resources } from '../../data/resources';
import { analytics } from '../../lib/analytics';

const Resources = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [formData, setFormData] = useState({ rut: '', email: '' });
  const [errors, setErrors] = useState({});

  const validateRUT = (rut) => {
    const cleanRUT = rut.replace(/[.-]/g, '');
    return /^\d{7,8}[0-9Kk]$/.test(cleanRUT);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleDownloadClick = (resource) => {
    setSelectedResource(resource);
    setShowModal(true);
    setFormData({ rut: '', email: '' });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!validateRUT(formData.rut)) {
      newErrors.rut = 'RUT inválido. Formato: 12345678-9';
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    analytics.resourceDownload(selectedResource.title, selectedResource.id);
    
    // TODO_AURORA: Enviar a endpoint real
    try {
      await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourceId: selectedResource.id,
          ...formData
        })
      });
    } catch (error) {
      console.log('Download request saved');
    }
    
    // Simular descarga
    const link = document.createElement('a');
    link.href = selectedResource.downloadUrl;
    link.download = selectedResource.title;
    link.click();
    
    setShowModal(false);
  };

  return (
    <section id="recursos" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-black mb-4">
              Biblioteca de Recursos Quick-Win
            </h2>
            <p className="text-gray-600">
              Herramientas gratuitas para mejorar tu gestión desde hoy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-card p-6 hover:shadow-lg transition-shadow"
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
                >
                  <resource.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {resource.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownloadClick(resource)}
                  className="w-full px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  Descargar
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-black">
                  Descargar recurso
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4"
              >
                <FileIcon className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">
                    {selectedResource?.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedResource?.type?.toUpperCase()}
                  </p>
                </div>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    RUT Empresa
                  </label>
                  <input
                    type="text"
                    placeholder="12345678-9"
                    value={formData.rut}
                    onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.rut ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.rut && (
                    <p className="text-red-500 text-xs mt-1">{errors.rut}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="tu@empresa.cl"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Descargar ahora
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Resources;