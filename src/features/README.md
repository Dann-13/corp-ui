# Features

Funcionalidades organizadas por módulos. Cada feature contiene todo lo relacionado con esa funcionalidad.

## Estructura recomendada:

```
features/
├── README.md
├── auth/
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── hooks/
│   │   └── useLogin.ts
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   └── types/
│       └── auth.types.ts
├── invoices/
│   ├── components/
│   │   ├── InvoiceCard.tsx
│   │   └── InvoiceList.tsx
│   ├── hooks/
│   │   ├── useInvoices.ts
│   │   └── useCreateInvoice.ts
│   ├── screens/
│   │   ├── InvoicesScreen.tsx
│   │   └── InvoiceDetailScreen.tsx
│   └── types/
│       └── invoice.types.ts
└── profile/
    ├── components/
    │   └── ProfileCard.tsx
    ├── screens/
    │   └── ProfileScreen.tsx
    └── types/
        └── profile.types.ts
```

## Organización por Feature:

Cada carpeta de feature debe contener:

- **components/**: Componentes específicos de esa feature
- **screens/**: Pantallas de la feature (conectadas a expo-router en /app)
- **hooks/**: Hooks personalizados de la feature
- **types/**: Tipos TypeScript específicos
- **utils/** (opcional): Utilidades específicas de la feature

## Ejemplo de Feature:

### invoices/types/invoice.types.ts
```typescript
export interface Invoice {
  id: string;
  number: string;
  date: Date;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  customer: {
    name: string;
    email: string;
  };
}
```

### invoices/hooks/useInvoices.ts
```typescript
import { useState, useEffect } from 'react';
import { invoiceService } from '@/src/api/services/invoice.service';
import { Invoice } from '../types/invoice.types';

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const data = await invoiceService.getAll();
      setInvoices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { invoices, loading, reload: loadInvoices };
}
```

### invoices/components/InvoiceCard.tsx
```typescript
import { View, Text, StyleSheet } from 'react-native';
import { Invoice } from '../types/invoice.types';

interface Props {
  invoice: Invoice;
}

export function InvoiceCard({ invoice }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.number}>#{invoice.number}</Text>
      <Text>${invoice.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: '#fff' },
  number: { fontWeight: 'bold' },
});
```

## Buenas prácticas:

- **Encapsular** toda la lógica relacionada en una sola carpeta
- **Reutilizar** componentes comunes en /components (raíz)
- **Exportar** desde un index.ts para facilitar imports
- **Nombrar** las carpetas en singular o plural según preferencia del equipo
