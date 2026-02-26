# Assets

Recursos estáticos de la aplicación (imágenes, iconos, fuentes, etc.).

## 📁 Estructura Recomendada

```
assets/
├── README.md
├── images/              # Imágenes (ya existe)
│   ├── logo.png
│   ├── splash.png
│   ├── placeholder.png
│   ├── backgrounds/
│   │   ├── hero-bg.jpg
│   │   └── pattern.png
│   └── illustrations/
│       ├── empty-state.svg
│       └── success.svg
├── icons/               # Iconos personalizados
│   ├── custom-icon-1.png
│   └── app-icon.png
├── fonts/               # Fuentes personalizadas
│   ├── CustomFont-Regular.ttf
│   ├── CustomFont-Bold.ttf
│   └── CustomFont-Light.ttf
├── animations/          # Animaciones Lottie
│   ├── loading.json
│   └── success.json
└── data/                # Datos estáticos/mock
    ├── countries.json
    └── mock-invoices.json
```

## 🎯 Propósito

Almacena todos los **recursos estáticos** que usa la aplicación.

## 🖼️ Imágenes

### Organización
```
images/
├── logo/
│   ├── logo.png              # Logo principal
│   ├── logo@2x.png          # Retina
│   ├── logo@3x.png          # Super retina
│   └── logo-white.png       # Variante blanca
├── backgrounds/
├── illustrations/
├── products/
└── avatars/
```

### Uso en Componentes
```typescript
import { Image } from 'expo-image';

export function Logo() {
  return (
    <Image
      source={require('@/assets/images/logo.png')}
      style={{ width: 100, height: 100 }}
      contentFit="contain"
    />
  );
}
```

### Responsive Images
Expo automáticamente selecciona la imagen correcta según la densidad:
```
logo.png       → 1x (mdpi)
logo@2x.png    → 2x (xhdpi)
logo@3x.png    → 3x (xxhdpi)
```

## 🎨 Iconos

### Usando Expo Vector Icons
```typescript
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

<Ionicons name="home" size={24} color="black" />
<MaterialIcons name="settings" size={24} />
<FontAwesome name="user" size={24} />
```

### Iconos Personalizados
Si tienes iconos custom en PNG:
```typescript
import { Image } from 'expo-image';

<Image
  source={require('@/assets/icons/custom-icon.png')}
  style={{ width: 24, height: 24 }}
/>
```

### SVG Icons
Instala: `npm install react-native-svg`

```typescript
import Svg, { Path } from 'react-native-svg';

export function CustomIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor" />
    </Svg>
  );
}
```

## 🔤 Fuentes

### Cargar Fuentes Personalizadas

1. Coloca las fuentes en `assets/fonts/`

2. Carga en `app/_layout.tsx`:
```typescript
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'CustomFont-Regular': require('@/assets/fonts/CustomFont-Regular.ttf'),
    'CustomFont-Bold': require('@/assets/fonts/CustomFont-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // Tu layout
  );
}
```

3. Usa en estilos:
```typescript
const styles = StyleSheet.create({
  text: {
    fontFamily: 'CustomFont-Bold',
  },
});
```

## 🎬 Animaciones Lottie

### Instalación
```bash
npx expo install lottie-react-native
```

### Uso
```typescript
import LottieView from 'lottie-react-native';

export function LoadingAnimation() {
  return (
    <LottieView
      source={require('@/assets/animations/loading.json')}
      autoPlay
      loop
      style={{ width: 200, height: 200 }}
    />
  );
}
```

### Fuentes de Animaciones
- [LottieFiles](https://lottiefiles.com/) - Miles de animaciones gratis

## 📄 Datos Estáticos

### JSON Files
```typescript
// assets/data/countries.json
[
  { "code": "CO", "name": "Colombia" },
  { "code": "AR", "name": "Argentina" }
]
```

### Uso
```typescript
import countries from '@/assets/data/countries.json';

export function CountryPicker() {
  return (
    <Picker>
      {countries.map(country => (
        <Picker.Item key={country.code} label={country.name} value={country.code} />
      ))}
    </Picker>
  );
}
```

## 📱 App Icon & Splash Screen

### App Icon
- Ubicación en Expo: Definido en `app.json`
```json
{
  "expo": {
    "icon": "./assets/images/icon.png"
  }
}
```
- Tamaño recomendado: **1024x1024px** (PNG)

### Splash Screen
```json
{
  "expo": {
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```
- Tamaño recomendado: **1284x2778px** (PNG)

### Generar Icons
Usa [Expo Icon Generator](https://www.appicon.co/) o ejecuta:
```bash
npx expo install expo-splash-screen
```

## 🎨 Optimización de Imágenes

### Tamaños Recomendados
- **Thumbnails**: 100-200px
- **Medium**: 300-500px
- **Large**: 800-1200px
- **Backgrounds**: Equal to screen size or smaller

### Formatos
- **PNG**: Imágenes con transparencia, logos, iconos
- **JPG**: Fotos, backgrounds (mejor compresión)
- **WebP**: Mejor compresión (soportado en Expo con expo-image)
- **SVG**: Iconos escalables (requiere react-native-svg)

### Herramientas de Optimización
- **TinyPNG**: Comprimir PNG/JPG
- **ImageOptim**: Mac app para optimización
- **Squoosh**: Web app de Google

## 📦 Expo Image vs React Native Image

### Usar Expo Image (Recomendado)
```bash
npx expo install expo-image
```

```typescript
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  placeholder={require('@/assets/images/placeholder.png')}
  contentFit="cover"
  transition={200}
  style={{ width: 300, height: 200 }}
/>
```

### Ventajas
- ✅ Mejor performance
- ✅ Caché automático
- ✅ Placeholders
- ✅ Transiciones suaves
- ✅ Mejor soporte de formatos

## ✅ Buenas Prácticas

1. **Organizar por tipo**: Separar imágenes, iconos, fuentes
2. **Nombrar descriptivamente**: `user-avatar.png`, no `img1.png`
3. **Optimizar tamaños**: No uses imágenes más grandes de lo necesario
4. **Usar @2x/@3x**: Para soporte retina
5. **Comprimir**: Reducir peso de archivos
6. **SVG para iconos**: Escalables y ligeros
7. **Lazy loading**: Para imágenes grandes o muchas imágenes
8. **Caché**: Usa expo-image para caché automático

## 🔗 Helper para Assets

Crear un helper centralizado:

```typescript
// assets/index.ts
export const Images = {
  logo: require('./images/logo.png'),
  splash: require('./images/splash.png'),
  placeholder: require('./images/placeholder.png'),
  backgrounds: {
    hero: require('./images/backgrounds/hero-bg.jpg'),
  },
};

export const Animations = {
  loading: require('./animations/loading.json'),
  success: require('./animations/success.json'),
};
```

**Uso:**
```typescript
import { Images, Animations } from '@/assets';

<Image source={Images.logo} />
<LottieView source={Animations.loading} />
```

## 🌐 Remote Assets

Para assets remotos (CDN, API):
```typescript
<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  cachePolicy="memory-disk" // Caché
/>
```
