# 🔌 Conexión Backend - Frontend

Este documento explica cómo conectar la aplicación **corp-ui** (Expo/React Native) con el backend **corp** (NestJS).

## 📋 Requisitos Previos

1. **Backend corriendo** en `http://localhost:3000`
2. **Endpoint de registro** disponible en `/companies/register`
3. Expo CLI instalado globalmente

## ⚙️ Configuración

### 1. URL del Backend

La URL del backend se configura en `app.json`:

```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://localhost:3000"
    }
  }
}
```

**Para desarrollo en dispositivo físico:**
- Reemplaza `localhost` por la IP de tu computadora
- Ejemplo: `"apiUrl": "http://192.168.1.100:3000"`

**Para producción:**
- Usa la URL de tu servidor en producción
- Ejemplo: `"apiUrl": "https://api.tudominio.com"`

### 2. Estructura de la API

```
src/
├── api/
│   ├── config/
│   │   ├── api-client.ts       # Cliente HTTP configurado (axios)
│   │   └── endpoints.ts         # Constantes de endpoints
│   └── services/
│       └── auth.service.ts      # Servicios de autenticación
└── types/
    ├── api-response.ts          # Tipos genéricos de respuestas
    └── auth.types.ts            # Tipos de autenticación
```

## 🚀 Cómo Iniciar

### Opción 1: Iniciar todo en orden

```bash
# 1. Terminal 1: Iniciar el backend
cd corp
npm run start:dev

# 2. Terminal 2: Iniciar el frontend
cd corp-ui
npm start
```

### Opción 2: Usando el simulador

```bash
# iOS
npm run ios

# Android
npm run android
```

## 📱 Flujo de Registro

### Frontend → Backend

1. **Usuario completa el formulario** en `RegisterScreen`
   - NAME
   - EMAIL
   - ADDRESS
   - PASSWORD
   - RE-TYPE PASSWORD

2. **Validación local** en `useRegisterForm`
   - Validaciones de formato
   - Confirmación de contraseñas

3. **Petición HTTP** via `authService.registerCompany()`
   ```typescript
   POST /companies/register
   Body: {
     name: string,
     email: string,
     address: string,
     password: string
   }
   ```

4. **Respuesta del backend**
   ```typescript
   {
     success: true,
     data: {
       uuid: string,
       name: string,
       email: string,
       address: string,
       isActive: boolean,
       createdAt: string,
       updatedAt: string
     }
   }
   ```

5. **Redirección** al LoginScreen

## 🔍 Debugging

### Ver logs de peticiones HTTP

Los logs se imprimen automáticamente en la consola:

```
[API] POST /companies/register
[useRegisterForm] Enviando datos al backend...
[API] Response 201 from /companies/register
[useRegisterForm] Registro exitoso: { uuid: "...", name: "..." }
```

### Errores comunes

**Error: "No se pudo conectar al servidor"**
- ✅ Verifica que el backend esté corriendo
- ✅ Verifica la URL en `app.json`
- ✅ Si usas dispositivo físico, usa la IP local en lugar de localhost

**Error 409: "Email ya registrado"**
- El email ya existe en la base de datos
- Usa otro email o elimina el registro existente

**Error 400: "Datos inválidos"**
- Revisa que todos los campos cumplan las validaciones del backend

## 🛠️ Cómo Agregar Más Endpoints

### 1. Agregar el endpoint en `endpoints.ts`

```typescript
export const API_ENDPOINTS = {
  COMPANY: {
    LOGIN: '/companies/login',  // ← Agregar aquí
  },
};
```

### 2. Crear el servicio en `auth.service.ts`

```typescript
export async function loginCompany(
  credentials: CompanyLoginRequest
): Promise<CompanyLoginResponse> {
  const response = await apiClient.post(
    API_ENDPOINTS.COMPANY.LOGIN,
    credentials
  );
  return response.data.data;
}
```

### 3. Usar en el hook o componente

```typescript
import { loginCompany } from '@/src/api/services/auth.service';

const response = await loginCompany({ email, password });
```

## 📦 Dependencias Agregadas

```json
{
  "axios": "^1.7.9"
}
```

## 🔐 Autenticación (Próximos pasos)

Para implementar login y manejo de tokens:

1. **Guardar token al hacer login**
   ```typescript
   import AsyncStorage from '@react-native-async-storage/async-storage';
   await AsyncStorage.setItem('auth_token', token);
   ```

2. **Agregar token a las peticiones** (ya configurado en `api-client.ts`)
   ```typescript
   const token = await AsyncStorage.getItem('auth_token');
   config.headers.Authorization = `Bearer ${token}`;
   ```

3. **Crear AuthContext** para estado global
   ```typescript
   // src/context/AuthContext.tsx
   export const AuthContext = createContext();
   ```

## 📚 Recursos

- [Axios Documentation](https://axios-http.com/)
- [Expo Constants](https://docs.expo.dev/versions/latest/sdk/constants/)
- [React Native Networking](https://reactnative.dev/docs/network)

---

**¿Problemas?** Revisa la consola de Metro (frontend) y la consola de NestJS (backend) para más detalles.
