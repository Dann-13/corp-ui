# Types

Tipos, interfaces y enums globales de TypeScript compartidos en toda la aplicación.

## Estructura recomendada:

```
types/
├── README.md
├── index.ts           # Re-exports de todos los tipos
├── common.types.ts    # Tipos comunes
├── api.types.ts       # Tipos de respuestas de API
├── navigation.types.ts# Tipos de navegación
└── models.ts          # Modelos de datos
```

## Ejemplos de uso:

### common.types.ts
```typescript
export type ID = string | number;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';
```

### api.types.ts
```typescript
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiListResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}
```

### navigation.types.ts
```typescript
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  '(tabs)': NavigatorScreenParams<TabsParamList>;
  modal: undefined;
  InvoiceDetail: { id: string };
};

export type TabsParamList = {
  index: undefined;
  explore: undefined;
  profile: undefined;
};

// Para uso con useNavigation
import type { StackScreenProps } from '@react-navigation/stack';
export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>;
```

### models.ts
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
  customer: Customer;
}

export enum InvoiceStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}
```

### index.ts (re-exports)
```typescript
export * from './common.types';
export * from './api.types';
export * from './navigation.types';
export * from './models';
```

## Buenas prácticas:

- **Centralizar** tipos compartidos aquí
- **Tipos específicos** de features van en cada feature
- **Usar** nombres descriptivos y consistentes
- **Preferir** interfaces sobre types para objetos
- **Usar** enums para valores fijos conocidos
- **Exportar** todo desde index.ts
