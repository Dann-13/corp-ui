# Corp UI - Aplicación Móvil

Aplicación móvil desarrollada con **React Native** y **Expo** para la gestión empresarial.

## 🚀 Tecnologías

- **React Native** 0.81.5
- **Expo** ~54.0.33
- **Expo Router** ~6.0.23 - Navegación basada en archivos
- **TypeScript** ~5.9.2
- **React** 19.1.0

## 📁 Estructura del Proyecto

```
corp-ui/
├── app/                    # Rutas y navegación (Expo Router)
├── assets/                 # Imágenes, fuentes, archivos estáticos
├── components/             # Componentes reutilizables globales
├── constants/              # Constantes y configuraciones estáticas
├── hooks/                  # Custom hooks globales
├── scripts/                # Scripts de utilidad
├── src/                    # Código fuente principal
│   ├── api/               # Servicios y llamadas a APIs
│   ├── config/            # Configuración de la app
│   ├── context/           # React Context providers
│   ├── features/          # Funcionalidades por módulo
│   ├── services/          # Servicios de negocio
│   ├── store/             # Estado global (Redux/Zustand)
│   ├── types/             # TypeScript types globales
│   └── utils/             # Funciones utilitarias
├── .expo/                  # Archivos de configuración de Expo
├── .vscode/                # Configuración de VS Code
├── app.json                # Configuración de Expo
├── package.json            # Dependencias del proyecto
└── tsconfig.json           # Configuración de TypeScript
```

## 📂 Descripción de Carpetas

### `/app` - Navegación (Expo Router)
Contiene las rutas de la aplicación usando el sistema de enrutamiento basado en archivos de Expo Router.

- `_layout.tsx` - Layout raíz de la aplicación
- `(tabs)/` - Navegación por tabs
- `modal.tsx` - Pantallas modales

**Más info:** [app/README.md](app/README.md)

### `/src` - Código Fuente Principal

#### `/src/api` - APIs y Servicios HTTP
Todas las llamadas a APIs externas, configuración de clientes HTTP y servicios de datos.
**Más info:** [src/api/README.md](src/api/README.md)

#### `/src/config` - Configuración
Variables de entorno, configuraciones globales de la aplicación.
**Más info:** [src/config/README.md](src/config/README.md)

#### `/src/context` - React Context
Providers de contexto para estado global compartido.
**Más info:** [src/context/README.md](src/context/README.md)

#### `/src/features` - Funcionalidades por Módulo
Cada feature agrupa componentes, hooks, screens y tipos relacionados.
**Ejemplo:** `features/invoices/`, `features/auth/`
**Más info:** [src/features/README.md](src/features/README.md)

#### `/src/services` - Servicios de Negocio
Lógica de negocio, servicios nativos (storage, notificaciones, etc.).
**Más info:** [src/services/README.md](src/services/README.md)

#### `/src/store` - Estado Global
Gestión de estado global con Redux/Zustand/MobX.
**Más info:** [src/store/README.md](src/store/README.md)

#### `/src/types` - TypeScript Types
Tipos, interfaces y enums compartidos en toda la aplicación.
**Más info:** [src/types/README.md](src/types/README.md)

#### `/src/utils` - Utilidades
Funciones helper y utilidades reutilizables.
**Más info:** [src/utils/README.md](src/utils/README.md)

### `/components` - Componentes Globales
Componentes UI reutilizables en toda la aplicación.
**Más info:** [components/README.md](components/README.md)

### `/hooks` - Custom Hooks Globales
Hooks reutilizables compartidos en toda la app.
**Más info:** [hooks/README.md](hooks/README.md)

### `/constants` - Constantes
Valores constantes como temas, colores, configuraciones estáticas.
**Más info:** [constants/README.md](constants/README.md)

### `/assets` - Recursos Estáticos
Imágenes, iconos, fuentes y otros archivos estáticos.
**Más info:** [assets/README.md](assets/README.md)

## 🏃‍♂️ Comandos Disponibles

```bash
# Iniciar el servidor de desarrollo
npm start

# Iniciar en Android
npm run android

# Iniciar en iOS
npm run ios

# Iniciar en Web
npm run web

# Linter
npm run lint

# Resetear proyecto (limpia archivos de ejemplo)
npm run reset-project
```

## 🎯 Convenciones de Código

### Nombrado de Archivos

- **Componentes**: PascalCase - `UserCard.tsx`
- **Hooks**: camelCase con prefijo 'use' - `useAuth.ts`
- **Utilidades**: camelCase - `formatDate.ts`
- **Types**: camelCase con sufijo '.types' - `user.types.ts`
- **Services**: camelCase con sufijo '.service' - `auth.service.ts`

### Estructura de Componentes

```typescript
// Imports de librerías
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Imports de types
import type { User } from '@/src/types';

// Props interface
interface UserCardProps {
  user: User;
  onPress?: () => void;
}

// Componente
export function UserCard({ user, onPress }: UserCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### Imports con Alias

Usa el alias `@/` para importar desde la raíz:

```typescript
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { formatCurrency } from '@/src/utils/format';
import type { User } from '@/src/types';
```

## 🌟 Buenas Prácticas

1. **Componentización**: Divide componentes grandes en componentes más pequeños y reutilizables
2. **TypeScript**: Tipado estricto en todo el código
3. **Hooks**: Extrae lógica compleja a custom hooks
4. **Separación de responsabilidades**: UI, lógica de negocio y datos separados
5. **Performance**: Usa `React.memo`, `useMemo`, `useCallback` cuando sea necesario
6. **Accesibilidad**: Añade `accessibilityLabel` y `accessibilityHint` a elementos interactivos
7. **Testing**: Escribe tests para lógica crítica (utils, services, hooks)

## 📱 Organización por Features

Para funcionalidades grandes, usa la estructura de features:

```
src/features/invoices/
├── components/       # Componentes específicos de facturas
├── hooks/           # Hooks de facturas
├── screens/         # Pantallas de facturas
├── types/           # Tipos de facturas
└── index.ts         # Exports públicos
```

Luego conecta las screens a rutas en `/app`.

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz:

```env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_ENV=development
```

Accede con:
```typescript
process.env.EXPO_PUBLIC_API_URL
```

### TypeScript Path Alias

Ya configurado en `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 📚 Recursos

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 🤝 Contribución

1. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Realiza tus cambios siguiendo las convenciones
3. Haz commit: `git commit -m "feat: descripción del cambio"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crea un Pull Request

## 📝 Changelog

Ver el historial de cambios en el repositorio.

---

**Desarrollado con ❤️ para la gestión empresarial**
