# Context

Context Providers de React para estado global de la aplicación.

## Estructura recomendada:

```
context/
├── README.md
├── AuthContext.tsx        # Context de autenticación
├── ThemeContext.tsx       # Context de tema (si no usas @react-navigation/native)
└── UserContext.tsx        # Context de usuario
```

## Ejemplos de uso:

### AuthContext.tsx
```typescript
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Lógica de login
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
```

### Uso en _layout.tsx
```typescript
import { AuthProvider } from '@/src/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* resto de la app */}
    </AuthProvider>
  );
}
```

## Buenas prácticas:

- **Exportar** el Provider y el hook personalizado juntos
- **Validar** que el hook se use dentro del Provider
- **Evitar** poner demasiada lógica en los Contexts
- **Separar** Contexts por responsabilidad
