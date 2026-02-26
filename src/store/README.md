# Store

Estado global de la aplicación (si usas Redux, Zustand, MobX, etc.).

## Estructura recomendada (ejemplo con Zustand):

```
store/
├── README.md
├── index.ts              # Exports principales
├── useAuthStore.ts       # Store de autenticación
├── useInvoiceStore.ts    # Store de facturas
└── useUserStore.ts       # Store de usuario
```

## Ejemplo con Zustand:

### useAuthStore.ts
```typescript
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  login: (user, token) => set({
    user,
    token,
    isAuthenticated: true,
  }),
  
  logout: () => set({
    user: null,
    token: null,
    isAuthenticated: false,
  }),
}));
```

### Uso en componentes
```typescript
import { useAuthStore } from '@/src/store/useAuthStore';

export function ProfileScreen() {
  const { user, logout } = useAuthStore();
  
  return (
    <View>
      <Text>{user?.name}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
```

## Alternativas:

- **Redux Toolkit**: Para apps grandes y complejas
- **Zustand**: Simple y minimalista (recomendado)
- **Jotai/Recoil**: Estado atómico
- **Context API**: Para apps pequeñas (ver /context)

## Cuándo usar Store vs Context:

- **Store (Zustand/Redux)**: Estado complejo, muchas actualizaciones, performance crítica
- **Context**: Estado simple, pocas actualizaciones, acoplado al árbol de componentes

## Buenas prácticas:

- **Separar** stores por dominio
- **Evitar** duplicar estado entre Context y Store
- **Usar** selectores para optimizar renders
- **Persistir** estado importante con AsyncStorage
