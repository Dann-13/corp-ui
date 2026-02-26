# 📱 Corp UI - Guía de Estructura del Proyecto

> **Aplicación móvil con React Native + Expo para gestión empresarial**

Esta guía te ayudará a entender la organización del proyecto y dónde colocar cada tipo de archivo.

---

## 🗂️ Estructura Visual Completa

```
corp-ui/
│
├── 📱 app/                         # RUTAS Y NAVEGACIÓN (Expo Router)
│   ├── _layout.tsx                 │ Layout raíz de la app
│   ├── modal.tsx                   │ Pantallas modales
│   │                               │
│   ├── (auth)/                     │ Rutas de autenticación
│   │   ├── login.tsx               │ → /login
│   │   └── register.tsx            │ → /register
│   │                               │
│   ├── (tabs)/                     │ Navegación principal (tabs)
│   │   ├── _layout.tsx             │ Layout de tabs
│   │   ├── index.tsx               │ → / (Home)
│   │   ├── explore.tsx             │ → /explore
│   │   └── profile.tsx             │ → /profile
│   │                               │
│   └── invoices/                   │ Rutas de facturas
│       ├── [id].tsx                │ → /invoices/:id
│       └── create.tsx              │ → /invoices/create
│   
│   👉 Ver: app/README.md
│
├── 🎨 assets/                      # RECURSOS ESTÁTICOS
│   ├── images/                     │ Imágenes, logos, backgrounds
│   ├── icons/                      │ Iconos personalizados
│   ├── fonts/                      │ Fuentes custom
│   ├── animations/                 │ Lottie animations (.json)
│   └── data/                       │ Datos mock, JSONs estáticos
│
│   👉 Ver: assets/README.md
│
├── 🧩 components/                  # COMPONENTES GLOBALES REUTILIZABLES
│   ├── ui/                         │ Componentes base (Button, Card, Input)
│   ├── layout/                     │ Layouts (Header, Container)
│   ├── forms/                      │ Componentes de formularios
│   └── feedback/                   │ Loading, ErrorMessage, EmptyState
│
│   👉 Ver: components/README.md
│
├── 🔧 constants/                   # CONSTANTES Y VALORES ESTÁTICOS
│   ├── theme.ts                    │ Tema actual (Dark/Light)
│   ├── colors.ts                   │ Paleta de colores
│   ├── typography.ts               │ Fuentes y tamaños
│   ├── spacing.ts                  │ Espaciados consistentes
│   └── validation.ts               │ Reglas y patrones de validación
│
│   👉 Ver: constants/README.md
│
├── 🪝 hooks/                       # CUSTOM HOOKS GLOBALES
│   ├── use-api.ts                  │ Hook para llamadas a API
│   ├── use-debounce.ts             │ Debounce de valores
│   ├── use-async.ts                │ Manejo de estados async
│   ├── use-form.ts                 │ Manejo de formularios
│   └── use-color-scheme.ts         │ Detecta tema dark/light ✅
│
│   👉 Ver: hooks/README.md
│
├── 💻 src/                         # CÓDIGO FUENTE PRINCIPAL
│   │
│   ├── 🌐 api/                     │ LLAMADAS A APIs
│   │   ├── client.ts               │ Configuración HTTP (axios/fetch)
│   │   ├── endpoints.ts            │ URLs de endpoints
│   │   └── services/               │
│   │       ├── auth.service.ts     │ Servicios de autenticación
│   │       ├── invoice.service.ts  │ Servicios de facturas
│   │       └── user.service.ts     │ Servicios de usuarios
│   │
│   │   👉 Ver: src/api/README.md
│   │
│   ├── ⚙️ config/                  │ CONFIGURACIÓN
│   │   ├── env.ts                  │ Variables de entorno
│   │   └── app.config.ts           │ Configuración general
│   │
│   │   👉 Ver: src/config/README.md
│   │
│   ├── 🔄 context/                 │ REACT CONTEXT PROVIDERS
│   │   ├── AuthContext.tsx         │ Context de autenticación
│   │   ├── ThemeContext.tsx        │ Context de tema
│   │   └── UserContext.tsx         │ Context de usuario
│   │
│   │   👉 Ver: src/context/README.md
│   │
│   ├── 🎯 features/                │ FUNCIONALIDADES POR MÓDULO
│   │   │
│   │   ├── auth/                   │ Feature: Autenticación
│   │   │   ├── components/         │ Componentes específicos
│   │   │   ├── hooks/              │ Hooks específicos
│   │   │   ├── screens/            │ Pantallas
│   │   │   └── types/              │ Tipos TypeScript
│   │   │
│   │   ├── invoices/               │ Feature: Facturas
│   │   │   ├── components/         │ InvoiceCard, InvoiceList
│   │   │   ├── hooks/              │ useInvoices, useCreateInvoice
│   │   │   ├── screens/            │ InvoicesScreen, DetailScreen
│   │   │   └── types/              │ invoice.types.ts
│   │   │
│   │   └── profile/                │ Feature: Perfil
│   │       ├── components/         │ ProfileCard, SettingsForm
│   │       ├── screens/            │ ProfileScreen
│   │       └── types/              │ profile.types.ts
│   │
│   │   👉 Ver: src/features/README.md
│   │
│   ├── 🛠️ services/                │ SERVICIOS DE NEGOCIO
│   │   ├── storage.service.ts      │ AsyncStorage, SecureStore
│   │   ├── notification.service.ts │ Push notifications
│   │   ├── analytics.service.ts    │ Analytics y tracking
│   │   └── permission.service.ts   │ Permisos del dispositivo
│   │
│   │   👉 Ver: src/services/README.md
│   │
│   ├── 🗄️ store/                   │ ESTADO GLOBAL (Redux/Zustand)
│   │   ├── useAuthStore.ts         │ Store de autenticación
│   │   ├── useInvoiceStore.ts      │ Store de facturas
│   │   └── useUserStore.ts         │ Store de usuario
│   │
│   │   👉 Ver: src/store/README.md
│   │
│   ├── 📘 types/                   │ TYPESCRIPT TYPES GLOBALES
│   │   ├── common.types.ts         │ Tipos comunes
│   │   ├── api.types.ts            │ Tipos de respuestas API
│   │   ├── navigation.types.ts     │ Tipos de navegación
│   │   └── models.ts               │ Modelos de datos (User, Invoice)
│   │
│   │   👉 Ver: src/types/README.md
│   │
│   └── 🔧 utils/                   │ FUNCIONES UTILITARIAS
│       ├── format.ts               │ Formateo (moneda, teléfono)
│       ├── validation.ts           │ Validaciones
│       ├── date.ts                 │ Utilidades de fechas
│       ├── string.ts               │ Utilidades de strings
│       └── array.ts                │ Utilidades de arrays
│
│       👉 Ver: src/utils/README.md
│
├── 📄 Archivos de Configuración
│   ├── package.json                │ Dependencias
│   ├── tsconfig.json               │ Config de TypeScript
│   ├── app.json                    │ Config de Expo
│   ├── eslint.config.js            │ Linter
│   └── .gitignore                  │ Archivos ignorados por Git
│
└── 📚 Documentación
    ├── README.md                   │ README general del proyecto
    └── ESTRUCTURA.md               │ Este archivo

```

