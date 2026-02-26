# Services

Lógica de negocio, servicios y utilidades complejas que no son llamadas directas a APIs.

## Estructura recomendada:

```
services/
├── README.md
├── storage.service.ts      # AsyncStorage, SecureStore
├── notification.service.ts # Notificaciones push
├── analytics.service.ts    # Analytics y tracking
├── permission.service.ts   # Permisos del dispositivo
└── validation.service.ts   # Validaciones complejas
```

## Ejemplos de uso:

### storage.service.ts
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  setItem: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },

  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },
};
```

### notification.service.ts
```typescript
import * as Notifications from 'expo-notifications';

export const notificationService = {
  configure: () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  },

  scheduleLocal: async (title: string, body: string, seconds: number) => {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: { seconds },
    });
  },
};
```

## Diferencia con /api:

- **api/**: Llamadas HTTP directas a APIs externas
- **services/**: Lógica de negocio, servicios nativos, procesamiento de datos

## Buenas prácticas:

- **Separar** responsabilidades claramente
- **Exportar** objetos con métodos relacionados
- **Manejar errores** de forma robusta
- **TypeScript**: Tipar todo correctamente
