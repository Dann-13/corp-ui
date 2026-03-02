import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LoginFormData } from '@/src/types/auth.types';
import { loginCompany } from '@/src/api/services/auth.service';
import type { ApiError } from '@/src/types/api-response';

interface ValidationErrors {
  email?: string;
  password?: string;
}

export function useLoginForm() {
  const router = useRouter();

  const [values, setValues] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof LoginFormData, value: string | boolean) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo al cambiar
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      console.log('[useLoginForm] Attempting login...');

      // Llamar al servicio de login
      const response = await loginCompany({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });

      console.log('[useLoginForm] Login successful:', response.company);

      // Guardar tokens en AsyncStorage
      await AsyncStorage.setItem('access_token', response.accessToken);
      await AsyncStorage.setItem('refresh_token', response.refreshToken);
      await AsyncStorage.setItem('company', JSON.stringify(response.company));

      // Si "Remember me" está activado, guardar email
      if (values.rememberMe) {
        await AsyncStorage.setItem('saved_email', values.email);
      } else {
        await AsyncStorage.removeItem('saved_email');
      }

      // Mostrar mensaje de éxito
      Alert.alert(
        '✅ ¡Bienvenido!',
        `Hola ${response.company.name}! Has iniciado sesión exitosamente.`,
        [
          {
            text: 'Continuar',
            onPress: () => {
              router.replace('/dashboard');
            },
          },
        ]
      );
    } catch (error: any) {
      console.error('[useLoginForm] Login error:', error);

      const apiError = error as ApiError;

      // Mostrar mensaje de error
      Alert.alert(
        '❌ Error de Autenticación',
        apiError.message || 'Email o contraseña incorrectos. Por favor intenta de nuevo.',
        [{ text: 'Entendido' }]
      );

      // Mostrar error en el campo de email
      setErrors({
        email: apiError.message || 'Credenciales inválidas',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // TODO: Implementar login social
  };

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleSocialLogin,
  };
}