---

## 🎯 ¿Dónde va cada cosa?

### 🖼️ **Tengo una imagen/icono**
→ `assets/images/` o `assets/icons/`

### 🎨 **Tengo un componente reutilizable (Button, Card)**
→ `components/ui/`

### 🏗️ **Tengo un componente específico de Facturas**
→ `src/features/invoices/components/`

### 📱 **Tengo una nueva pantalla**
1. Crear screen en → `src/features/{feature}/screens/`
2. Conectar a ruta en → `app/{ruta}.tsx`

### 🔗 **Tengo una llamada a API**
→ `src/api/services/{nombre}.service.ts`

### 🪝 **Tengo un hook reutilizable**
→ `hooks/` (si es global) o `src/features/{feature}/hooks/` (si es específico)

### 💾 **Tengo estado global**
→ `src/store/` o `src/context/`

### 🔧 **Tengo una función utilitaria**
→ `src/utils/`

### 📘 **Tengo tipos TypeScript compartidos**
→ `src/types/`

### 🎨 **Tengo colores o constantes**
→ `constants/`

---

## 🚀 Flujo de Desarrollo

### 1️⃣ Crear una Nueva Feature (Ejemplo: Productos)

```bash
# 1. Crear estructura de carpetas
src/features/products/
├── components/
├── hooks/
├── screens/
└── types/

# 2. Crear tipos
src/features/products/types/product.types.ts

# 3. Crear servicio API
src/api/services/product.service.ts

# 4. Crear hook
src/features/products/hooks/useProducts.ts

# 5. Crear componentes
src/features/products/components/ProductCard.tsx

# 6. Crear screen
src/features/products/screens/ProductsScreen.tsx

# 7. Crear ruta
app/(tabs)/products.tsx → importa ProductsScreen
```

