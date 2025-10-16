// Datos de prueba para el desarrollo
export const mockResponses = [
  {
    id: 1,
    nombre: "Carlos Mendoza",
    telefono: "+56912345678",
    email: "carlos@empresa.cl",
    sentimiento_gestion: "No estoy conforme, no tengo control",
    frecuencia_comunicacion: "Una vez al mes, cuando tengo que pagar",
    uso_tiempo_futuro: "Me gustaría enfocarme más en el crecimiento de mi negocio y desarrollo de nuevos productos. También pasar más tiempo con mi familia.",
    rapidez_meta: "Lo antes posible (3 a 12 meses)",
    buscar_apoyo: "Sí, para lograrlo me ayudaría tener apoyo de expertos",
    fecha_registro: "2024-01-15 10:30:00",
    contactado: true,
    convertido: true,
    fecha_conversion: "2024-01-20 14:30:00",
    nota: "Cliente convertido exitosamente - firmó contrato anual",
    tipo_lead: "pre_llamada",
    tabla_origen: "form_responses"
  },
  {
    id: 2,
    nombre: "María Rodríguez",
    telefono: "+56987654321",
    email: "maria.rodriguez@pyme.cl",
    flujo: "empresa-existente",
    datos_cotizacion: {
      tipoEmpresa: "SPA",
      tamano: "pequeña",
      trabajadores: 5
    },
    precio_estimado: {
      mensual: 45000,
      anual: 540000
    },
    fecha_registro: "2024-01-14 14:20:00",
    contactado: true,
    convertido: false,
    nota: "Interesada en cotización - programar reunión",
    tipo_lead: "cotizacion",
    tabla_origen: "cotizaciones_leads"
  },
  {
    id: 3,
    nombre: "Pedro Silva",
    telefono: "+56911223344",
    email: "pedro@consultoría.cl",
    sentimiento_gestion: "Excelente, he delegado a mis asesores y me dan tranquilidad",
    frecuencia_comunicacion: "Semanalmente, cada vez que necesito apoyo o aclarar dudas",
    uso_tiempo_futuro: "Invertir en capacitación del equipo y desarrollar nuevas líneas de negocio.",
    rapidez_meta: "Lo antes posible (3 a 12 meses)",
    buscar_apoyo: "Sí, para lograrlo me ayudaría tener apoyo de expertos",
    fecha_registro: "2024-01-13 09:45:00",
    contactado: false,
    convertido: false,
    tipo_lead: "pre_llamada",
    tabla_origen: "form_responses"
  },
  {
    id: 4,
    nombre: "Ana González",
    telefono: "+56955667788",
    email: "ana@startup.cl",
    flujo: "formalizacion",
    datos_cotizacion: { tipoEmpresa: "SPA", giro: "tecnologia", trabajadores: 0 },
    precio_estimado: { formalizacion: 250000, mensual: 35000 },
    fecha_registro: "2024-01-12 16:15:00",
    contactado: true,
    convertido: false,
    nota: "Muy interesada en formalización - programar reunión para próxima semana",
    tipo_lead: "cotizacion",
    tabla_origen: "cotizaciones_leads"
  },
  {
    id: 5,
    nombre: "Roberto Castro",
    telefono: "+56944556677",
    email: "roberto@comercial.cl",
    sentimiento_gestion: "Bien, pero me gustaría mejorarla",
    frecuencia_comunicacion: "Una vez al mes, cuando tengo que pagar",
    uso_tiempo_futuro: "Abrir una nueva sucursal y contratar más personal. También mejorar mis procesos de venta.",
    rapidez_meta: "Prefiero esperar (un año o más)",
    buscar_apoyo: "No, prefiero mantener el control directo",
    fecha_registro: "2024-01-11 11:30:00",
    contactado: false,
    convertido: false,
    tipo_lead: "pre_llamada",
    tabla_origen: "form_responses"
  },
  {
    id: 6,
    nombre: "Lucia Fernández",
    telefono: "+56933445566",
    email: "lucia@restaurante.cl",
    flujo: "empresa-existente",
    datos_cotizacion: { tipoEmpresa: "EIRL", tamano: "mediana", trabajadores: 12 },
    precio_estimado: { mensual: 65000, anual: 780000 },
    fecha_registro: "2024-01-10 13:45:00",
    contactado: true,
    convertido: true,
    fecha_conversion: "2024-01-18 10:15:00",
    nota: "Cliente VIP - contrato premium firmado",
    tipo_lead: "cotizacion",
    tabla_origen: "cotizaciones_leads"
  },
  {
    id: 7,
    nombre: "Javiera Torres",
    telefono: "+56922334455",
    email: "javiera@example.cl",
    fecha_registro: "2024-01-16 15:20:00",
    contactado: false,
    convertido: false,
    nota: "Lead desde Guía Gastos SII - alta prioridad",
    tipo_lead: "guia_gastos_sii",
    tabla_origen: "leads_ads"
  },
  {
    id: 8,
    nombre: "Diego Vargas",
    telefono: "+56911998877",
    email: "diego@comercio.cl",
    fecha_registro: "2024-01-17 09:10:00",
    contactado: false,
    convertido: false,
    nota: "Registrado desde webinar gratuito - nuevo tipo de campaña",
    tipo_lead: "webinar_gratuito",
    tabla_origen: "leads_ads"
  },
  {
    id: 9,
    nombre: "Camila Bravo",
    telefono: "+56955443322",
    email: "camila@negocio.cl",
    fecha_registro: "2024-01-17 11:30:00",
    contactado: false,
    convertido: false,
    nota: "Lead desde calculadora de impuestos - campaña experimental",
    tipo_lead: "calculadora_impuestos",
    tabla_origen: "leads_ads"
  }
];

export const mockStats = {
  total_responses: 9,
  this_week: 5,
  today: 2,
  daily_average: 3
};