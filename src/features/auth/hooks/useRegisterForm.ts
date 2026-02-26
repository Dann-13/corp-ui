/**
 * Hook personalizado para el formulario de registro
 */

import { useState } from 'react';
import type { RegisterFormData } from '@/src/types/auth.types';
import { validateRegisterForm } from '@/src/utils/validation';

export function useRegisterForm() {
  const [values, setValues] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      // TODO: Aquí irá la llamada al backend
      console.log('Datos a enviar:', values);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Por ahora solo mostramos los datos en consola
      alert(`✅ Registro exitoso!\n\nNombre: ${values.name}\nEmail: ${values.email}`);
      
      // Resetear formulario
      reset();
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('❌ Error al registrar. Intenta de nuevo.');
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
