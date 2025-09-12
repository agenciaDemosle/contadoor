import { useState } from 'react';
import Card from '../../Card';
import Button from '../../Button';

export default function StepTributario({ data, updateData, onNext, onPrev }) {
  const [formData, setFormData] = useState({
    regimen: data?.regimen || '',
    mensuales: data?.mensuales || [],
    anuales: data?.anuales || [],
    multas: data?.multas || false,
    planificacion: data?.planificacion || false
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.regimen) newErrors.regimen = 'Selecciona el régimen tributario';
    
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

  const toggleArrayItem = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold mb-6">Aspectos tributarios</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Régimen tributario</label>
          <div className="space-y-2">
            {[
              { value: '14D3', label: '14D N°3 (Régimen Pro Pyme)' },
              { value: '14A', label: '14A (Renta Atribuida)' },
              { value: 'Otro', label: 'Otro régimen' }
            ].map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange('regimen', option.value)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  formData.regimen === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.regimen && <p className="text-red-500 text-sm mt-1">{errors.regimen}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Declaraciones mensuales requeridas
          </label>
          <div className="space-y-2">
            {[
              'IVA (F29)',
              'PPM',
              'Retenciones',
              'Impuestos específicos'
            ].map(dec => (
              <label key={dec} className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.mensuales.includes(dec)}
                  onChange={() => toggleArrayItem('mensuales', dec)}
                  className="mr-3"
                />
                <span>{dec}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            ¿Tienes multas o requerimientos SII pendientes?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: true, label: 'Sí' },
              { value: false, label: 'No' }
            ].map(option => (
              <button
                key={option.label}
                type="button"
                onClick={() => handleChange('multas', option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.multas === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            ¿Necesitas planificación tributaria anual?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: true, label: 'Sí, quiero optimizar impuestos' },
              { value: false, label: 'No por ahora' }
            ].map(option => (
              <button
                key={option.label}
                type="button"
                onClick={() => handleChange('planificacion', option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.planificacion === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" onClick={onPrev} variant="outline">
            Anterior
          </Button>
          <Button type="submit">Siguiente</Button>
        </div>
      </form>
    </Card>
  );
}