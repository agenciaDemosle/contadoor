ONTADOOR — GA4 IMPLEMENTACIÓN TOTAL (Paso a Paso)

Propiedad: contadoor.cl
Estado: GTM listo. Ahora cerramos GA4: conversiones, dimensiones, audiencias, reportes, calidad de datos y Ads.

0) Resumen actual (hecho ✅)

Eventos derivados (Opción B) + CLP, marcados como conversión:

quote_completion → 160.000 CLP

form_conversion → 100.000 CLP

video_unlock_conversion → 50.000 CLP

meeting_scheduled → 200.000 CLP

master_conversion → valor dinámico desde conversion_value (CLP)

20 dimensiones personalizadas (Ámbito: Evento):

Cotizador: quote_action, quote_step, flow_type, company_size, company_type, price_uf, price_clp

Video: progress, threshold, href

Formularios: form_name, form_type, lead_score

Conversiones: conversion_type, conversion_value, service

CTAs/Navegación: cta_text, cta_position, section, button_name, page_section

UTM plan: usar utm_source / utm_medium / utm_campaign en Email, Meta, etc.

1) Prioridad inmediata (hacer ahora)

Medición mejorada (SPA): Flujos de datos → Web → Medición mejorada → desactivar “Vistas de página” (evita doble page_view en SPA).

Retención de datos: 14 meses (Admin → Conservación de datos).

Exclusiones de referencia: agrega calendly.com (y pasarelas si aplica) en Recogida de datos → Exclusiones de referencia.

Moneda y zona: CLP + Santiago (Propiedad → Detalles).

Filtro tráfico interno: Definir tráfico interno (IPs casa/oficina/dev).

2) Dimensiones y métricas (reporting PRO)

Dimensiones: ya creadas (las 20 de arriba).

Métricas personalizadas (Ámbito: Evento):

conversion_value (Número, CLP)

price_clp (Número, CLP)

price_uf (Número)

progress (Número, 0–1)

3) Audiencias recomendadas

Quote Completers – 30d EXCLUSION → event_name=quote_calculator AND quote_action=complete

Quote Abandoners – 14d REMARKETING

Incluir: quote_calculator AND quote_action=start

Excluir: quote_calculator AND quote_action=complete

High Intent – 7d PREMIUM → (meet_video_unlocked) OR (quote_calculator AND quote_step ≥ 3)

All Converters – 90d LOOKALIKE → event_name=conversion

Video Engagers – 30d → meet_video_progress AND progress ≥ 0.5

Abandono por paso (7/30d) → quote_step ≥ 3 y sin quote_action=complete

High value → price_clp ≥ X o conversion_value ≥ X

Vieron unlock pero no reunión → meet_video_unlocked y sin meeting_scheduled

4) Informes / Explorar

Embudo Cotizador (Funnel):

quote_calculator (quote_action=start)

quote_calculator (step_complete, step=2)

quote_calculator (step_complete, step=3)

quote_calculator (step_complete, step=4)

quote_calculator (complete)
Dimensiones: flow_type, company_size, company_type

Embudo Video → Reunión: meet_video_open → meet_video_unlocked → meeting_scheduled

Atribución (Path exploration): conversion, quote_completion, form_conversion × source/medium/campaign

Heatmap Secciones/CTAs (Free): section, cta_text con event_count / unique_users

5) Atribución y Ads

Vinculación: Google Ads (listo) y Search Console (sugerido).

Modelo/ventana atribución: Data-driven; lookback 90d adquisición / 60d todo.

Importar conversiones a Ads (las 5) y verificar moneda CLP en Ads.

Grupos de canales personalizados: normaliza utm_medium (cpc, paid_social, email, whatsapp…), evita “Unassigned”.

Plantillas UTM:

Email: ?utm_source=newsletter&utm_medium=email&utm_campaign={{campaña}}

Meta Ads: ?utm_source=meta&utm_medium=cpc&utm_campaign={{nombre_campaña}}

Google Ads: auto-tagging (gclid) + naming consistente.

6) Alertas inteligentes (Custom Insights)

Cotizador bajo: quote_calculator (complete) < 5/día

Abandono 80%+: ratio abandon/start > 0.8

Video sin unlock: meet_video_open > 20 y meet_video_unlocked = 0

Pico tráfico: usuarios +50% vs promedio 7 días

7) Integraciones / Data avanzada (fase 2)

BigQuery linking (raw data para SQL y modelos).

Cost upload (Meta/TikTok) a GA4 → ROAS multicanal.

Measurement Protocol / API Secret (server-side si quieres).

User-ID (si hay login).

Consent Mode v2 (si aplica).

8) Dashboard Ejecutivo (Looker Studio)

KPIs: quote_completion, meeting_scheduled, CPA, ROAS (CLP).

Funnel cotizador con abandono por paso.

Top campañas por valor (CLP) y por meeting_scheduled.

Secciones/CTAs con mejor performance.

9) QA operativo (checklist)

DebugView: dispara quote_calculator→complete, form_submit(contact), meet_video_unlocked, meeting_scheduled, conversion.

Tiempo real: verificar eventos derivados y conversiones ON.

24–48h: audiencias empiezan a poblar.

Ads: conversiones importadas con valores CLP.

10) Roadmap sugerido

Calidad de datos (Sección 1)

Audiencias + Informes (Secciones 3 y 4)

Atribución/Ads (Sección 5)

Alertas (Sección 6)

Integraciones (Sección 7)

Dashboard (Sección 8)