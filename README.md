# Contadoor - Plataforma de Servicios Contables

## Descripción
Plataforma web profesional para Contadoor, un servicio contable disruptivo con cotizador online interactivo.

## Tecnologías
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Framer Motion (animaciones)
- React Hook Form + Zod (formularios)

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── quote/       # Componentes del cotizador
│   └── ...
├── pages/           # Páginas principales
├── lib/            # Utilidades y lógica de negocio
└── assets/         # Recursos estáticos
```

## Características Principales

### Cotizador Online
- Wizard multistep interactivo
- Cálculo automático de precios
- Validación de formularios
- Guardado de progreso

### Páginas
- **Inicio**: Hero, beneficios, diferenciadores
- **Servicios**: Catálogo de servicios completo
- **Cotizador**: Herramienta de cotización online
- **Cómo Funciona**: Timeline del proceso
- **Por qué Contadoor**: Comparación y diferenciadores
- **Sobre Nosotros**: Historia, equipo y valores
- **Recursos**: Blog y recursos descargables
- **Contacto**: Formulario y datos de contacto

### Diseño
- Paleta de colores personalizada (Morado #A0569A)
- Tipografía Inter con pesos 400-900
- Componentes con bordes redondeados
- Animaciones suaves con Framer Motion
- Diseño responsive mobile-first

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Compilar para producción
- `npm run preview` - Previsualizar build de producción

## Próximos Pasos
- [ ] Integración con API/CRM real
- [ ] Implementación de Analytics (GTM)
- [ ] Optimización SEO avanzada
- [ ] Tests unitarios y E2E
- [ ] Internacionalización
