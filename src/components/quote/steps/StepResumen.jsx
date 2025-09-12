import Card from '../../Card';
import Button from '../../Button';

export default function StepResumen({ allData, onNext, onPrev }) {
  const { empresa, operacion, laboral, tributario, acomp } = allData;

  const editStep = (stepIndex) => {
    // This would be implemented in the parent component
    console.log('Edit step:', stepIndex);
  };

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold mb-6">Resumen de tu información</h2>
      
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">Tu empresa</h3>
          <div className="text-sm space-y-1 text-gray-600">
            <p>Tipo: {empresa.tipo}</p>
            <p>Tamaño: {empresa.tamano}</p>
            <p>Años operando: {empresa.anios}</p>
            <p>Industria: {empresa.industria}</p>
            <p>Ubicación: {empresa.ubicacion}</p>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">Operación mensual</h3>
          <div className="text-sm space-y-1 text-gray-600">
            <p>Documentos mensuales: {operacion.docsMes}</p>
            <p>Canales: {operacion.canales?.join(', ') || 'No especificado'}</p>
            <p>Cuentas bancarias: {operacion.conciliaciones}</p>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">Gestión laboral</h3>
          <div className="text-sm space-y-1 text-gray-600">
            <p>Trabajadores: {laboral.trabajadores}</p>
            <p>Turnos/horas extra: {laboral.turnos ? 'Sí' : 'No'}</p>
            <p>Bonos variables: {laboral.variables ? 'Sí' : 'No'}</p>
            <p>Subcontratos: {laboral.subcontratos}</p>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">Tributario</h3>
          <div className="text-sm space-y-1 text-gray-600">
            <p>Régimen: {tributario.regimen}</p>
            <p>Multas pendientes: {tributario.multas ? 'Sí' : 'No'}</p>
            <p>Planificación tributaria: {tributario.planificacion ? 'Sí' : 'No'}</p>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">Acompañamiento</h3>
          <div className="text-sm space-y-1 text-gray-600">
            <p>Nivel de soporte: {acomp.soporte}</p>
            <p>Urgencia: {acomp.urgencia}</p>
            <p>Reportes: {acomp.reportes}</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            Revisa que toda la información esté correcta antes de continuar. 
            Esto nos permitirá generar una cotización precisa para tu empresa.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" onClick={onPrev} variant="outline">
            Anterior
          </Button>
          <Button onClick={onNext}>
            Calcular cotización
          </Button>
        </div>
      </div>
    </Card>
  );
}