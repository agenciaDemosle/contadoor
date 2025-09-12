export function estimate(input) {
  let base = 0;
  const items = [];

  // Base por tamaño + volumen documental
  const baseMatrix = {
    Micro: { '0-30': 120000, '31-100': 180000, '101-300': 260000, '300+': 380000 },
    Pequena: { '0-30': 160000, '31-100': 240000, '101-300': 340000, '300+': 480000 },
    Mediana: { '0-30': 220000, '31-100': 320000, '101-300': 460000, '300+': 640000 },
    Grande: { '0-30': 300000, '31-100': 440000, '101-300': 620000, '300+': 860000 }
  };
  
  base = baseMatrix[input.empresa.tamano][input.operacion.docsMes];
  items.push({ label: 'Base contable', amount: base });

  // Nómina (por trabajador)
  const payrollUnit = input.laboral.trabajadores <= 5 ? 8000 : 
                      input.laboral.trabajadores <= 20 ? 7000 : 6000;
  const payroll = input.laboral.trabajadores * payrollUnit;
  if (payroll) items.push({ label: 'Gestión laboral', amount: payroll });

  // Conciliaciones adicionales
  if (input.operacion.conciliaciones > 1) {
    const extraConc = (input.operacion.conciliaciones - 1) * 15000;
    items.push({ label: 'Conciliaciones extra', amount: extraConc });
  }

  // Régimen/Complejidad tributaria
  if (input.tributario.regimen === '14A') {
    items.push({ label: 'Complejidad tributaria 14A', amount: 30000 });
  }
  if (input.tributario.planificacion) {
    items.push({ label: 'Planificación impuesto anual', amount: 40000 });
  }
  if (input.tributario.multas) {
    items.push({ label: 'Regularización/defensa SII (estimado)', amount: 60000 });
  }

  // Nivel de soporte
  const soporteMap = { Estandar: 0, Prioritario: 25000, Ejecutivo: 60000 };
  items.push({ label: `Soporte ${input.acomp.soporte}`, amount: soporteMap[input.acomp.soporte] });

  // Urgencia (recargo)
  const urgencyFactor = input.acomp.urgencia === 'Semana' ? 1.12 : 
                        input.acomp.urgencia === 'Mes' ? 1.05 : 1;

  // Subtotal y rango
  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const min = Math.round(subtotal * urgencyFactor * 0.95);
  const max = Math.round(subtotal * urgencyFactor * 1.15);
  
  return { min, max, items };
}