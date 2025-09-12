import { useState } from 'react';
import Card from '../../Card';
import Button from '../../Button';

export default function StepLaboral({ data, updateData, onNext, onPrev }) {
  const [formData, setFormData] = useState({
    trabajadores: data?.trabajadores || 0,
    turnos: data?.turnos || false,
    variables: data?.variables || false,
    subcontratos: data?.subcontratos || 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(formData);
    onNext();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold mb-6">Gestión laboral</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Número de trabajadores con contrato
          </label>
          <input
            type="number"
            min="0"
            value={formData.trabajadores}
            onChange={(e) => handleChange('trabajadores', parseInt(e.target.value) || 0)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            placeholder="Ej: 10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            ¿Manejas turnos u horas extra?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: true, label: 'Sí' },
              { value: false, label: 'No' }
            ].map(option => (
              <button
                key={option.label}
                type="button"
                onClick={() => handleChange('turnos', option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.turnos === option.value
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
            ¿Pagas bonos o comisiones variables?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: true, label: 'Sí' },
              { value: false, label: 'No' }
            ].map(option => (
              <button
                key={option.label}
                type="button"
                onClick={() => handleChange('variables', option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.variables === option.value
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
            Número de subcontratos / honorarios recurrentes
          </label>
          <input
            type="number"
            min="0"
            value={formData.subcontratos}
            onChange={(e) => handleChange('subcontratos', parseInt(e.target.value) || 0)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            placeholder="Ej: 5"
          />
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