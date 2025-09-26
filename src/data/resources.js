import { CheckSquare, FileText, BarChart3 } from 'lucide-react';

export const resources = [
  {
    id: 'checklist-contable',
    title: 'Checklist de Orden Contable',
    description: 'Evalúa en 5 minutos qué tan ordenada está tu contabilidad',
    icon: CheckSquare,
    type: 'pdf',
    downloadUrl: '/downloads/checklist-contable.pdf',
    category: 'diagnóstico'
  },
  {
    id: 'guia-sii',
    title: 'Guía: Evita Multas del SII',
    description: 'Los 10 errores más comunes que generan multas y cómo prevenirlos',
    icon: FileText,
    type: 'pdf',
    downloadUrl: '/downloads/guia-sii.pdf',
    category: 'compliance'
  },
  {
    id: 'plantilla-flujo-caja',
    title: 'Plantilla de Flujo de Caja',
    description: 'Excel para proyectar tu flujo de caja a 6 meses',
    icon: BarChart3,
    type: 'excel',
    downloadUrl: '/downloads/plantilla-flujo-caja.xlsx',
    category: 'finanzas'
  }
];