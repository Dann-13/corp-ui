import { useState } from 'react';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

export function useLoginForm() {
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
      // TODO: Conectar con el backend
      // await authService.login(values.email, values.password);
      
      // Simulación de login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Login successful:', values);
      
      // Aquí redirigirías al usuario
      // router.replace('/(tabs)');
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ email: 'Invalid credentials' });
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
