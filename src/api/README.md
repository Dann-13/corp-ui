# API

Esta carpeta contiene todos los servicios y configuraciones relacionadas con las llamadas a APIs externas.

## Estructura recomendada:

```
api/
├── README.md
├── client.ts          # Configuración del cliente HTTP (axios, fetch, etc.)
├── endpoints.ts       # Definición de URLs de endpoints
└── services/
    ├── auth.service.ts       # Servicios de autenticación
    ├── user.service.ts       # Servicios de usuarios
    └── invoice.service.ts    # Servicios de facturas
```

## Ejemplos de uso:

### client.ts
```typescript
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### auth.service.ts
```typescript
import { apiClient } from '../client';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },
  
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};
```

## Buenas prácticas:

- **Centralizar** todas las llamadas a APIs en esta carpeta
- **Tipar** las respuestas con TypeScript interfaces
- **Manejar errores** de forma consistente
- **Usar interceptors** para añadir tokens de autenticación
- **Separar servicios** por dominio o entidad