### 2️⃣ Crear un Componente Reutilizable

```bash
# Si se usa en múltiples features
components/ui/Badge.tsx

# Si es específico de una feature
src/features/invoices/components/InvoiceStatus.tsx
```

### 3️⃣ Añadir una Constante

```typescript
// constants/app-constants.ts
export const APP = {
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
};
```

---

## 🏛️ Arquitectura del Proyecto

```
┌─────────────────────────────────────────────┐
│           EXPO ROUTER (/app)                │
│         Rutas y Navegación                  │
└─────────────────┬───────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────┐
│         SCREENS (/src/features)             │
│      Lógica de presentación                 │
└─────────────────┬───────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────┐
│       COMPONENTS (/components)              │
│         UI reutilizable                     │
└─────────────────┬───────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ↓                   ↓
┌──────────────┐    ┌──────────────┐
│ HOOKS        │    │ SERVICES     │
│ Lógica       │    │ APIs         │
└──────────────┘    └──────────────┘
        │                   │
        └─────────┬─────────┘
                  ↓
        ┌──────────────────┐
        │  STORE/CONTEXT   │
        │  Estado Global   │
        └──────────────────┘
```

---

## ✅ Convenciones de Código

### 📝 Nombres de Archivos

| Tipo          | Convención                | Ejemplo                    |
|---------------|---------------------------|----------------------------|
| Componente    | PascalCase               | `UserCard.tsx`             |
| Hook          | camelCase + `use`        | `useAuth.ts`               |
| Service       | camelCase + `.service`   | `auth.service.ts`          |
| Type          | camelCase + `.types`     | `user.types.ts`            |
| Util          | camelCase                | `formatDate.ts`            |
| Constante     | camelCase o UPPER_CASE   | `colors.ts`, `API_URL`     |

### 📦 Imports

Usa el alias `@/` para imports absolutos:

```typescript
// ✅ Bueno
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/use-auth';
import { formatCurrency } from '@/src/utils/format';

// ❌ Evitar
import { Button } from '../../../components/ui/Button';
```

---

## 📚 Recursos y Documentación

Cada carpeta tiene su propio **README.md** con:
- ✅ Propósito de la carpeta
- ✅ Ejemplos de código
- ✅ Buenas prácticas
- ✅ Estructura recomendada

### 📖 Índice de READMEs

- [app/README.md](app/README.md) - Rutas y navegación
- [assets/README.md](assets/README.md) - Recursos estáticos
- [components/README.md](components/README.md) - Componentes globales
- [constants/README.md](constants/README.md) - Constantes
- [hooks/README.md](hooks/README.md) - Custom hooks
- [src/api/README.md](src/api/README.md) - APIs y servicios HTTP
- [src/config/README.md](src/config/README.md) - Configuración
- [src/context/README.md](src/context/README.md) - React Context
- [src/features/README.md](src/features/README.md) - Features por módulo
- [src/services/README.md](src/services/README.md) - Servicios de negocio
- [src/store/README.md](src/store/README.md) - Estado global
- [src/types/README.md](src/types/README.md) - TypeScript types
- [src/utils/README.md](src/utils/README.md) - Utilidades

---

## 🎓 Primeros Pasos

### 1. Lee la documentación básica
- [ESTRUCTURA.md](ESTRUCTURA.md) ← **Estás aquí**
- [app/README.md](app/README.md) - Cómo crear rutas
- [src/features/README.md](src/features/README.md) - Organización por features

### 2. Explora el código existente
- Mira los componentes en `components/`
- Revisa los hooks en `hooks/`
- Mira el tema en `constants/theme.ts`

### 3. Crea tu primera feature
- Sigue el ejemplo en `src/features/README.md`
- Crea servicios en `src/api/services/`
- Conecta a rutas en `app/`

---

## 🤝 Contribuir

1. **Mantén la estructura**: Cada tipo de archivo en su carpeta
2. **Documenta**: Añade comentarios a código complejo
3. **Tipado**: Usa TypeScript para todo
4. **Componentes pequeños**: Una responsabilidad por componente
5. **Reutiliza**: Si algo se usa 2+ veces, ponlo en `/components`

---

## 📞 Ayuda

¿Tienes dudas sobre dónde va algo?

1. **Busca** en esta guía
2. **Lee** el README de la carpeta correspondiente
3. **Mira** ejemplos en el código existente

---

**¡Feliz desarrollo! 🚀**
