/**
 * Hook personalizado para el formulario de registro
 */

import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import type { RegisterFormData } from '@/src/types/auth.types';
import { validateRegisterForm } from '@/src/utils/validation';
import { registerCompany } from '@/src/api/services/auth.service';
import type { ApiError } from '@/src/types/api-response';

export function useRegisterForm() {
  const router = useRouter();
  
  const [values, setValues] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error al escribir
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    // Validar
    const validationErrors = validateRegisterForm(values);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    
    try {
      // Preparar datos para enviar al backend
      const payload = {
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
        address: values.address.trim(),
      };

      console.log('[useRegisterForm] Enviando datos al backend...', { ...payload, password: '***' });

      // Llamar al servicio de registro
      const response = await registerCompany(payload);

      console.log('[useRegisterForm] Registro exitoso:', response);

      // Mostrar mensaje de éxito
      Alert.alert(
        '✅ Registro Exitoso',
        `Bienvenido ${response.name}! Tu cuenta ha sido creada exitosamente.`,
        [
          {
            text: 'Ir a Login',
            onPress: () => {
              reset();
              router.replace('/login');
            },
          },
        ]
      );
    } catch (error: any) {
      console.error('[useRegisterForm] Error al registrar:', error);
      
      const apiError = error as ApiError;
      
      // Mostrar mensaje de error al usuario
      Alert.alert(
        '❌ Error al Registrar',
        apiError.message || 'Ocurrió un error inesperado. Por favor intenta de nuevo.',
        [{ text: 'Entendido' }]
      );

      // Si hay errores de validación por campo, mostrarlos
      if (apiError.errors && Array.isArray(apiError.errors)) {
        const fieldErrors: Record<string, string> = {};
        apiError.errors.forEach((err: any) => {
          if (err.field) {
            fieldErrors[err.field] = err.message;
          }
        });
        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setValues({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
    });
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
