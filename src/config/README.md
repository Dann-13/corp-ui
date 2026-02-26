# Config

Configuraciones globales de la aplicación.

## Estructura recomendada:

```
config/
├── README.md
├── app.config.ts      # Configuración general de la app
├── env.ts             # Variables de entorno
└── theme.config.ts    # Configuración del tema (si es diferente a constants/theme.ts)
```

## Ejemplos de uso:

### env.ts
```typescript
export const ENV = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  API_TIMEOUT: 10000,
  APP_NAME: 'Corp UI',
  VERSION: '1.0.0',
};
```

### app.config.ts
```typescript
export const APP_CONFIG = {
  defaultLanguage: 'es',
  supportedLanguages: ['es', 'en'],
  dateFormat: 'DD/MM/YYYY',
  currency: 'COP',
  pagination: {
    defaultPageSize: 20,
  },
};
```

## Buenas prácticas:

- **No commitear** archivos con datos sensibles (.env)
- **Documentar** todas las variables de entorno necesarias
- **Usar** valores por defecto seguros
- **Centralizar** toda la configuración aquí
