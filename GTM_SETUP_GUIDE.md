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
2. Ingresa tu URL de desarrollo: `http://localhost:5173`
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

---

## 🎯 ESTADO ACTUAL DE IMPLEMENTACIÓN

### ✅ **PÁGINAS CON TRACKING GTM COMPLETO**

#### **🏠 Página de Inicio** (`/`)
- **Page tracking**: ✅ Implementado
- **Navigation**: ✅ 8 links del menú
- **Hero CTAs**: ✅ Botones principales
- **Problem cards**: ✅ 3 tarjetas de dolor
- **Solution cards**: ✅ 3 tarjetas de solución
- **Testimonials**: ✅ Interacciones con testimonios
- **FAQ**: ✅ Acordeones expandibles
- **Final CTAs**: ✅ Empezar ahora + Hablar con asesor
- **Total tracking points**: 35+

#### **💰 Cotizador** (`/cotizador`)
- **Page tracking**: ✅ `trackQuoteEvent('page_view')`
- **Flow tracking**: ✅ Cada paso del flujo
- **Company selection**: ✅ `quote_has_company_yes/no`
- **Company types**: ✅ `quote_company_type_persona/eirl/spa/ltda_sa`
- **Company sizes**: ✅ `quote_size_emprendiendo/crecimiento/consolidada`
- **Final CTAs**: ✅ `quote_cta_whatsapp` + `quote_cta_meeting`
- **Conversion tracking**: ✅ Con datos de precio (UF/CLP)
- **Total tracking points**: 15+

#### **🛠️ Servicios** (`/servicios`)
- **Page tracking**: ✅ `trackPageView('Servicios')`
- **Hero CTAs**: ✅ `services_hero_cta_primary/secondary`
- **Final CTAs**: ✅ `services_final_cta_primary/secondary`
- **Button component**: ✅ Auto-tracking integrado
- **Total tracking points**: 8+

#### **📞 Contacto** (`/contacto`)
- **Page tracking**: ✅ `trackPageView('Contacto')`
- **Form tracking**: ✅ `trackFormStart/Submit`
- **Conversion tracking**: ✅ `trackConversion`
- **WhatsApp CTA**: ✅ `contact_whatsapp_cta`
- **Meeting CTA**: ✅ `contact_meeting_cta`
- **Contact actions**: ✅ Channel tracking
- **Total tracking points**: 10+

#### **📋 Páginas Informativas**
- **Como Funciona** (`/como-funciona`): ✅ Page tracking
- **Por Que Contadoor** (`/por-que-contadoor`): ✅ Page tracking
- **Sobre Nosotros** (`/sobre-nosotros`): ✅ Page tracking
- **Blog** (`/blog`): ✅ Page tracking
- **Recursos** (`/recursos`): ✅ Page tracking

### 📊 **TOTAL IMPLEMENTADO: 70+ TRACKING POINTS**

### 🎯 **EVENTOS GTM CONSOLIDADOS**

Los tracking points se agrupan en estos eventos principales:

1. **`page_view`** - Navegación SPA
2. **`button_click`** - Clicks en botones generales
3. **`cta_click`** - CTAs principales (conversión)
4. **`quote_calculator`** - Todo el flujo del cotizador
5. **`form_start/submit`** - Formularios de contacto
6. **`conversion`** - Conversiones finales
7. **`contact_action`** - Acciones de contacto

### 🔧 **COMPONENTES CON AUTO-TRACKING**

- **Button.jsx**: ✅ Tracking automático integrado
- **GTMTracker.jsx**: ✅ SPA page tracking
- **gtm.js**: ✅ Utilidades completas

### 📋 **PÁGINAS RESTANTES**

- [x] Blog (`/blog`) - ✅ Page tracking implementado
- [x] Recursos (`/recursos`) - ✅ Page tracking implementado
- [ ] Privacidad (`/privacidad`) - No necesario para tracking
- [ ] Términos (`/terminos`) - No necesario para tracking

### 🎯 **EVENTOS DE ALTA PRIORIDAD PARA GA4**

Configure estos como **Conversiones** en GA4:

1. **`quote_complete`** - Usuario completa cotizador ⭐
2. **`contact_whatsapp`** - Click en WhatsApp ⭐
3. **`contact_meeting`** - Agenda reunión ⭐
4. **`form_submit`** - Envía formulario contacto ⭐
5. **`cta_click`** - CTAs principales de conversión

### 🔥 **AUDIENCIAS SUGERIDAS GA4**

- **Lead Calificado**: Completó cotizador OR envió formulario
- **Alta Intención**: Visitó `/cotizador` + `/servicios`
- **Abandono Cotizador**: Inició pero no completó
- **WhatsApp Users**: Prefieren contacto inmediato

---

## ✅ **CHECKLIST FINAL DE IMPLEMENTACIÓN**

- [x] GTM Container configurado (GTM-PHGF2PCM)
- [x] Tracking en página Inicio (35+ points)
- [x] Tracking en Cotizador (15+ points)
- [x] Tracking en Servicios (8+ points)
- [x] Tracking en Contacto (10+ points)
- [x] Tracking en páginas informativas (3 páginas)
- [x] Componente Button con auto-tracking
- [x] SPA navigation tracking
- [x] Documentación actualizada
- [ ] Variables configuradas en GTM
- [ ] Triggers configurados en GTM
- [ ] Tags de GA4 configurados
- [ ] Eventos de conversión en GA4
- [ ] Testing en Preview Mode
- [ ] Validación en GA4 Real-time

🚀 **¡Implementación GTM completa y lista para configuración en Google Tag Manager!**