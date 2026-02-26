# Components

Componentes UI reutilizables globales de la aplicación.

## 📁 Estructura Recomendada

```
components/
├── README.md
├── ui/                    # Componentes de UI base (botones, inputs, cards)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   └── ...
├── layout/                # Componentes de layout
│   ├── Container.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
├── forms/                 # Componentes de formularios
│   ├── FormInput.tsx
│   ├── FormSelect.tsx
│   └── FormCheckbox.tsx
└── feedback/              # Componentes de feedback
    ├── Loading.tsx
    ├── ErrorMessage.tsx
    └── EmptyState.tsx
```

## 🎯 Propósito

Esta carpeta contiene **componentes reutilizables** que se usan en **múltiples features** de la aplicación.

## ⚖️ Componentes Globales vs Feature Components

### Usar `/components` cuando:
- ✅ El componente se usa en **2 o más features diferentes**
- ✅ Es un componente **genérico** de UI (botón, input, card)
- ✅ Es parte del **design system** de la app
- ✅ No tiene lógica de negocio específica

### Usar `/src/features/{feature}/components` cuando:
- ✅ El componente es **específico de una feature**
- ✅ Solo se usa en **una funcionalidad**
- ✅ Tiene lógica de negocio acoplada a esa feature

**Ejemplo:**
- `Button.tsx` → `/components/ui/` (se usa en toda la app)
- `InvoiceCard.tsx` → `/src/features/invoices/components/` (solo para facturas)

## 📝 Ejemplos

### Button.tsx (Componente UI Base)
```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary',
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#5856D6',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### Card.tsx (Componente de Layout)
```typescript
import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
```

### Loading.tsx (Componente de Feedback)
```typescript
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
}

export function Loading({ message, size = 'large' }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color="#007AFF" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});
```

### EmptyState.tsx
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
}

export function EmptyState({ 
  icon = 'folder-open-outline',
  title,
  message,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color="#ccc" />
      <Text style={styles.title}>{title}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});
```

## 🏗️ Organización por Subcarpetas

### `/ui` - Componentes Base
Botones, inputs, badges, avatars, etc. Bloques de construcción básicos.

### `/layout` - Componentes de Layout
Containers, headers, grids, wrappers que definen estructura.

### `/forms` - Componentes de Formularios
Inputs especializados, validación visual, campos reutilizables.

### `/feedback` - Estados y Feedback
Loading, errores, estados vacíos, confirmaciones.

## 🎨 Design System

Considera crear un design system consistente:

```typescript
// components/ui/theme.ts
export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    text: '#000',
    textSecondary: '#666',
    background: '#F2F2F7',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};
```

## ✅ Buenas Prácticas

1. **Componentes pequeños y enfocados**: Una responsabilidad por componente
2. **Props bien tipadas**: Usa TypeScript para todas las props
3. **Valores por defecto**: Proporciona defaults razonables
4. **Composición sobre configuración**: Prefiere componentes componibles
5. **Accesibilidad**: Añade labels y hints de accesibilidad
6. **Documentación**: Comenta props complejas o comportamientos no obvios
7. **Exports nombrados**: Usa `export function` en lugar de `export default`

## 📦 Exportar Componentes

Crea un `index.ts` para facilitar imports:

```typescript
// components/ui/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';
export { Badge } from './Badge';
```

Uso:
```typescript
import { Button, Card, Input } from '@/components/ui';
```

## 🔄 Migración de Componentes

Si un componente de feature se usa en varios lugares:
1. Generalizarlo (eliminar lógica específica)
2. Moverlo a `/components`
3. Actualizar los imports

Si un componente global solo se usa en una feature:
1. Considerar moverlo a esa feature
2. Reducir código no utilizado
