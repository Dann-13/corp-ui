# 🎯 Ejemplo: Pantalla de Registro

Este es un ejemplo completo de cómo funciona la estructura del proyecto.

## 📁 Archivos Creados

### 1️⃣ **Tipos** (`/src/types/`)
```
src/types/auth.types.ts
```
Define las interfaces TypeScript para autenticación:
- `RegisterFormData` - Datos del formulario
- `User` - Modelo de usuario
- `AuthResponse` - Respuesta del backend

### 2️⃣ **Validaciones** (`/src/utils/`)
```
src/utils/validation.ts
```
Funciones para validar:
- Email válido
- Contraseña segura
- Formulario completo

### 3️⃣ **Hook Personalizado** (`/src/features/auth/hooks/`)
```
src/features/auth/hooks/useRegisterForm.ts
```
Hook que maneja:
- Estado del formulario
- Errores de validación
- Submit del formulario
- Loading state

### 4️⃣ **Componentes UI** (`/components/ui/`)
```
components/ui/Button.tsx
components/ui/Input.tsx
```
Componentes reutilizables:
- Button con variants y loading
- Input con label y errores

### 5️⃣ **Screen** (`/src/features/auth/screens/`)
```
src/features/auth/screens/RegisterScreen.tsx
```
La pantalla completa con:
- Todo el UI
- Lógica de presentación
- Navegación

### 6️⃣ **Ruta** (`/app/`)
```
app/register.tsx
```
Solo importa y exporta el screen.

---

## 🔄 Flujo de Datos

```
Usuario rellena formulario
         ↓
RegisterScreen (UI)
         ↓
useRegisterForm (Hook)
         ↓
validateRegisterForm (Utils)
         ↓
Por ahora: console.log
Futuro: API Service
```

---

## 🚀 Cómo Ejecutar

1. **Iniciar Expo:**
```bash
cd corp-ui
npm start
```

2. **Probar el Registro:**
   - Navega a la pantalla de inicio
   - Presiona "Ir a Registro →"
   - Rellena el formulario
   - Presiona "Registrarse"

3. **Validaciones Activas:**
   - Nombre: mínimo 2 caracteres
   - Email: formato válido
   - Contraseña: mínimo 8 caracteres, 1 mayúscula, 1 número
   - Confirmar: debe coincidir

---

## 📝 Ejemplo de Uso de Cada Carpeta

### `/src/types` - Tipos compartidos
```typescript
import type { RegisterFormData } from '@/src/types/auth.types';
```

### `/src/utils` - Funciones utilitarias
```typescript
import { validateRegisterForm } from '@/src/utils/validation';
```

### `/src/features/{feature}/hooks` - Hooks específicos
```typescript
import { useRegisterForm } from '@/src/features/auth/hooks/useRegisterForm';
```

### `/components/ui` - Componentes globales
```typescript
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
```

### `/src/features/{feature}/screens` - Pantallas
```typescript
import { RegisterScreen } from '@/src/features/auth/screens/RegisterScreen';
```

### `/app` - Rutas
```typescript
// app/register.tsx
export default RegisterScreen;
```

---

## 🔮 Próximos Pasos

### 1. Conectar al Backend

Crear servicio API:
```typescript
// src/api/services/auth.service.ts
export const authService = {
  register: async (data: RegisterFormData) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
};
```

Actualizar el hook:
```typescript
// src/features/auth/hooks/useRegisterForm.ts
import { authService } from '@/src/api/services/auth.service';

const handleSubmit = async () => {
  // ... validaciones
  
  const response = await authService.register(values);
  // Guardar token, navegar, etc.
};
```

### 2. Agregar Estado Global

```typescript
// src/store/useAuthStore.ts o src/context/AuthContext.tsx
const login = (user, token) => {
  // Guardar en estado global
};
```

### 3. Persistencia

```typescript
// src/services/storage.service.ts
await AsyncStorage.setItem('@auth:token', token);
```

---

## 🎨 Personalización

### Cambiar Colores
Edita: `constants/colors.ts`

### Añadir Validaciones
Edita: `src/utils/validation.ts`

### Modificar UI
Edita: `components/ui/Button.tsx` o `Input.tsx`

### Agregar Campos
1. Actualiza `RegisterFormData` en `src/types/auth.types.ts`
2. Actualiza `useRegisterForm` hook
3. Añade `<Input>` en `RegisterScreen`

---

## ✅ Ventajas de Esta Estructura

1. **Separación de responsabilidades**: Cada archivo tiene un propósito claro
2. **Reutilizable**: Button e Input se pueden usar en toda la app
3. **Testeable**: Validaciones y hooks fáciles de testear
4. **Escalable**: Fácil agregar más features
5. **Mantenible**: Código organizado y fácil de encontrar
6. **TypeScript**: Todo tipado correctamente

---

## 📚 Archivos Relacionados

- [GUIA-ESTRUCTURA.md](../GUIA-ESTRUCTURA.md) - Guía completa
- [src/features/README.md](../src/features/README.md) - Organización por features
- [components/README.md](../components/README.md) - Componentes globales
- [hooks/README.md](../hooks/README.md) - Custom hooks

---

**¡Ahora tienes un ejemplo funcional de cómo usar la estructura! 🎉**
