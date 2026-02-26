# Constants

Constantes y configuraciones estáticas de la aplicación.

## 📁 Estructura Recomendada

```
constants/
├── README.md
├── theme.ts            # Tema y colores (ya existe)
├── colors.ts           # Paleta de colores
├── typography.ts       # Tipografía y fuentes
├── spacing.ts          # Espaciados consistentes
├── api-constants.ts    # URLs y endpoints
├── app-constants.ts    # Constantes de la app
└── validation.ts       # Reglas de validación
```

## 🎯 Propósito

Contiene valores **constantes** que no cambian durante la ejecución de la aplicación.

## 📝 Ejemplos

### colors.ts
```typescript
export const Colors = {
  // Brand Colors
  primary: '#007AFF',
  secondary: '#5856D6',
  accent: '#FF2D55',

  // Semantic Colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5AC8FA',

  // Neutrals
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Text Colors
  text: {
    primary: '#000000',
    secondary: '#6B7280',
    disabled: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },

  // Light/Dark Mode
  light: {
    background: '#FFFFFF',
    text: '#000000',
    border: '#E5E7EB',
  },
  dark: {
    background: '#1F2937',
    text: '#FFFFFF',
    border: '#374151',
  },
} as const;
```

### typography.ts
```typescript
export const Typography = {
  // Font Families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    // Puedes añadir fuentes custom
    // heading: 'CustomFont-Bold',
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Font Weights
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
} as const;
```

### spacing.ts
```typescript
export const Spacing = {
  // Base unit: 4px
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,

  // Specific use cases
  screen: {
    horizontal: 16,
    vertical: 20,
  },
  card: {
    padding: 16,
    margin: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
} as const;
```

### api-constants.ts
```typescript
export const API = {
  // Base URLs
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  
  // Timeouts
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,

  // Endpoints
  endpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      register: '/auth/register',
      refresh: '/auth/refresh',
    },
    invoices: {
      list: '/invoices',
      detail: (id: string) => `/invoices/${id}`,
      create: '/invoices',
      update: (id: string) => `/invoices/${id}`,
      delete: (id: string) => `/invoices/${id}`,
    },
    users: {
      profile: '/users/profile',
      update: '/users/profile',
    },
  },

  // Status Codes
  statusCodes: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  },
} as const;
```

### app-constants.ts
```typescript
export const APP = {
  // App Info
  NAME: 'Corp UI',
  VERSION: '1.0.0',
  BUILD_NUMBER: 1,

  // Navigation
  INITIAL_ROUTE: '(tabs)',
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,

  // Storage Keys
  storageKeys: {
    TOKEN: '@auth:token',
    USER: '@auth:user',
    THEME: '@app:theme',
    LANGUAGE: '@app:language',
  },

  // Date Formats
  dateFormats: {
    display: 'DD/MM/YYYY',
    api: 'YYYY-MM-DD',
    dateTime: 'DD/MM/YYYY HH:mm',
  },

  // Currency
  CURRENCY: 'COP',
  LOCALE: 'es-CO',

  // Validation
  validation: {
    MIN_PASSWORD_LENGTH: 8,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  },

  // Timeouts
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,

  // Limits
  MAX_IMAGES_UPLOAD: 5,
  MAX_COMMENT_LENGTH: 500,
} as const;
```

### validation.ts
```typescript
export const Validation = {
  // RegEx Patterns
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[0-9]{10}$/,
    url: /^https?:\/\/.+/,
    alphanumeric: /^[a-zA-Z0-9]+$/,
    // NIT Colombiano
    nit: /^[0-9]{9,10}$/,
    // Cédula Colombiana
    cedula: /^[0-9]{7,10}$/,
  },

  // Error Messages
  messages: {
    required: 'Este campo es requerido',
    email: 'Email inválido',
    phone: 'Teléfono inválido (10 dígitos)',
    minLength: (min: number) => `Mínimo ${min} caracteres`,
    maxLength: (max: number) => `Máximo ${max} caracteres`,
    minValue: (min: number) => `Valor mínimo: ${min}`,
    maxValue: (max: number) => `Valor máximo: ${max}`,
    passwordWeak: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número',
    passwordMismatch: 'Las contraseñas no coinciden',
    invalidFormat: 'Formato inválido',
  },

  // Rules
  rules: {
    password: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumber: true,
      requireSpecialChar: false,
    },
    username: {
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
    },
  },
} as const;
```

### screen-names.ts (Para navegación)
```typescript
export const ScreenNames = {
  // Tabs
  HOME: 'index',
  EXPLORE: 'explore',
  PROFILE: 'profile',

  // Modals
  MODAL: 'modal',

  // Auth
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',

  // Invoices
  INVOICES: 'invoices',
  INVOICE_DETAIL: 'invoice-detail',
  CREATE_INVOICE: 'create-invoice',
  EDIT_INVOICE: 'edit-invoice',

  // Settings
  SETTINGS: 'settings',
  CHANGE_PASSWORD: 'change-password',
} as const;
```

## 🎨 Tema Existente

Ya tienes un archivo `theme.ts` creado. Puedes extenderlo o reorganizarlo usando las constantes de arriba.

## ✅ Usar en Estilos

```typescript
import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants';

const styles = StyleSheet.create({
  container: {
    padding: Spacing.base,
    backgroundColor: Colors.background.primary,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  button: {
    paddingVertical: Spacing.button.paddingVertical,
    paddingHorizontal: Spacing.button.paddingHorizontal,
    backgroundColor: Colors.primary,
  },
});
```

## 📝 Diferencia con /src/config

- **constants/**: Valores estáticos, hardcoded, no cambian
- **config/**: Configuración que puede cambiar por entorno (dev/prod)

## ✅ Buenas Prácticas

1. **Usar `as const`**: Para inferencia de tipos correcta
2. **Nombrar en UPPER_CASE**: Para constantes verdaderas
3. **Organizar por categoría**: Agrupar constantes relacionadas
4. **Documentar**: Explicar valores no obvios
5. **TypeScript**: Exportar tipos derivados cuando sea útil
6. **No duplicar**: Si un valor está aquí, no lo hardcodees en otro lugar

## 📦 Export Type

Puedes exportar tipos derivados:

```typescript
// constants/colors.ts
export const Colors = { /* ... */ } as const;
export type ColorKeys = keyof typeof Colors;
```
