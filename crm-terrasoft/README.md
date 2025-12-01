# CRM TerraSoft - Sistema de Gestión de Ventas

Sistema CRM desarrollado en React para gestión de ventas de software para empresas de retroexcavación.

## Características

- Dashboard con estadísticas globales y por socio
- Gestión completa de contactos (CRUD)
- Seguimiento de estados de venta
- Cálculo automático de comisiones
- Asignación de contactos a socios
- Interfaz moderna con Tailwind CSS

## Tecnologías

- React 18
- Vite
- Tailwind CSS
- Lucide React (iconos)

## Instalación

Las dependencias ya están instaladas. Si necesitas reinstalar:

```bash
npm install
```

## Ejecutar el proyecto

```bash
npm run dev
```

El proyecto se abrirá en `http://localhost:5173`

## Build para producción

```bash
npm run build
```

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera el build de producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta el linter

## Estructura del proyecto

```
crm-terrasoft/
├── src/
│   ├── CRMSystem.jsx    # Componente principal del CRM
│   ├── App.jsx          # Componente raíz
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales (Tailwind)
├── public/              # Archivos estáticos
├── index.html           # HTML principal
├── package.json         # Dependencias
├── tailwind.config.js   # Configuración de Tailwind
└── vite.config.js       # Configuración de Vite
```

## Uso

1. **Dashboard**: Vista principal con estadísticas de contactos, ventas cerradas e ingresos
2. **Contactos**: Gestión completa de contactos con formulario modal
3. **Estados de venta**:
   - Contactado
   - Reunión agendada
   - Propuesta enviada
   - En negociación
   - Venta cerrada
   - Perdido

## Próximas mejoras

- Persistencia de datos (LocalStorage o base de datos)
- Exportación de reportes
- Filtros y búsqueda avanzada
- Gráficos y métricas adicionales
