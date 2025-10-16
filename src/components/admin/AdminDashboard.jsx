import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import {
  Users,
  FileText,
  TrendingUp,
  Calendar,
  LogOut,
  Download,
  RefreshCw,
  Eye,
  Trash2,
  Mail,
  Phone,
  Clock,
  Filter,
  Check,
  FileDown,
  Calendar as CalendarIcon,
  Edit3,
  Save,
  AlertTriangle,
  Target,
  FileUser,
  Database,
  UserCheck,
  Star
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.jsx';
import { mockResponses, mockStats } from '../../data/mockData.js';

const AdminDashboard = () => {
  const [responses, setResponses] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [dateFilter, setDateFilter] = useState('all'); // all, today, week, month
  const [statusFilter, setStatusFilter] = useState('all'); // all, pending, contacted
  const [typeFilter, setTypeFilter] = useState('all'); // all, cotizacion, pre_llamada, etc (dinámico)
  const [editingNote, setEditingNote] = useState(null);
  const [noteValue, setNoteValue] = useState('');
  const { logout, token } = useAuth();

  // Generar tipos de lead únicos dinámicamente
  const uniqueLeadTypes = React.useMemo(() => {
    const types = [...new Set(responses.map(r => r.tipo_lead))].filter(Boolean);
    return types.sort(); // Ordenar alfabéticamente
  }, [responses]);

  // Mapeo de tipos de lead a display (icon + label + color)
  const getLeadTypeDisplay = (tipoLead) => {
    const mappings = {
      'cotizacion': { icon: '🎯', label: 'Cotización', labelPlural: 'Cotizaciones', color: 'blue' },
      'pre_llamada': { icon: '📋', label: 'Pre-llamada', labelPlural: 'Pre-llamadas', color: 'green' },
      'guia_gastos_sii': { icon: '📄', label: 'Guía Gastos SII', labelPlural: 'Guías Gastos SII', color: 'purple' }
    };
    // Si no existe en el mapping, usar valores por defecto
    if (mappings[tipoLead]) {
      return mappings[tipoLead];
    }

    const formattedLabel = tipoLead.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      icon: '📄',
      label: formattedLabel,
      labelPlural: formattedLabel,
      color: 'gray'
    };
  };

  // Helper para renderizar badge de tipo de lead dinámicamente
  const renderLeadTypeBadge = (tipoLead) => {
    const display = getLeadTypeDisplay(tipoLead);
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      gray: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colorClasses[display.color]}`}>
        {display.icon} {display.label}
      </span>
    );
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // En desarrollo, usar datos mock para demostración
      if (import.meta.env.DEV) {
        console.log('🎭 Usando datos mock para demostración');
        await new Promise(resolve => setTimeout(resolve, 800)); // Simular delay de red
        setResponses(mockResponses);
        setStats(mockStats);
        setLoading(false);
        return;
      }

      // En producción, usar API real
      const baseUrl = import.meta.env.VITE_API_URL || 'https://contadoor.cl/api';

      // Fetch responses
      const responsesRes = await fetch(`${baseUrl}/admin-leads-unified.php`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      // Fetch stats
      const statsRes = await fetch(`${baseUrl}/admin-stats.php`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (responsesRes.ok) {
        const responsesData = await responsesRes.json();
        setResponses(responsesData.data || []);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // En caso de error, usar datos mock como fallback
      console.log('🎭 Usando datos mock como fallback');

      // En desarrollo, intentar cargar desde localStorage primero
      if (import.meta.env.DEV) {
        const savedResponses = localStorage.getItem('contadoor_mock_responses');
        if (savedResponses) {
          console.log('🔄 Cargando datos guardados desde localStorage');
          setResponses(JSON.parse(savedResponses));
        } else {
          setResponses(mockResponses);
        }
      } else {
        setResponses(mockResponses);
      }

      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // Filtrar respuestas cuando cambien los filtros
  useEffect(() => {

    let filtered = [...responses];

    // Filtro por fecha
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      filtered = filtered.filter(response => {
        const responseDate = new Date(response.fecha_registro);

        switch (dateFilter) {
          case 'today':
            return responseDate >= today;
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return responseDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            return responseDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Filtro por estado (pendiente o contactado)
    if (statusFilter !== 'all') {
      filtered = filtered.filter(response => {
        const isContacted = response.contactado || false;
        return statusFilter === 'contacted' ? isContacted : !isContacted;
      });
    }

    // Filtro por tipo de lead
    if (typeFilter !== 'all') {
      filtered = filtered.filter(response => response.tipo_lead === typeFilter);
    }


    setFilteredResponses(filtered);
  }, [responses, dateFilter, statusFilter, typeFilter]);

  // Marcar como contactado
  const markAsContacted = async (id) => {
    try {
      // En desarrollo, simular actualización local con persistencia
      if (import.meta.env.DEV) {
        const updatedResponses = responses.map(response =>
          response.id === id ? { ...response, contactado: true } : response
        );
        setResponses(updatedResponses);
        localStorage.setItem('contadoor_mock_responses', JSON.stringify(updatedResponses));
        return;
      }

      const baseUrl = import.meta.env.VITE_API_URL || 'https://contadoor.cl/api';
      const leadToUpdate = responses.find(r => r.id === id);
      const response = await fetch(`${baseUrl}/admin-leads-unified.php`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          contactado: true,
          tipo_lead: leadToUpdate.tipo_lead,
          tabla_origen: leadToUpdate.tabla_origen
        })
      });

      if (response.ok) {
        setResponses(prev => prev.map(r =>
          r.id === id ? { ...r, contactado: true } : r
        ));
      }
    } catch (error) {
      console.error('Error marking as contacted:', error);
    }
  };

  // Marcar como convertido a cliente
  const markAsConverted = async (id) => {
    try {
      // En desarrollo, simular actualización local con persistencia
      if (import.meta.env.DEV) {
        const updatedResponses = responses.map(response =>
          response.id === id ? {
            ...response,
            convertido: true,
            contactado: true, // Si se convierte, también está contactado
            fecha_conversion: new Date().toISOString()
          } : response
        );
        setResponses(updatedResponses);
        localStorage.setItem('contadoor_mock_responses', JSON.stringify(updatedResponses));
        return;
      }

      const baseUrl = import.meta.env.VITE_API_URL || 'https://contadoor.cl/api';
      const leadToUpdate = responses.find(r => r.id === id);
      const response = await fetch(`${baseUrl}/admin-leads-unified.php`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          convertido: true,
          contactado: true,
          fecha_conversion: new Date().toISOString(),
          tipo_lead: leadToUpdate.tipo_lead,
          tabla_origen: leadToUpdate.tabla_origen
        })
      });

      if (response.ok) {
        setResponses(prev => prev.map(r =>
          r.id === id ? {
            ...r,
            convertido: true,
            contactado: true,
            fecha_conversion: new Date().toISOString()
          } : r
        ));
      }
    } catch (error) {
      console.error('Error marking as converted:', error);
    }
  };

  // Generar resumen para reunión
  const generateMeetingSummary = () => {
    const data = filteredResponses.map(response => ({
      'Nombre': response.nombre,
      'Email': response.email,
      'Teléfono': response.telefono,
      'Tipo Lead': response.tipo_lead === 'cotizacion' ? 'Cotización' : response.tipo_lead === 'guia_gastos_sii' ? 'Guía Gastos SII' : 'Pre-llamada',
      'Estado Gestión': response.tipo_lead === 'pre_llamada' ? (response.sentimiento_gestion || 'N/A') : 'N/A',
      'Comunicación': response.tipo_lead === 'pre_llamada' ? (response.frecuencia_comunicacion || 'N/A') : 'N/A',
      'Tiempo Futuro': response.tipo_lead === 'pre_llamada' ? (response.uso_tiempo_futuro || 'N/A') : 'N/A',
      'Rapidez Meta': response.tipo_lead === 'pre_llamada' ? (response.rapidez_meta || 'N/A') : 'N/A',
      'Buscar Apoyo': response.tipo_lead === 'pre_llamada' ? (response.buscar_apoyo || 'N/A') : 'N/A',
      'Flujo': response.tipo_lead === 'cotizacion' ? (response.flujo || 'N/A') : 'N/A',
      'Precio Estimado': response.tipo_lead === 'cotizacion' && response.precio_estimado ?
        `$${response.precio_estimado.mensual?.toLocaleString('es-CL') || response.precio_estimado.formalizacion?.toLocaleString('es-CL')}` : 'N/A',
      'Fecha Registro': formatDate(response.fecha_registro),
      'Contactado': response.contactado ? 'Sí' : 'No'
    }));

    // Crear CSV
    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n');

    // Descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `resumen_reunion_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generar resumen ejecutivo
  const generateExecutiveSummary = () => {
    const total = filteredResponses.length;
    const contacted = filteredResponses.filter(r => r.contactado).length;
    const pending = total - contacted;

    const sentimientos = filteredResponses.reduce((acc, r) => {
      if (r.tipo_lead === 'pre_llamada' && r.sentimiento_gestion) {
        const key = r.sentimiento_gestion;
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});

    const apoyo = filteredResponses.reduce((acc, r) => {
      if (r.tipo_lead === 'pre_llamada' && r.buscar_apoyo) {
        const key = r.buscar_apoyo;
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});

    const summary = `RESUMEN EJECUTIVO - ${new Date().toLocaleDateString('es-CL')}

MÉTRICAS GENERALES:
• Total de respuestas: ${total}
• Contactados: ${contacted} (${Math.round(contacted/total*100)}%)
• Pendientes: ${pending} (${Math.round(pending/total*100)}%)

SENTIMIENTO HACIA GESTIÓN ACTUAL:
${Object.entries(sentimientos).map(([key, value]) =>
  `• ${key}: ${value} (${Math.round(value/total*100)}%)`
).join('\n')}

INTERÉS EN APOYO:
${Object.entries(apoyo).map(([key, value]) =>
  `• ${key}: ${value} (${Math.round(value/total*100)}%)`
).join('\n')}

OPORTUNIDADES PRINCIPALES:
• ${filteredResponses.filter(r => r.tipo_lead === 'pre_llamada' && r.sentimiento_gestion && r.sentimiento_gestion.includes('Mal')).length} clientes con mala experiencia reciente
• ${filteredResponses.filter(r => r.tipo_lead === 'pre_llamada' && r.buscar_apoyo && r.buscar_apoyo.includes('Sí')).length} clientes interesados en apoyo experto
• ${filteredResponses.filter(r => r.tipo_lead === 'pre_llamada' && r.rapidez_meta && r.rapidez_meta.includes('Lo antes posible')).length} clientes con urgencia de cambio
• ${filteredResponses.filter(r => r.tipo_lead === 'cotizacion' && r.flujo === 'formalizacion').length} empresas buscando formalización
• ${filteredResponses.filter(r => r.tipo_lead === 'cotizacion' && r.precio_estimado && r.precio_estimado.mensual > 50000).length} cotizaciones de alto valor

ACCIONES RECOMENDADAS:
1. Priorizar contacto con clientes con mala experiencia
2. Enfocar propuesta en clientes que buscan apoyo
3. Crear urgencia con timeline de 3-12 meses
`;

    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `resumen_ejecutivo_${new Date().toISOString().split('T')[0]}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Exportar leads para Email Marketing (Mailchimp)
  const exportLeadsForEmailMarketing = () => {
    if (filteredResponses.length === 0) return;

    // Generar nombre descriptivo basado en filtros activos
    const typeDisplay = typeFilter !== 'all' ? getLeadTypeDisplay(typeFilter).labelPlural.toLowerCase().replace(/\s+/g, '_') : 'todos';
    const fileName = `leads_${typeDisplay}_${new Date().toISOString().split('T')[0]}.csv`;

    // Crear CSV optimizado para Mailchimp con segmentación
    const headers = ['nombre', 'email', 'telefono', 'tipo_lead', 'origen', 'fecha_registro'];

    const csvData = filteredResponses.map(r => {
      const display = getLeadTypeDisplay(r.tipo_lead);
      return [
        r.nombre,
        r.email,
        r.telefono,
        r.tipo_lead,
        display.label,
        new Date(r.fecha_registro).toLocaleDateString('es-CL')
      ];
    });

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Comenzar a editar nota
  const startEditingNote = (id, currentNote) => {
    setEditingNote(id);
    setNoteValue(currentNote || '');
  };

  // Actualizar nota
  const updateNote = async (id, note) => {
    try {
      console.log('📝 Actualizando nota:', { id, note, isDev: import.meta.env.DEV });

      // En desarrollo, simular actualización local con persistencia
      if (import.meta.env.DEV) {
        console.log('🔧 Modo desarrollo - actualizando localmente con persistencia');

        // Actualizar estado
        const updatedResponses = responses.map(response =>
          response.id === id ? { ...response, nota: note } : response
        );
        setResponses(updatedResponses);

        // Guardar en localStorage para persistencia
        localStorage.setItem('contadoor_mock_responses', JSON.stringify(updatedResponses));

        setEditingNote(null);
        setNoteValue('');
        return;
      }

      const baseUrl = import.meta.env.VITE_API_URL || 'https://contadoor.cl/api';
      const leadToUpdate = responses.find(r => r.id === id);
      const response = await fetch(`${baseUrl}/admin-leads-unified.php`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          nota: note,
          tipo_lead: leadToUpdate.tipo_lead,
          tabla_origen: leadToUpdate.tabla_origen
        })
      });

      if (response.ok) {
        setResponses(prev => prev.map(r =>
          r.id === id ? { ...r, nota: note } : r
        ));
        setEditingNote(null);
        setNoteValue('');
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Calcular prioridad automática
  const getPriority = (response) => {
    // Para leads de pre-llamada (tienen sentimiento_gestion)
    if (response.tipo_lead === 'pre_llamada' && response.sentimiento_gestion) {
      const isBad = response.sentimiento_gestion.includes('Mal');
      const wantsHelp = response.buscar_apoyo && response.buscar_apoyo.includes('Sí');
      const isUrgent = response.rapidez_meta && response.rapidez_meta.includes('Lo antes posible');

      if (isBad && wantsHelp && isUrgent) return { level: 'high', color: 'red', label: 'Alta' };
      if ((isBad && wantsHelp) || (wantsHelp && isUrgent)) return { level: 'medium', color: 'yellow', label: 'Media' };
      return { level: 'low', color: 'green', label: 'Baja' };
    }

    // Para leads de cotización - prioridad basada en el flujo y fecha
    if (response.tipo_lead === 'cotizacion') {
      const esFormalizacion = response.flujo === 'formalizacion';
      const esReciente = (new Date() - new Date(response.fecha_registro)) < 24 * 60 * 60 * 1000; // Menos de 24h

      if (esFormalizacion && esReciente) return { level: 'high', color: 'red', label: 'Alta' };
      if (esFormalizacion || esReciente) return { level: 'medium', color: 'yellow', label: 'Media' };
      return { level: 'low', color: 'green', label: 'Baja' };
    }

    // Default para casos sin clasificar
    return { level: 'low', color: 'green', label: 'Baja' };
  };

  // Generar ficha individual para reunión en PDF (sin logo)
  const generateIndividualSummary = (response) => {
    const priority = getPriority(response);
    const contactStatus = response.contactado ? 'CONTACTADO ✓' : 'PENDIENTE';

    const doc = new jsPDF();

    // Configuración de colores y fuentes
    const primaryColor = [160, 86, 153]; // Color primario de Contadoor
    const textColor = [45, 55, 72]; // Color texto principal

    // Header con branding (sin logo)
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');

    // Título Contadoor
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('CONTADOOR', 20, 20);

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Servicios Contables Profesionales', 20, 30);

    // Fecha y tipo de documento
    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-CL')}`, 140, 20);
    doc.text('Ficha para Reunión', 140, 30);

    // Título del cliente
    doc.setTextColor(...textColor);
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text(`FICHA DE REUNIÓN - ${response.nombre.toUpperCase()}`, 20, 55);

    let yPos = 70;

    // Función para agregar sección
    const addSection = (title, content, isHighlight = false) => {
      if (isHighlight) {
        doc.setFillColor(248, 250, 252);
        doc.rect(15, yPos - 5, 180, content.length * 6 + 10, 'F');
      }

      doc.setTextColor(...primaryColor);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(title, 20, yPos);
      yPos += 8;

      doc.setTextColor(...textColor);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');

      content.forEach(line => {
        doc.text(line, 25, yPos);
        yPos += 6;
      });
      yPos += 5;
    };

    // Información de contacto
    addSection('INFORMACIÓN DE CONTACTO', [
      `• Nombre: ${response.nombre}`,
      `• Email: ${response.email}`,
      `• Teléfono: ${response.telefono}`,
      `• Fecha registro: ${formatDate(response.fecha_registro)}`
    ]);

    // Estado actual
    const estadoActual = [
      `• Prioridad: ${priority.label.toUpperCase()}`,
      `• Estado contacto: ${contactStatus}`
    ];

    if (response.tipo_lead === 'pre_llamada') {
      if (response.sentimiento_gestion) estadoActual.unshift(`• Gestión contable: ${response.sentimiento_gestion}`);
      if (response.frecuencia_comunicacion) estadoActual.unshift(`• Comunicación actual: ${response.frecuencia_comunicacion}`);
    } else if (response.tipo_lead === 'cotizacion') {
      if (response.flujo) estadoActual.unshift(`• Tipo de flujo: ${response.flujo === 'formalizacion' ? 'Formalización' : 'Empresa Existente'}`);
      if (response.precio_estimado) {
        const precio = response.precio_estimado.mensual || response.precio_estimado.formalizacion;
        estadoActual.unshift(`• Precio estimado: $${precio?.toLocaleString('es-CL')}`);
      }
    }

    addSection('ESTADO ACTUAL', estadoActual, true);

    // Objetivos y necesidades (solo para pre-llamadas)
    if (response.tipo_lead === 'pre_llamada') {
      const objetivos = [];
      if (response.uso_tiempo_futuro) objetivos.push(`• Uso tiempo futuro: ${response.uso_tiempo_futuro}`);
      if (response.rapidez_meta) objetivos.push(`• Rapidez deseada: ${response.rapidez_meta}`);
      if (response.buscar_apoyo) objetivos.push(`• Busca apoyo: ${response.buscar_apoyo}`);

      if (objetivos.length > 0) {
        addSection('OBJETIVOS Y NECESIDADES', objetivos);
      }
    }

    // Notas
    if (response.nota) {
      addSection('NOTAS', [response.nota]);
    }

    // Puntos clave
    const keyPoints = [];

    if (response.tipo_lead === 'pre_llamada') {
      if (response.sentimiento_gestion && response.sentimiento_gestion.includes('Mal')) {
        keyPoints.push('• ⚠️ Cliente con mala experiencia - abordar problemas actuales');
      }
      if (response.buscar_apoyo && response.buscar_apoyo.includes('Sí')) {
        keyPoints.push('• ✓ Interesado en apoyo experto - enfocar en beneficios');
      }
      if (response.rapidez_meta && response.rapidez_meta.includes('Lo antes posible')) {
        keyPoints.push('• 🚀 Urgencia de cambio - proponer timeline acelerado');
      }
    } else if (response.tipo_lead === 'cotizacion') {
      if (response.flujo === 'formalizacion') {
        keyPoints.push('• 🏢 Necesita formalización - oportunidad de servicio completo');
      }
      if (response.precio_estimado && (response.precio_estimado.mensual > 50000 || response.precio_estimado.formalizacion > 200000)) {
        keyPoints.push('• 💰 Cotización de alto valor - cliente premium');
      }
    }

    if (priority.level === 'high') {
      keyPoints.push('• 🎯 PRIORIDAD ALTA - Cliente ideal para conversión');
    }

    if (keyPoints.length > 0) {
      addSection('PUNTOS CLAVE PARA LA REUNIÓN', keyPoints, true);
    }

    // Estrategia recomendada
    let strategy = [];
    if (priority.level === 'high') {
      strategy = [
        '1. Agendar reunión inmediatamente',
        '2. Preparar propuesta personalizada',
        '3. Enfoque en solución de problemas actuales'
      ];
    } else if (priority.level === 'medium') {
      strategy = [
        '1. Contactar esta semana',
        '2. Entender necesidades específicas',
        '3. Presentar casos de éxito similares'
      ];
    } else {
      strategy = [
        '1. Seguimiento de rutina',
        '2. Mantener relación',
        '3. Evaluar oportunidades futuras'
      ];
    }

    addSection('ESTRATEGIA RECOMENDADA', strategy);

    // Footer
    doc.setFillColor(...primaryColor);
    doc.rect(0, 280, 210, 17, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text('CONTADOOR - Transformando la gestión contable de las empresas', 20, 290);
    doc.text('www.contadoor.cl | contacto@contadoor.cl', 20, 295);

    // Guardar el PDF
    doc.save(`ficha_reunion_${response.nombre.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Exportar datos individuales a CSV
  const exportIndividualCSV = (response) => {
    const csvRows = [
      'Campo,Valor',
      `Nombre,"${response.nombre}"`,
      `Email,"${response.email}"`,
      `Teléfono,"${response.telefono}"`,
      `Tipo Lead,"${response.tipo_lead === 'cotizacion' ? 'Cotización' : response.tipo_lead === 'guia_gastos_sii' ? 'Guía Gastos SII' : 'Pre-llamada'}"`,
      `Fecha Registro,"${formatDate(response.fecha_registro)}"`,
      `Contactado,"${response.contactado ? 'Sí' : 'No'}"`,
      `Prioridad,"${getPriority(response).label}"`,
      `Notas,"${response.nota || 'Sin notas'}"`
    ];

    // Agregar campos específicos según el tipo de lead
    if (response.tipo_lead === 'pre_llamada') {
      if (response.sentimiento_gestion) csvRows.splice(-3, 0, `Sentimiento Gestión,"${response.sentimiento_gestion}"`);
      if (response.frecuencia_comunicacion) csvRows.splice(-3, 0, `Frecuencia Comunicación,"${response.frecuencia_comunicacion}"`);
      if (response.uso_tiempo_futuro) csvRows.splice(-3, 0, `Uso Tiempo Futuro,"${response.uso_tiempo_futuro}"`);
      if (response.rapidez_meta) csvRows.splice(-3, 0, `Rapidez Meta,"${response.rapidez_meta}"`);
      if (response.buscar_apoyo) csvRows.splice(-3, 0, `Buscar Apoyo,"${response.buscar_apoyo}"`);
    } else if (response.tipo_lead === 'cotizacion') {
      if (response.flujo) csvRows.splice(-3, 0, `Flujo,"${response.flujo === 'formalizacion' ? 'Formalización' : 'Empresa Existente'}"`);
      if (response.precio_estimado) {
        const precio = response.precio_estimado.mensual || response.precio_estimado.formalizacion;
        csvRows.splice(-3, 0, `Precio Estimado,"$${precio?.toLocaleString('es-CL') || 'N/A'}"`);
      }
    }

    const csvContent = csvRows.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `datos_${response.nombre.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteResponse = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta respuesta?')) return;

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://contadoor.cl/api';
      const leadToDelete = responses.find(r => r.id === id);
      const response = await fetch(`${baseUrl}/admin-leads-unified.php`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          tabla_origen: leadToDelete.tabla_origen
        })
      });

      if (response.ok) {
        setResponses(prev => prev.filter(r => r.id !== id));
      }
    } catch (error) {
      console.error('Error deleting response:', error);
    }
  };

  const exportToCSV = () => {
    if (responses.length === 0) return;

    const headers = [
      'ID', 'Nombre', 'Teléfono', 'Email', 'Tipo Lead', 'Estado Gestión',
      'Flujo', 'Precio Estimado', 'Frecuencia Comunicación', 'Uso Tiempo Futuro',
      'Rapidez Meta', 'Buscar Apoyo', 'Fecha Registro', 'Contactado', 'Convertido'
    ];

    const csvData = responses.map(r => [
      r.id,
      r.nombre,
      r.telefono,
      r.email,
      r.tipo_lead === 'cotizacion' ? 'Cotización' : r.tipo_lead === 'guia_gastos_sii' ? 'Guía Gastos SII' : 'Pre-llamada',
      r.tipo_lead === 'pre_llamada' ? (r.sentimiento_gestion || 'N/A') : 'N/A',
      r.tipo_lead === 'cotizacion' ? (r.flujo || 'N/A') : 'N/A',
      r.tipo_lead === 'cotizacion' && r.precio_estimado ?
        `$${r.precio_estimado.mensual?.toLocaleString('es-CL') || r.precio_estimado.formalizacion?.toLocaleString('es-CL')}` : 'N/A',
      r.tipo_lead === 'pre_llamada' ? (r.frecuencia_comunicacion || 'N/A') : 'N/A',
      r.tipo_lead === 'pre_llamada' ? (r.uso_tiempo_futuro || 'N/A') : 'N/A',
      r.tipo_lead === 'pre_llamada' ? (r.rapidez_meta || 'N/A') : 'N/A',
      r.tipo_lead === 'pre_llamada' ? (r.buscar_apoyo || 'N/A') : 'N/A',
      new Date(r.fecha_registro).toLocaleString(),
      r.contactado ? 'Sí' : 'No',
      r.convertido ? 'Sí' : 'No'
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `respuestas-formulario-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden max-w-full">
      {/* Header Responsive */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center flex-1 min-w-0">
              <img
                src="/logooficial.png"
                alt="Contadoor"
                className="h-8 w-auto"
              />
            </div>

            {/* Botones responsive */}
            <div className="flex items-center gap-1 sm:gap-4 ml-2">
              <button
                onClick={fetchData}
                className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Actualizar datos"
              >
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Mobile: Solo icono */}
              <button
                onClick={logout}
                className="sm:hidden p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>

              {/* Desktop: Con texto */}
              <button
                onClick={logout}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        {/* Título Dashboard */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Gestiona las respuestas del formulario y análisis de clientes</p>
        </div>

        {/* Stats Cards Responsive */}
        {stats && (
          <div className="mb-6">
            {/* Vista Mobile: Grid 2x3 */}
            <div className="grid grid-cols-2 gap-3 sm:hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-3 shadow-sm border"
              >
                <div className="text-center">
                  <div className="p-1.5 bg-blue-100 rounded-full w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                    <FileText className="w-3 h-3 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stats.total_responses}</p>
                  <p className="text-xs font-medium text-gray-600">Total</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg p-3 shadow-sm border"
              >
                <div className="text-center">
                  <div className="p-1.5 bg-green-100 rounded-full w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stats.this_week}</p>
                  <p className="text-xs font-medium text-gray-600">Semana</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-3 shadow-sm border"
              >
                <div className="text-center">
                  <div className="p-1.5 bg-purple-100 rounded-full w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                    <Calendar className="w-3 h-3 text-purple-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stats.today}</p>
                  <p className="text-xs font-medium text-gray-600">Hoy</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg p-3 shadow-sm border"
              >
                <div className="text-center">
                  <div className="p-1.5 bg-orange-100 rounded-full w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                    <Users className="w-3 h-3 text-orange-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stats.daily_average}</p>
                  <p className="text-xs font-medium text-gray-600">Promedio</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg p-3 shadow-sm border"
              >
                <div className="text-center">
                  <div className="p-1.5 bg-red-100 rounded-full w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                  </div>
                  <p className="text-lg font-bold text-red-600">
                    {responses.filter(r => getPriority(r).level === 'high').length}
                  </p>
                  <p className="text-xs font-medium text-gray-600">Urgentes</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-lg p-3 shadow-sm border"
              >
                <div className="text-center">
                  <div className="p-1.5 bg-blue-100 rounded-full w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                    <Star className="w-3 h-3 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-blue-600">
                    {responses.filter(r => r.convertido).length}
                  </p>
                  <p className="text-xs font-medium text-gray-600">Clientes</p>
                </div>
              </motion.div>
            </div>

            {/* Vista Desktop/Tablet: Horizontal */}
            <div className="hidden sm:flex gap-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 shadow-sm border flex-1 min-w-0"
              >
                <div className="text-center">
                  <div className="p-2 bg-blue-100 rounded-full w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">{stats.total_responses}</p>
                  <p className="text-xs font-medium text-gray-600">Total</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg p-4 shadow-sm border flex-1 min-w-0"
              >
                <div className="text-center">
                  <div className="p-2 bg-green-100 rounded-full w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">{stats.this_week}</p>
                  <p className="text-xs font-medium text-gray-600">Semana</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-4 shadow-sm border flex-1 min-w-0"
              >
                <div className="text-center">
                  <div className="p-2 bg-purple-100 rounded-full w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">{stats.today}</p>
                  <p className="text-xs font-medium text-gray-600">Hoy</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg p-4 shadow-sm border flex-1 min-w-0"
              >
                <div className="text-center">
                  <div className="p-2 bg-orange-100 rounded-full w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                    <Users className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">{stats.daily_average}</p>
                  <p className="text-xs font-medium text-gray-600">Promedio</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg p-4 shadow-sm border flex-1 min-w-0"
              >
                <div className="text-center">
                  <div className="p-2 bg-red-100 rounded-full w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <p className="text-xl font-bold text-red-600">
                    {responses.filter(r => getPriority(r).level === 'high').length}
                  </p>
                  <p className="text-xs font-medium text-gray-600">Urgentes</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-lg p-4 shadow-sm border flex-1 min-w-0"
              >
                <div className="text-center">
                  <div className="p-2 bg-blue-100 rounded-full w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                    <Star className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-xl font-bold text-blue-600">
                    {responses.filter(r => r.convertido).length}
                  </p>
                  <p className="text-xs font-medium text-gray-600">Clientes</p>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Respuestas del Formulario ({filteredResponses.length} de {responses.length})
            </h2>

            {/* Filtros Mobile-First: Horizontal */}
            <div className="flex gap-2 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-2 flex-1">
                <CalendarIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                >
                  <option value="all">Todas</option>
                  <option value="today">Hoy</option>
                  <option value="week">Semana</option>
                  <option value="month">Mes</option>
                </select>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 flex-1">
                <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                >
                  <option value="all">Todos</option>
                  <option value="pending">Pendientes</option>
                  <option value="contacted">Contactados</option>
                </select>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 flex-1">
                <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                >
                  <option value="all">Todos los tipos</option>
                  {uniqueLeadTypes.map(type => {
                    const display = getLeadTypeDisplay(type);
                    return (
                      <option key={type} value={type}>
                        {display.icon} {display.labelPlural}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* Botones de Acción Globales */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={generateExecutiveSummary}
              disabled={filteredResponses.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Resumen General
            </button>

            <button
              onClick={exportLeadsForEmailMarketing}
              disabled={filteredResponses.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Mail className="w-4 h-4" />
              Exportar Leads (CSV)
            </button>

            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Recargar
            </button>
          </div>
        </div>

        {/* Responses - Mobile: Cards, Desktop: Table */}
        <div>
          {filteredResponses.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-500">
              {responses.length === 0 ? 'No hay respuestas aún' : 'No se encontraron respuestas con los filtros aplicados'}
            </div>
          ) : (
            <>
              {/* Vista Mobile: Lista de Cards */}
              <div className="sm:hidden space-y-4">
                {filteredResponses.map((response, index) => (
                  <motion.div
                    key={response.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-sm border p-4"
                  >
                    {/* Header con nombre y estado */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 text-sm">{response.nombre}</h3>
                          {renderLeadTypeBadge(response.tipo_lead)}
                        </div>
                        <div className="text-xs text-gray-500">
                          <div>
                            {new Date(response.fecha_registro).toLocaleDateString('es-CL', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(response.fecha_registro).toLocaleTimeString('es-CL', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const priority = getPriority(response);
                          return (
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              priority.level === 'high' ? 'bg-red-100 text-red-800' :
                              priority.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {priority.label}
                            </span>
                          );
                        })()}
                        {response.contactado && (
                          <span className="text-green-600 font-semibold text-xs bg-green-100 px-2 py-1 rounded-full">
                            OK
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contacto */}
                    <div className="mb-3">
                      <p className="text-xs text-gray-600">{response.email}</p>
                      <p className="text-xs text-gray-600">{response.telefono}</p>
                    </div>

                    {/* Estados */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {response.tipo_lead === 'pre_llamada' && response.sentimiento_gestion && (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          response.sentimiento_gestion.includes('Excelente')
                            ? 'bg-green-100 text-green-800'
                            : response.sentimiento_gestion.includes('Bien')
                            ? 'bg-blue-100 text-blue-800'
                            : response.sentimiento_gestion.includes('Mal')
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {response.sentimiento_gestion}
                        </span>
                      )}

                      {response.tipo_lead === 'cotizacion' && response.flujo && (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          response.flujo === 'formalizacion'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {response.flujo === 'formalizacion' ? 'Formalización' : 'Empresa Existente'}
                        </span>
                      )}

                      {response.tipo_lead === 'pre_llamada' && response.buscar_apoyo && (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          response.buscar_apoyo.includes('Sí')
                            ? 'bg-green-100 text-green-800'
                            : response.buscar_apoyo.includes('No estoy seguro')
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {response.buscar_apoyo}
                        </span>
                      )}

                      {response.tipo_lead === 'cotizacion' && response.precio_estimado && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                          ${response.precio_estimado.mensual?.toLocaleString('es-CL') || response.precio_estimado.formalizacion?.toLocaleString('es-CL')}/mes
                        </span>
                      )}
                    </div>

                    {/* Notas */}
                    <div className="mb-3">
                      {editingNote === response.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={noteValue}
                            onChange={(e) => setNoteValue(e.target.value)}
                            className="text-sm border rounded px-2 py-1 w-full"
                            placeholder="Agregar nota..."
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                console.log('🔍 Enter presionado, valor:', noteValue);
                                updateNote(response.id, noteValue);
                              }
                            }}
                            autoFocus
                          />
                          <button
                            onClick={() => {
                              console.log('💾 Botón guardar clickeado, valor:', noteValue);
                              updateNote(response.id, noteValue);
                            }}
                            className="text-green-600 hover:text-green-800 p-1"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditingNote(response.id, response.nota)}
                            className="text-gray-600 hover:text-gray-800 p-1"
                            title="Agregar/editar nota"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <span className="text-xs text-gray-600">
                            {response.nota || 'Sin notas'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="space-y-3 pt-3 border-t">
                      {/* Fila 1: Acciones principales */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {!response.contactado && (
                            <button
                              onClick={() => markAsContacted(response.id)}
                              className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded"
                              title="Marcar como contactado"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}

                          {!response.convertido && response.contactado && (
                            <button
                              onClick={() => markAsConverted(response.id)}
                              className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded"
                              title="Marcar como cliente"
                            >
                              <Star className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedResponse(response)}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => deleteResponse(response.id)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Fila 2: Acciones de export */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => generateIndividualSummary(response)}
                          className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded"
                          title="Ficha para reunión"
                        >
                          <FileUser className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => exportIndividualCSV(response)}
                          className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded"
                          title="Exportar datos"
                        >
                          <Database className="w-4 h-4" />
                        </button>

                        {/* Estado del lead */}
                        <div className="flex items-center gap-2 ml-auto">
                          {response.convertido ? (
                            <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-xs bg-blue-100 px-2 py-1 rounded-full">
                              <Star className="w-3 h-3" />
                              Cliente
                            </span>
                          ) : response.contactado ? (
                            <span className="text-green-600 font-semibold text-xs bg-green-100 px-2 py-1 rounded-full">
                              Contactado
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Vista Desktop: Tabla */}
              <div className="hidden sm:block bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contacto
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado Actual
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Interés
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prioridad & Notas
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredResponses.map((response, index) => (
                        <motion.tr
                          key={response.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-3">
                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                              {response.nombre}
                              {renderLeadTypeBadge(response.tipo_lead)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {response.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {response.telefono}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            <div>
                              {new Date(response.fecha_registro).toLocaleDateString('es-CL', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(response.fecha_registro).toLocaleTimeString('es-CL', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {response.tipo_lead === 'pre_llamada' && response.sentimiento_gestion ? (
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                response.sentimiento_gestion.includes('Excelente')
                                  ? 'bg-green-100 text-green-800'
                                  : response.sentimiento_gestion.includes('Bien')
                                  ? 'bg-blue-100 text-blue-800'
                                  : response.sentimiento_gestion.includes('Mal')
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {response.sentimiento_gestion}
                              </span>
                            ) : response.tipo_lead === 'cotizacion' && response.flujo ? (
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                response.flujo === 'formalizacion'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-indigo-100 text-indigo-800'
                              }`}>
                                {response.flujo === 'formalizacion' ? 'Formalización' : 'Empresa Existente'}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {response.tipo_lead === 'pre_llamada' && response.buscar_apoyo ? (
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                response.buscar_apoyo.includes('Sí')
                                  ? 'bg-green-100 text-green-800'
                                  : response.buscar_apoyo.includes('No estoy seguro')
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {response.buscar_apoyo}
                              </span>
                            ) : response.tipo_lead === 'cotizacion' && response.precio_estimado ? (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                                ${response.precio_estimado.mensual?.toLocaleString('es-CL') || response.precio_estimado.formalizacion?.toLocaleString('es-CL')}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="space-y-2">
                              {(() => {
                                const priority = getPriority(response);
                                return (
                                  <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4" />
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                      priority.level === 'high' ? 'bg-red-100 text-red-800' :
                                      priority.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-green-100 text-green-800'
                                    }`}>
                                      {priority.label}
                                    </span>
                                  </div>
                                );
                              })()}

                              <div className="relative">
                                {editingNote === response.id ? (
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={noteValue}
                                      onChange={(e) => setNoteValue(e.target.value)}
                                      className="text-sm border rounded px-2 py-1 w-full"
                                      placeholder="Agregar nota..."
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          console.log('🔍 Enter presionado (tabla), valor:', noteValue);
                                          updateNote(response.id, noteValue);
                                        }
                                      }}
                                      autoFocus
                                    />
                                    <button
                                      onClick={() => {
                                        console.log('💾 Botón guardar clickeado (tabla), valor:', noteValue);
                                        updateNote(response.id, noteValue);
                                      }}
                                      className="text-green-600 hover:text-green-800"
                                    >
                                      <Save className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => startEditingNote(response.id, response.nota)}
                                      className="text-gray-600 hover:text-gray-800"
                                      title="Agregar/editar nota"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <span className="text-sm text-gray-600">
                                      {response.nota || 'Sin notas'}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <div className="flex items-center gap-1 flex-wrap">
                              {!response.contactado && (
                                <button
                                  onClick={() => markAsContacted(response.id)}
                                  className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                                  title="Marcar como contactado"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}

                              {response.contactado && !response.convertido && (
                                <button
                                  onClick={() => markAsConverted(response.id)}
                                  className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                                  title="Marcar como cliente convertido"
                                >
                                  <Star className="w-4 h-4" />
                                </button>
                              )}

                              <button
                                onClick={() => generateIndividualSummary(response)}
                                className="text-purple-600 hover:text-purple-900 p-1 hover:bg-purple-50 rounded"
                                title="Ficha para reunión"
                              >
                                <FileUser className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => exportIndividualCSV(response)}
                                className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                                title="Exportar datos"
                              >
                                <Database className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => setSelectedResponse(response)}
                                className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                                title="Ver detalles"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => deleteResponse(response.id)}
                                className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>

                              {response.contactado && (
                                <span className="text-green-600 font-semibold text-xs bg-green-100 px-2 py-1 rounded-full">
                                  OK
                                </span>
                              )}

                              {response.convertido && (
                                <span className="text-blue-600 font-semibold text-xs bg-blue-100 px-2 py-1 rounded-full">
                                  Cliente
                                </span>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 py-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Creado con{' '}
              <span className="text-red-500 mx-1" title="amor">❤️</span>
              {' '}por{' '}
              <a
                href="https://www.demosle.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors"
              >
                demosle
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Response Detail Modal */}
      {selectedResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Detalles de la Respuesta
                </h3>
                <button
                  onClick={() => setSelectedResponse(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <p className="text-gray-900">{selectedResponse.nombre}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <p className="text-gray-900">{selectedResponse.telefono}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedResponse.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Lead</label>
                  <div className="mt-1">
                    {renderLeadTypeBadge(selectedResponse.tipo_lead)}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Fecha de registro</label>
                  <p className="text-gray-900">{formatDate(selectedResponse.fecha_registro)}</p>
                </div>

                {/* Campos específicos para pre-llamadas */}
                {selectedResponse.tipo_lead === 'pre_llamada' && (
                  <>
                    {selectedResponse.sentimiento_gestion && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Sentimiento sobre gestión actual</label>
                        <p className="text-gray-900">{selectedResponse.sentimiento_gestion}</p>
                      </div>
                    )}
                    {selectedResponse.frecuencia_comunicacion && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Frecuencia de comunicación</label>
                        <p className="text-gray-900">{selectedResponse.frecuencia_comunicacion}</p>
                      </div>
                    )}
                    {selectedResponse.uso_tiempo_futuro && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Uso del tiempo futuro</label>
                        <p className="text-gray-900">{selectedResponse.uso_tiempo_futuro}</p>
                      </div>
                    )}
                    {selectedResponse.rapidez_meta && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Rapidez para lograr meta</label>
                        <p className="text-gray-900">{selectedResponse.rapidez_meta}</p>
                      </div>
                    )}
                    {selectedResponse.buscar_apoyo && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Buscar apoyo profesional</label>
                        <p className="text-gray-900">{selectedResponse.buscar_apoyo}</p>
                      </div>
                    )}
                  </>
                )}

                {/* Campos específicos para cotizaciones */}
                {selectedResponse.tipo_lead === 'cotizacion' && (
                  <>
                    {selectedResponse.flujo && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de Flujo</label>
                        <p className="text-gray-900">
                          {selectedResponse.flujo === 'formalizacion' ? 'Formalización' : 'Empresa Existente'}
                        </p>
                      </div>
                    )}
                    {selectedResponse.precio_estimado && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Precio Estimado</label>
                        <p className="text-gray-900">
                          ${selectedResponse.precio_estimado.mensual?.toLocaleString('es-CL') ||
                            selectedResponse.precio_estimado.formalizacion?.toLocaleString('es-CL')}
                          {selectedResponse.precio_estimado.mensual ? '/mes' : ' (formalización)'}
                        </p>
                      </div>
                    )}
                    {selectedResponse.datos_cotizacion && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Datos de la Empresa</label>
                        <div className="text-gray-900 space-y-1">
                          {selectedResponse.datos_cotizacion.tipoEmpresa && (
                            <p>Tipo: {selectedResponse.datos_cotizacion.tipoEmpresa}</p>
                          )}
                          {selectedResponse.datos_cotizacion.giro && (
                            <p>Giro: {selectedResponse.datos_cotizacion.giro}</p>
                          )}
                          {selectedResponse.datos_cotizacion.trabajadores !== undefined && (
                            <p>Trabajadores: {selectedResponse.datos_cotizacion.trabajadores}</p>
                          )}
                          {selectedResponse.datos_cotizacion.tamano && (
                            <p>Tamaño: {selectedResponse.datos_cotizacion.tamano}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {selectedResponse.nota && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Notas</label>
                    <p className="text-gray-900">{selectedResponse.nota}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;