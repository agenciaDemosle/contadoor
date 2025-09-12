import { useState } from 'react';
import Card from '../../Card';
import Button from '../../Button';

export default function StepOperacion({ data, updateData, onNext, onPrev }) {
  const [formData, setFormData] = useState({
    docsMes: data?.docsMes || '',
    canales: data?.canales || [],
    herramientas: data?.herramientas || [],
    conciliaciones: data?.conciliaciones || 1
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.docsMes) newErrors.docsMes = 'Selecciona un rango de documentos';
    if (formData.canales.length === 0) newErrors.canales = 'Selecciona al menos un canal de venta';
    
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
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold mb-6">Operación mensual</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Documentos mensuales (boletas + facturas emitidas y recibidas)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['0-30', '31-100', '101-300', '300+'].map(range => (
              <button
                key={range}
                type="button"
                onClick={() => handleChange('docsMes', range)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.docsMes === range
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {range} documentos
              </button>
            ))}
          </div>
          {errors.docsMes && <p className="text-red-500 text-sm mt-1">{errors.docsMes}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Canales de venta (selecciona todos los que apliquen)
          </label>
          <div className="space-y-2">
            {[
              'Venta presencial',
              'E-commerce propio',
              'Marketplaces (MercadoLibre, etc.)',
              'Redes sociales',
              'B2B / Empresas'
            ].map(canal => (
              <label key={canal} className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.canales.includes(canal)}
                  onChange={() => toggleArrayItem('canales', canal)}
                  className="mr-3"
                />
                <span>{canal}</span>
              </label>
            ))}
          </div>
          {errors.canales && <p className="text-red-500 text-sm mt-1">{errors.canales}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Herramientas actuales (selecciona todas las que uses)
          </label>
          <div className="space-y-2">
            {[
              'ERP (SAP, Oracle, etc.)',
              'Software de facturación',
              'Planillas Excel',
              'Sistema POS',
              'Software contable',
              'Ninguna / Manual'
            ].map(tool => (
              <label key={tool} className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.herramientas.includes(tool)}
                  onChange={() => toggleArrayItem('herramientas', tool)}
                  className="mr-3"
                />
                <span>{tool}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Número de cuentas bancarias a conciliar
          </label>
          <input
            type="number"
            min="0"
            value={formData.conciliaciones}
            onChange={(e) => handleChange('conciliaciones', parseInt(e.target.value) || 0)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
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