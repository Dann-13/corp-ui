# Hooks

Custom hooks reutilizables globales de React.

## 📁 Estructura Recomendada

```
hooks/
├── README.md
├── use-auth.ts              # Hook de autenticación
├── use-api.ts               # Hook para llamadas a API
├── use-debounce.ts          # Hook de debounce
├── use-async.ts             # Hook para operaciones async
├── use-color-scheme.ts      # Hook de tema (ya existe)
├── use-theme-color.ts       # Hook de colores de tema (ya existe)
└── use-form.ts              # Hook de formularios
```

## 🎯 Propósito

Contiene **custom hooks reutilizables** que encapsulan lógica compartida entre componentes.

## ⚖️ Hooks Globales vs Feature Hooks

### Usar `/hooks` cuando:
- ✅ El hook se usa en **múltiples features**
- ✅ Es **genérico** y no tiene lógica de negocio específica
- ✅ Encapsula comportamiento común de React/React Native

### Usar `/src/features/{feature}/hooks` cuando:
- ✅ El hook es **específico de una feature**
- ✅ Solo se usa en **una funcionalidad**
- ✅ Tiene lógica de negocio acoplada

**Ejemplo:**
- `useDebounce.ts` → `/hooks/` (genérico, se usa en toda la app)
- `useInvoices.ts` → `/src/features/invoices/hooks/` (específico de facturas)

## 📝 Ejemplos

### use-api.ts (Llamadas a API con estado)
```typescript
import { useState, useEffect } from 'react';

interface UseApiOptions<T> {
  initialData?: T;
  autoFetch?: boolean;
}

export function useApi<T>(
  apiFunction: () => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const { initialData, autoFetch = true } = options;
  
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);

  const execute = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      execute();
    }
  }, []);

  return { data, loading, error, refetch: execute };
}
```

**Uso:**
```typescript
function InvoicesScreen() {
  const { data, loading, error, refetch } = useApi(() => 
    invoiceService.getAll()
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return <InvoiceList invoices={data} onRefresh={refetch} />;
}
```

### use-debounce.ts (Debounce de valores)
```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

**Uso:**
```typescript
function SearchInput() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    // Solo se ejecuta 300ms después de que el usuario deja de escribir
    if (debouncedSearch) {
      searchProducts(debouncedSearch);
    }
  }, [debouncedSearch]);

  return <TextInput value={search} onChangeText={setSearch} />;
}
```

### use-async.ts (Manejo de estados async)
```typescript
import { useState, useCallback } from 'react';

interface AsyncState<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    loading: false,
    error: null,
    data: null,
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState({ loading: true, error: null, data: null });
    
    try {
      const data = await asyncFunction();
      setState({ loading: false, error: null, data });
      return data;
    } catch (error) {
      setState({ loading: false, error: error as Error, data: null });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, data: null });
  }, []);

  return { ...state, execute, reset };
}
```

**Uso:**
```typescript
function CreateInvoiceScreen() {
  const { loading, error, execute } = useAsync();

  const handleSubmit = async (data: InvoiceData) => {
    try {
      await execute(() => invoiceService.create(data));
      Alert.alert('Éxito', 'Factura creada');
    } catch {
      Alert.alert('Error', error?.message);
    }
  };

  return <InvoiceForm onSubmit={handleSubmit} loading={loading} />;
}
```

### use-form.ts (Manejo de formularios)
```typescript
import { useState } from 'react';

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Limpiar error al cambiar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    // Validar si existe función de validación
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
    reset,
  };
}
```

**Uso:**
```typescript
interface LoginFormData {
  email: string;
  password: string;
}

function LoginScreen() {
  const { values, errors, submitting, handleChange, handleSubmit } = useForm<LoginFormData>({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      await authService.login(values.email, values.password);
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.email) errors.email = 'Email requerido';
      if (!values.password) errors.password = 'Contraseña requerida';
      return errors;
    },
  });

  return (
    <View>
      <TextInput
        value={values.email}
        onChangeText={(text) => handleChange('email', text)}
        placeholder="Email"
      />
      {errors.email && <Text>{errors.email}</Text>}
      
      <TextInput
        value={values.password}
        onChangeText={(text) => handleChange('password', text)}
        placeholder="Contraseña"
        secureTextEntry
      />
      {errors.password && <Text>{errors.password}</Text>}
      
      <Button title="Login" onPress={handleSubmit} loading={submitting} />
    </View>
  );
}
```

### use-toggle.ts (Toggle booleano simple)
```typescript
import { useState, useCallback } from 'react';

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setTrue, setFalse, setValue };
}
```

**Uso:**
```typescript
function ModalExample() {
  const modal = useToggle(false);

  return (
    <>
      <Button title="Abrir Modal" onPress={modal.setTrue} />
      <Modal visible={modal.value} onClose={modal.setFalse}>
        {/* contenido */}
      </Modal>
    </>
  );
}
```

## ✅ Buenas Prácticas

1. **Prefijo 'use'**: Todos los hooks deben empezar con 'use'
2. **Hooks pequeños**: Una responsabilidad por hook
3. **TypeScript genéricos**: Usa generics para hooks reutilizables
4. **useCallback/useMemo**: Para funciones y valores memoizados
5. **Documentación**: Comenta parámetros y retornos
6. **Reglas de React**: Sigue las rules of hooks
7. **Clean up**: Limpia efectos secundarios en useEffect

## 📦 Exportar Hooks

```typescript
// hooks/index.ts
export { useApi } from './use-api';
export { useDebounce } from './use-debounce';
export { useAsync } from './use-async';
export { useForm } from './use-form';
export { useToggle } from './use-toggle';
```

**Uso:**
```typescript
import { useDebounce, useAsync } from '@/hooks';
```

## 🔗 Hooks Existentes

Ya tienes estos hooks creados:
- `use-color-scheme.ts` - Detecta el esquema de color (dark/light)
- `use-theme-color.ts` - Obtiene colores del tema actual

¡Úsalos como referencia para crear nuevos hooks!
