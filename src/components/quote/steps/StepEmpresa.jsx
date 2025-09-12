import { useState, useEffect } from 'react';
import Card from '../../Card';
import Button from '../../Button';

export default function StepEmpresa({ data, updateData, onNext }) {
  const [formData, setFormData] = useState({
    tipo: data?.tipo || '',
    tamano: data?.tamano || '',
    anios: data?.anios || '',
    industria: data?.industria || '',
    ubicacion: data?.ubicacion || ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.tipo) newErrors.tipo = 'Selecciona el tipo de empresa';
    if (!formData.tamano) newErrors.tamano = 'Selecciona el tamaño';
    if (!formData.anios) newErrors.anios = 'Ingresa los años operando';
    if (!formData.industria) newErrors.industria = 'Selecciona la industria';
    if (!formData.ubicacion) newErrors.ubicacion = 'Selecciona la ubicación';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateData(formData);
      onNext();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold mb-6">Cuéntanos sobre tu empresa</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Tipo de empresa</label>
          <div className="grid grid-cols-2 gap-3">
            {['EIRL', 'SpA', 'Ltda', 'Persona Natural con Giro'].map(tipo => (
              <button
                key={tipo}
                type="button"
                onClick={() => handleChange('tipo', tipo)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.tipo === tipo
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
          {errors.tipo && <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tamaño de la empresa</label>
          <div className="grid grid-cols-2 gap-3">
            {['Micro', 'Pequeña', 'Mediana', 'Grande'].map(size => (
              <button
                key={size}
                type="button"
                onClick={() => handleChange('tamano', size)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.tamano === size
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.tamano && <p className="text-red-500 text-sm mt-1">{errors.tamano}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Años operando</label>
          <input
            type="number"
            min="0"
            value={formData.anios}
            onChange={(e) => handleChange('anios', e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            placeholder="Ej: 3"
          />
          {errors.anios && <p className="text-red-500 text-sm mt-1">{errors.anios}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Industria</label>
          <select
            value={formData.industria}
            onChange={(e) => handleChange('industria', e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
          >
            <option value="">Selecciona una industria</option>
            <option value="retail">Retail / Comercio</option>
            <option value="servicios">Servicios</option>
            <option value="construccion">Construcción</option>
            <option value="gastronomia">Gastronomía</option>
            <option value="tech">Tecnología</option>
            <option value="salud">Salud</option>
            <option value="educacion">Educación</option>
            <option value="otro">Otro</option>
          </select>
          {errors.industria && <p className="text-red-500 text-sm mt-1">{errors.industria}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Ubicación</label>
          <div className="grid grid-cols-2 gap-3">
            {['RM', 'Regiones'].map(loc => (
              <button
                key={loc}
                type="button"
                onClick={() => handleChange('ubicacion', loc)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.ubicacion === loc
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {loc === 'RM' ? 'Región Metropolitana' : 'Otras Regiones'}
              </button>
            ))}
          </div>
          {errors.ubicacion && <p className="text-red-500 text-sm mt-1">{errors.ubicacion}</p>}
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit">Siguiente</Button>
        </div>
      </form>
    </Card>
  );
}