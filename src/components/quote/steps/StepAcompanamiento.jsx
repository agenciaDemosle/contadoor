import { useState } from 'react';
import Card from '../../Card';
import Button from '../../Button';

export default function StepAcompanamiento({ data, updateData, onNext, onPrev }) {
  const [formData, setFormData] = useState({
    soporte: data?.soporte || '',
    urgencia: data?.urgencia || '',
    reportes: data?.reportes || ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.soporte) newErrors.soporte = 'Selecciona el nivel de soporte';
    if (!formData.urgencia) newErrors.urgencia = 'Selecciona la urgencia de inicio';
    if (!formData.reportes) newErrors.reportes = 'Selecciona la frecuencia de reportes';
    
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
      <h2 className="text-2xl font-bold mb-6">Nivel de acompañamiento</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Nivel de soporte esperado</label>
          <div className="space-y-2">
            {[
              { 
                value: 'Estandar', 
                label: 'Estándar',
                desc: 'Respuesta en 24 horas, reportes mensuales'
              },
              { 
                value: 'Prioritario', 
                label: 'Prioritario',
                desc: 'Respuesta en 4 horas, reuniones quincenales'
              },
              { 
                value: 'Ejecutivo', 
                label: 'Ejecutivo',
                desc: 'Contador dedicado, respuesta inmediata, reuniones semanales'
              }
            ].map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange('soporte', option.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  formData.soporte === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">{option.label}</div>
                <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
              </button>
            ))}
          </div>
          {errors.soporte && <p className="text-red-500 text-sm mt-1">{errors.soporte}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">¿Cuándo necesitas comenzar?</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'Semana', label: 'Esta semana' },
              { value: 'Mes', label: 'Este mes' },
              { value: 'Flexible', label: 'Soy flexible' }
            ].map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange('urgencia', option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.urgencia === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.urgencia && <p className="text-red-500 text-sm mt-1">{errors.urgencia}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Frecuencia de reportes deseada</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'Mensual', label: 'Mensual' },
              { value: 'Quincenal', label: 'Quincenal' },
              { value: 'Personalizado', label: 'Personalizado' }
            ].map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange('reportes', option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.reportes === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.reportes && <p className="text-red-500 text-sm mt-1">{errors.reportes}</p>}
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