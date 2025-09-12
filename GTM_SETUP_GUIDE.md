# Guía de Configuración Google Tag Manager + GA4 para Contadoor

## 📋 Índice
1. [Configuración Inicial GTM](#1-configuración-inicial-gtm)
2. [Configuración GA4](#2-configuración-ga4)
3. [Variables en GTM](#3-variables-en-gtm)
4. [Triggers (Activadores)](#4-triggers-activadores)
5. [Tags (Etiquetas)](#5-tags-etiquetas)
6. [Eventos Personalizados](#6-eventos-personalizados)
7. [Verificación y Testing](#7-verificación-y-testing)

---

## 1. Configuración Inicial GTM

### ✅ Ya implementado
- **Container ID**: `GTM-PHGF2PCM`
- Scripts de GTM instalados en `index.html`
- DataLayer configurado en el código

### Próximos pasos en GTM:
1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Selecciona tu container `GTM-PHGF2PCM`
3. Configura el workspace para desarrollo

---

## 2. Configuración GA4

### Crear propiedad GA4:
1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad GA4
3. **Nombre**: "Contadoor - Aplicación Web"
4. **URL**: Tu dominio principal
5. Copia el **MEASUREMENT ID** (formato: G-XXXXXXXXXX)

### Enhanced Ecommerce (opcional):
- Habilita "Enhanced Ecommerce" para tracking de cotizaciones
- Configura eventos de conversión personalizados

---

## 3. Variables en GTM

Crear estas variables personalizadas:

### 3.1 Variables de DataLayer

| Nombre Variable | Tipo | Nombre DataLayer |
|----------------|------|------------------|
| `DL - Event` | Variable de capa de datos | `event` |
| `DL - Page Title` | Variable de capa de datos | `page_title` |
| `DL - Page Path` | Variable de capa de datos | `page_path` |
| `DL - Button Name` | Variable de capa de datos | `button_name` |
| `DL - Section` | Variable de capa de datos | `section` |
| `DL - CTA Text` | Variable de capa de datos | `cta_text` |
| `DL - CTA Position` | Variable de capa de datos | `cta_position` |
| `DL - Form Name` | Variable de capa de datos | `form_name` |
| `DL - Form Type` | Variable de capa de datos | `form_type` |
| `DL - Quote Action` | Variable de capa de datos | `quote_action` |
| `DL - Quote Step` | Variable de capa de datos | `quote_step` |
| `DL - Flow Type` | Variable de capa de datos | `flow_type` |
| `DL - Conversion Type` | Variable de capa de datos | `conversion_type` |

### 3.2 Variables de JavaScript

```javascript
// Variable: Get Current Section
function() {
  var path = {{Page Path}};
  switch(path) {
    case '/': return 'homepage';
    case '/servicios': return 'services';
    case '/cotizador': return 'quote_calculator';
    case '/contacto': return 'contact';
    case '/como-funciona': return 'how_it_works';
    case '/por-que-contadoor': return 'why_contadoor';
    case '/sobre-nosotros': return 'about_us';
    case '/recursos': return 'resources';
    default: return 'other';
  }
}
```

---

## 4. Triggers (Activadores)

### 4.1 Trigger de Inicialización
- **Nombre**: `GTM Init`
- **Tipo**: Inicialización
- **Se activa en**: Todas las páginas

### 4.2 Triggers de Páginas SPA
- **Nombre**: `SPA Page View`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `page_view`

### 4.3 Triggers de Botones y CTAs
- **Nombre**: `Button Clicks`
- **Tipo**: Evento personalizado  
- **Nombre del evento**: `button_click`

- **Nombre**: `CTA Clicks`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `cta_click`

### 4.4 Triggers de Formularios
- **Nombre**: `Form Start`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `form_start`

- **Nombre**: `Form Submit`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `form_submit`

### 4.5 Triggers del Cotizador
- **Nombre**: `Quote Start`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `quote_calculator`
- **Condición**: `{{DL - Quote Action}}` equals `start`

- **Nombre**: `Quote Step Complete`  
- **Tipo**: Evento personalizado
- **Nombre del evento**: `quote_calculator`
- **Condición**: `{{DL - Quote Action}}` equals `step_complete`

- **Nombre**: `Quote Complete`
- **Tipo**: Evento personalizado  
- **Nombre del evento**: `quote_calculator`
- **Condición**: `{{DL - Quote Action}}` equals `complete`

- **Nombre**: `Quote Abandon`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `quote_calculator`  
- **Condición**: `{{DL - Quote Action}}` equals `abandon`

### 4.6 Triggers de Conversiones
- **Nombre**: `Conversions`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `conversion`

---

## 5. Tags (Etiquetas)

### 5.1 Tag Principal GA4
- **Nombre**: `GA4 Config`
- **Tipo**: Configuración de Google Analytics: GA4
- **Measurement ID**: Tu ID de GA4 (G-XXXXXXXXXX)
- **Trigger**: `GTM Init`

### 5.2 Tags de Eventos GA4

#### Tag: GA4 Page Views
- **Nombre**: `GA4 - SPA Page View`
- **Tipo**: Evento de Google Analytics: GA4
- **Configuración**: `{{GA4 Config}}`
- **Nombre del evento**: `page_view`
- **Parámetros**:
  - `page_title`: `{{DL - Page Title}}`
  - `page_location`: `{{Page URL}}`
  - `page_path`: `{{DL - Page Path}}`
- **Trigger**: `SPA Page View`

#### Tag: GA4 Button Clicks
- **Nombre**: `GA4 - Button Clicks`
- **Tipo**: Evento de Google Analytics: GA4
- **Configuración**: `{{GA4 Config}}`
- **Nombre del evento**: `button_click`
- **Parámetros**:
  - `button_name`: `{{DL - Button Name}}`
  - `section`: `{{DL - Section}}`
  - `page_section`: `{{Get Current Section}}`
- **Trigger**: `Button Clicks`

#### Tag: GA4 CTA Clicks  
- **Nombre**: `GA4 - CTA Clicks`
- **Tipo**: Evento de Google Analytics: GA4
- **Configuración**: `{{GA4 Config}}`
- **Nombre del evento**: `cta_click`
- **Parámetros**:
  - `cta_text`: `{{DL - CTA Text}}`
  - `cta_position`: `{{DL - CTA Position}}`
  - `page_section`: `{{Get Current Section}}`
- **Trigger**: `CTA Clicks`

#### Tag: GA4 Form Events
- **Nombre**: `GA4 - Form Start`
- **Tipo**: Evento de Google Analytics: GA4
- **Configuración**: `{{GA4 Config}}`
- **Nombre del evento**: `form_start`
- **Parámetros**:
  - `form_name`: `{{DL - Form Name}}`
  - `form_type`: `{{DL - Form Type}}`
- **Trigger**: `Form Start`

- **Nombre**: `GA4 - Form Submit`
- **Tipo**: Evento de Google Analytics: GA4
- **Configuración**: `{{GA4 Config}}`
- **Nombre del evento**: `form_submit`
- **Parámetros**:
  - `form_name`: `{{DL - Form Name}}`
  - `form_type`: `{{DL - Form Type}}`
- **Trigger**: `Form Submit`

#### Tag: GA4 Quote Calculator
- **Nombre**: `GA4 - Quote Events`
- **Tipo**: Evento de Google Analytics: GA4
- **Configuración**: `{{GA4 Config}}`
- **Nombre del evento**: `quote_calculator`
- **Parámetros**:
  - `quote_action`: `{{DL - Quote Action}}`
  - `quote_step`: `{{DL - Quote Step}}`
  - `flow_type`: `{{DL - Flow Type}}`
- **Trigger**: `Quote Start`, `Quote Step Complete`, `Quote Complete`, `Quote Abandon`

#### Tag: GA4 Conversions
- **Nombre**: `GA4 - Conversions`
- **Tipo**: Evento de Google Analytics: GA4
- **Configuración**: `{{GA4 Config}}`
- **Nombre del evento**: `conversion`
- **Parámetros**:
  - `conversion_type`: `{{DL - Conversion Type}}`
  - `value`: `1` (puedes ajustar según necesidad)
- **Trigger**: `Conversions`

---

## 6. Eventos Personalizados

### Eventos de Alto Valor para Configurar como Conversiones en GA4:

1. **quote_complete** - Usuario completa cotizador
2. **form_submit** - Usuario envía formulario contacto  
3. **cta_click** (filtrado por botones específicos):
   - "Hablar con asesor"
   - "Agendar una reunión"
   - "Solicitar contacto ahora"

### Audiencias Sugeridas:
- **Usuarios Interesados**: Visitaron `/cotizador` o `/servicios`
- **Lead Calificado**: Completaron formulario o cotizador
- **Alto Engagement**: Más de 3 page views en sesión
- **Abandono Cotizador**: Iniciaron pero no completaron cotizador

---

## 7. Verificación y Testing

### 7.1 Usar GTM Preview Mode
1. En GTM, haz clic en "Preview"
2. Ingresa tu URL de desarrollo: `http://localhost:5174`
3. Navega por la aplicación y verifica que se disparen los eventos

### 7.2 Verificar eventos en el navegador
```javascript
// Ejecuta en Console del navegador para ver dataLayer
console.log(window.dataLayer);

// Filtrar solo eventos GTM
window.dataLayer.filter(item => item.event);
```

### 7.3 GA4 Real-time Reports
- Ve a GA4 > Reports > Realtime
- Navega por tu aplicación 
- Verifica que aparezcan los eventos en tiempo real

### 7.4 GA4 DebugView
- Instala GA4 Debugger Chrome Extension
- Activa debug mode
- Verifica parámetros de eventos en GA4

---

## 🚀 Lista de Verificación Final

- [ ] GTM Container publicado
- [ ] GA4 configurado y conectado
- [ ] Variables creadas en GTM
- [ ] Triggers configurados
- [ ] Tags de eventos funcionando
- [ ] Eventos aparecen en GA4 Real-time
- [ ] Conversiones configuradas en GA4
- [ ] Testing completo en Preview Mode

---

## 📊 Eventos Implementados en el Código

### Navegación SPA
```javascript
trackPageView(pageName, pageUrl)
```

### Botones y CTAs  
```javascript
trackButtonClick(buttonName, section, additionalData)
trackCTAClick(ctaText, position, section, destination)
```

### Formularios
```javascript
trackFormStart(formName, formType)
trackFormSubmit(formName, formType, additionalData)  
```

### Cotizador
```javascript
trackQuoteEvent(action, step, data)
// Actions: 'start', 'step_complete', 'abandon', 'complete'
```

### Conversiones
```javascript
trackConversion(conversionType, value, additionalData)
```

---

## 🎯 KPIs Sugeridos para Dashboards

1. **Funnel de Conversión**:
   - Visitantes únicos
   - Usuarios que ven servicios
   - Usuarios que inician cotizador  
   - Usuarios que completan cotizador
   - Usuarios que envían formulario contacto

2. **Engagement**:
   - Tiempo en página
   - Páginas por sesión
   - Tasa de rebote por página
   - Clicks en CTAs principales

3. **Cotizador Performance**:
   - Tasa de inicio
   - Tasa de completación por paso
   - Puntos de abandono más frecuentes
   - Flujo más utilizado (empresa existente vs nueva)

¡Con esta configuración tendrás un tracking completo y profesional de tu aplicación Contadoor! 🚀