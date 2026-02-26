# 🎨 Sistema de Diseño - Corp UI

Sistema de componentes UI reutilizables con diseño moderno y consistente.

## 📦 Componentes Creados

### 1. **Input** - Campo de texto moderno
📁 `components/ui/Input.tsx`

#### Características:
- ✅ Diseño con fondo gris claro
- ✅ Focus state con borde naranja
- ✅ Estados de error en rojo
- ✅ Soporte para iconos
- ✅ Toggle de visibilidad para contraseñas
- ✅ Labels en mayúsculas
- ✅ Altura fija de 56px

#### Uso:
```typescript
<Input
  label="EMAIL"
  placeholder="example@gmail.com"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
  keyboardType="email-address"
/>

<Input
  label="PASSWORD"
  placeholder="• • • • • • • • • •"
  value={password}
  onChangeText={setPassword}
  showPasswordToggle  // ← Muestra ícono de ojo
/>

<Input
  placeholder="Buscar..."
  icon="search-outline"  // ← Ícono a la izquierda
/>
```

---

### 2. **Button** - Botón con gradiente
📁 `components/ui/Button.tsx`

#### Variantes:
- **primary**: Gradiente naranja (por defecto)
- **secondary**: Morado sólido
- **outline**: Borde naranja, fondo transparente
- **text**: Solo texto naranja

#### Características:
- ✅ Gradient animado en primary
- ✅ Estado de loading con ActivityIndicator
- ✅ Estado disabled con opacidad
- ✅ Texto en mayúsculas
- ✅ Altura de 56px
- ✅ Border radius de 12px

#### Uso:
```typescript
<Button
  title="LOG IN"
  onPress={handleLogin}
  loading={isLoading}
  fullWidth  // ← Ocupa todo el ancho
/>

<Button
  title="Cancelar"
  onPress={handleCancel}
  variant="outline"
/>

<Button
  title="Ver más"
  onPress={handleMore}
  variant="text"
/>
```

---

### 3. **Checkbox** - Checkbox personalizado
📁 `components/ui/Checkbox.tsx`

#### Características:
- ✅ Diseño cuadrado con bordes redondeados
- ✅ Color naranja cuando está activo
- ✅ Checkmark animado
- ✅ Label opcional

#### Uso:
```typescript
<Checkbox
  checked={rememberMe}
  onChange={setRememberMe}
  label="Remember me"
/>
```

---

### 4. **SocialButton** - Botones de login social
📁 `components/ui/SocialButton.tsx`

#### Providers soportados:
- **facebook**: Azul (#1877F2)
- **twitter**: Celeste (#1DA1F2)
- **apple**: Negro (#000000)
- **google**: Rojo (#DB4437)

#### Características:
- ✅ Botones circulares (56x56px)
- ✅ Íconos de Ionicons
- ✅ Sombras sutiles
- ✅ Colores oficiales de cada red

#### Uso:
```typescript
<View style={{ flexDirection: 'row', gap: 16 }}>
  <SocialButton
    provider="facebook"
    onPress={() => loginWithFacebook()}
  />
  <SocialButton
    provider="twitter"
    onPress={() => loginWithTwitter()}
  />
  <SocialButton
    provider="apple"
    onPress={() => loginWithApple()}
  />
</View>
```

---

## 🎨 Paleta de Colores

```typescript
const colors = {
  // Primary
  primary: '#FF6B35',        // Naranja principal
  primaryGradient: ['#FF6B35', '#FF8C42'],
  
  // Text
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  
  // Background
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F3F4F6',
  
  // States
  focus: '#FF6B35',
  error: '#EF4444',
  disabled: '#E5E7EB',
  
  // Dark
  dark: '#1F2937',
  darkSecondary: '#111827',
};
```

---

## 📐 Espaciados

```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
};
```

---

## 🔤 Tipografía

```typescript
const typography = {
  // Labels
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Inputs & Buttons
  input: {
    fontSize: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '700',
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
  },
};
```

---

## 📱 Ejemplo Completo: LoginScreen

```typescript
import { Input, Button, Checkbox, SocialButton } from '@/components/ui';

export function LoginScreen() {
  return (
    <View>
      {/* Inputs */}
      <Input
        label="EMAIL"
        placeholder="example@gmail.com"
        value={email}
        onChangeText={setEmail}
      />
      
      <Input
        label="PASSWORD"
        placeholder="• • • • • • • • • •"
        value={password}
        onChangeText={setPassword}
        showPasswordToggle
      />
      
      {/* Checkbox y link */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Checkbox
          checked={rememberMe}
          onChange={setRememberMe}
          label="Remember me"
        />
        <TouchableOpacity>
          <Text style={{ color: '#FF6B35' }}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      
      {/* Botón principal */}
      <Button
        title="LOG IN"
        onPress={handleLogin}
        loading={isLoading}
        fullWidth
      />
      
      {/* Separador */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#E5E7EB' }} />
        <Text style={{ marginHorizontal: 16, color: '#9CA3AF' }}>Or</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#E5E7EB' }} />
      </View>
      
      {/* Botones sociales */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
        <SocialButton provider="facebook" onPress={loginFacebook} />
        <SocialButton provider="twitter" onPress={loginTwitter} />
        <SocialButton provider="apple" onPress={loginApple} />
      </View>
    </View>
  );
}
```

---

## 🚀 Instalación de Dependencias

```bash
cd corp-ui
npx expo install expo-linear-gradient
```

---

## 📁 Estructura de Archivos

```
components/ui/
├── Button.tsx         # Botón con gradiente
├── Input.tsx          # Input con iconos y password toggle
├── Checkbox.tsx       # Checkbox personalizado
├── SocialButton.tsx   # Botones sociales
└── index.ts           # Exports centralizados
```

---

## 🎯 Importación

```typescript
// Individual
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Centralizado (recomendado)
import { Button, Input, Checkbox, SocialButton } from '@/components/ui';
```

---

## ✨ Características Generales

### Todos los componentes incluyen:
- ✅ TypeScript tipado
- ✅ Props extendibles
- ✅ Estilos consistentes
- ✅ Estados hover/focus/disabled
- ✅ Accesibilidad básica
- ✅ Documentación inline

### Diseño responsive:
- ✅ Funciona en iOS y Android
- ✅ Adapta según densidad de pantalla
- ✅ Safe areas respetadas

---

## 🎨 Personalización

### Colores Globales
Edita [`constants/colors.ts`](constants/colors.ts "constants/colors.ts") para cambiar la paleta:

```typescript
export const Colors = {
  primary: '#FF6B35',  // ← Cambia aquí
  // ...
};
```

### Componentes Individuales
Sobrescribe estilos con la prop `style`:

```typescript
<Button
  title="Custom"
  onPress={doSomething}
  style={{ 
    backgroundColor: '#FF0000',
    borderRadius: 20 
  }}
/>
```

---

## 📚 Próximos Componentes

- [ ] **Select** - Selector dropdown
- [ ] **Switch** - Toggle switch
- [ ] **Radio** - Radio buttons
- [ ] **Badge** - Insignias numéricas
- [ ] **Avatar** - Fotos de perfil
- [ ] **Card** - Tarjetas de contenido
- [ ] **Modal** - Diálogos modales
- [ ] **Toast** - Notificaciones

---

## 💡 Tips

1. **Reutiliza siempre** estos componentes en lugar de crear nuevos
2. **Mantén la consistencia** en colores y espaciados
3. **Extiende con props** antes de modificar los archivos base
4. **Documenta** nuevos componentes que añadas

---

**¡Disfruta construyendo tu app! 🚀**
