# App - Navegación (Expo Router)

Esta carpeta contiene todas las **rutas y pantallas** de la aplicación usando el sistema de enrutamiento basado en archivos de **Expo Router**.

## 🎯 Expo Router - File-based Routing

Expo Router usa la estructura de archivos para definir las rutas automáticamente.

## 📁 Estructura Actual

```
app/
├── _layout.tsx          # Layout raíz de la aplicación
├── modal.tsx            # Pantalla modal
└── (tabs)/              # Grupo de tabs
    ├── _layout.tsx      # Layout de tabs
    ├── index.tsx        # Tab 1 - Home (ruta: /)
    └── explore.tsx      # Tab 2 - Explore (ruta: /explore)
```

## 🗺️ Cómo Funcionan las Rutas

### Archivos → Rutas

| Archivo                    | Ruta             | Descripción           |
|---------------------------|------------------|-----------------------|
| `app/index.tsx`           | `/`              | Pantalla inicial      |
| `app/about.tsx`           | `/about`         | Pantalla About        |
| `app/user/profile.tsx`    | `/user/profile`  | Perfil de usuario     |
| `app/user/[id].tsx`       | `/user/:id`      | Ruta dinámica         |
| `app/(tabs)/index.tsx`    | `/`              | Home dentro de tabs   |
| `app/(tabs)/explore.tsx`  | `/explore`       | Explore tab           |

### Convenciones de Nombres

- **`index.tsx`**: Ruta raíz de una carpeta (`/`)
- **`[id].tsx`**: Parámetro dinámico (`:id`)
- **`[...slug].tsx`**: Catch-all route (cualquier subruta)
- **`(tabs)`**: Grupo (no aparece en la URL)
- **`_layout.tsx`**: Layout compartido
- **`+not-found.tsx`**: Página 404

## 📂 Estructura Recomendada Expandida

```
app/
├── _layout.tsx                    # Layout raíz
├── index.tsx                      # Redirect o splash
├── +not-found.tsx                 # Página 404
│
├── (auth)/                        # Grupo de autenticación
│   ├── _layout.tsx
│   ├── login.tsx                  # /login
│   ├── register.tsx               # /register
│   └── forgot-password.tsx        # /forgot-password
│
├── (tabs)/                        # Navegación principal (tabs)
│   ├── _layout.tsx
│   ├── index.tsx                  # / (Home)
│   ├── explore.tsx                # /explore
│   ├── invoices.tsx               # /invoices  
│   └── profile.tsx                # /profile
│
├── invoices/                      # Rutas de facturas
│   ├── [id].tsx                   # /invoices/:id (detalle)
│   ├── create.tsx                 # /invoices/create
│   └── edit/[id].tsx              # /invoices/edit/:id
│
├── settings/                      # Rutas de configuración
│   ├── index.tsx                  # /settings
│   ├── account.tsx                # /settings/account
│   └── notifications.tsx          # /settings/notifications
│
└── modal.tsx                      # Modal global
```

## 🔀 Navegación Programática

### useRouter Hook

```typescript
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const goToProfile = () => {
    router.push('/profile');
  };

  const goToInvoice = (id: string) => {
    router.push(`/invoices/${id}`);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <View>
      <Button title="Ver Perfil" onPress={goToProfile} />
      <Button title="Ver Factura" onPress={() => goToInvoice('123')} />
      <Button title="Volver" onPress={goBack} />
    </View>
  );
}
```

### Stack Navigation
- **`router.push()`**: Navega y añade a la pila (puedes volver)
- **`router.replace()`**: Reemplaza la pantalla actual
- **`router.back()`**: Vuelve atrás
- **`router.navigate()`**: Navega sin duplicar en pila

### Link Component

```typescript
import { Link } from 'expo-router';

<Link href="/profile">Ver Perfil</Link>
<Link href="/invoices/123">Ver Factura</Link>
<Link href={{ pathname: '/user/[id]', params: { id: '123' } }}>
  Ver Usuario
</Link>
```

## 🎨 Layouts

### _layout.tsx (Raíz)

```typescript
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen 
        name="invoices/[id]" 
        options={{ 
          title: 'Detalle de Factura',
          headerBackTitle: 'Volver'
        }} 
      />
    </Stack>
  );
}
```

### (tabs)/_layout.tsx

```typescript
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="invoices"
        options={{
          title: 'Facturas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

## 🔑 Rutas Dinámicas

### Archivo: `invoices/[id].tsx`

```typescript
import { useLocalSearchParams } from 'expo-router';

export default function InvoiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Factura ID: {id}</Text>
    </View>
  );
}
```

### Navegación a Ruta Dinámica

```typescript
router.push(`/invoices/${invoiceId}`);
// o
<Link href={`/invoices/${invoiceId}`}>Ver Factura</Link>
```

## 📦 Parámetros de Query

```typescript
// Navegar con params
router.push({
  pathname: '/search',
  params: { query: 'productos', category: 'electronics' }
});

// Leer params
const { query, category } = useLocalSearchParams<{
  query: string;
  category: string;
}>();
```

## 🔐 Protección de Rutas

### Redirect por Autenticación

```typescript
import { Redirect } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';

export default function ProtectedScreen() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <View>{/* Contenido protegido */}</View>;
}
```

### Layout con Guards

```typescript
// app/(protected)/_layout.tsx
import { Redirect, Slot } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
```

## 🎭 Modales

### Presentar como Modal

```typescript
// app/_layout.tsx
<Stack>
  <Stack.Screen 
    name="modal" 
    options={{ 
      presentation: 'modal',
      title: 'Mi Modal'
    }} 
  />
</Stack>

// Navegar
router.push('/modal');
```

### Modal con Dismiss

```typescript
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View>
      <Button title="Cerrar" onPress={() => router.back()} />
    </View>
  );
}
```

## 📱 Organización con Features

### Conectar Features a Rutas

```
src/features/invoices/
├── screens/
│   ├── InvoiceListScreen.tsx
│   ├── InvoiceDetailScreen.tsx
│   └── CreateInvoiceScreen.tsx

app/
├── (tabs)/
│   └── invoices.tsx          → Importa InvoiceListScreen
├── invoices/
│   ├── [id].tsx              → Importa InvoiceDetailScreen
│   └── create.tsx            → Importa CreateInvoiceScreen
```

**Ejemplo:**
```typescript
// app/(tabs)/invoices.tsx
import { InvoiceListScreen } from '@/src/features/invoices/screens/InvoiceListScreen';

export default InvoiceListScreen;
```

## ✅ Buenas Prácticas

1. **Screens en /src/features**: Lógica en features, rutas en /app
2. **Grupos (parentesis)**: Organiza sin afectar URLs
3. **Layouts compartidos**: Usa _layout.tsx para UX consistente
4. **TypeScript en params**: Tipea useLocalSearchParams
5. **Loading states**: Maneja carga de datos en screens
6. **Error boundaries**: Añade manejo de errores
7. **Deep linking**: Expo Router soporta deep links automáticamente

## 🔗 Deep Linking

Expo Router soporta deep links por defecto:

```
myapp://invoices/123  →  /invoices/123
```

Configurar en `app.json`:
```json
{
  "expo": {
    "scheme": "myapp"
  }
}
```

## 📚 Recursos

- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [Navigation Docs](https://reactnavigation.org/)
- [File-based Routing](https://docs.expo.dev/router/create-pages/)

## 🎯 Próximos Pasos

1. Crea pantallas en `/src/features/{feature}/screens`
2. Crea archivos de ruta en `/app` que importen esas screens
3. Configura navegación en `_layout.tsx`
4. Añade protección de rutas si es necesario
