# Utils

Funciones utilitarias y helpers reutilizables en toda la aplicación.

## Estructura recomendada:

```
utils/
├── README.md
├── index.ts              # Re-exports
├── format.ts             # Formateo de datos
├── validation.ts         # Validaciones
├── date.ts               # Utilidades de fechas
├── string.ts             # Utilidades de strings
└── array.ts              # Utilidades de arrays
```

## Ejemplos de uso:

### format.ts
```typescript
/**
 * Formatea un número como moneda
 */
export function formatCurrency(amount: number, currency: string = 'COP'): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Formatea un número de teléfono
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

/**
 * Trunca un texto y agrega "..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
```

### validation.ts
```typescript
/**
 * Valida un email
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida una contraseña (mínimo 8 caracteres, 1 mayúscula, 1 número)
 */
export function isValidPassword(password: string): boolean {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

/**
 * Valida un NIT colombiano
 */
export function isValidNIT(nit: string): boolean {
  const cleaned = nit.replace(/\D/g, '');
  return cleaned.length >= 9 && cleaned.length <= 10;
}
```

### date.ts
```typescript
/**
 * Formatea una fecha
 */
export function formatDate(date: Date | string, format: string = 'DD/MM/YYYY'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', String(year));
}

/**
 * Retorna tiempo relativo (hace 2 horas, hace 3 días)
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((new Date().getTime() - d.getTime()) / 1000);
  
  const intervals = {
    año: 31536000,
    mes: 2592000,
    día: 86400,
    hora: 3600,
    minuto: 60,
  };
  
  for (const [name, secondsInInterval] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInInterval);
    if (interval >= 1) {
      return `hace ${interval} ${name}${interval > 1 ? 's' : ''}`;
    }
  }
  
  return 'hace un momento';
}
```

### string.ts
```typescript
/**
 * Capitaliza la primera letra
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Convierte a title case
 */
export function toTitleCase(text: string): string {
  return text
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Genera iniciales de un nombre
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}
```

### array.ts
```typescript
/**
 * Agrupa elementos por una propiedad
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Elimina duplicados de un array
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Mezcla un array aleatoriamente
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
```

### index.ts (re-exports)
```typescript
export * from './format';
export * from './validation';
export * from './date';
export * from './string';
export * from './array';
```

## Buenas prácticas:

- **Funciones puras**: Sin efectos secundarios
- **Documentar**: Usar JSDoc para describir función y parámetros
- **Testeables**: Fáciles de testear unitariamente
- **Reutilizables**: Genéricas, no acopladas a casos específicos
- **Nombrar claramente**: Nombres descriptivos y verbosos
