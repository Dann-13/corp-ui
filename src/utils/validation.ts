/**
 * Funciones de validación
 */

import type { RegisterFormData } from '@/src/types/auth.types';

/**
 * Valida un email
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida una contraseña
 * Mínimo 8 caracteres, al menos 1 mayúscula y 1 número
 */
export function isValidPassword(password: string): boolean {
  if (password.length < 8) return false;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasUpperCase && hasNumber;
}

/**
 * Mensajes de error de validación
 */
export const ValidationMessages = {
  required: 'Este campo es requerido',
  email: 'Ingresa un email válido',
  password: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número',
  passwordMismatch: 'Las contraseñas no coinciden',
  minLength: (min: number) => `Mínimo ${min} caracteres`,
  maxLength: (max: number) => `Máximo ${max} caracteres`,
};

/**
 * Valida el formulario de registro
 */
export function validateRegisterForm(data: RegisterFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  // Validar nombre
  if (!data.name.trim()) {
    errors.name = ValidationMessages.required;
  } else if (data.name.trim().length < 2) {
    errors.name = ValidationMessages.minLength(2);
  }

  // Validar email
  if (!data.email.trim()) {
    errors.email = ValidationMessages.required;
  } else if (!isValidEmail(data.email)) {
    errors.email = ValidationMessages.email;
  }

  // Validar dirección (address)
  if (!data.address || !data.address.trim()) {
    errors.address = ValidationMessages.required;
  } else if (data.address.trim().length < 10) {
    errors.address = ValidationMessages.minLength(10);
  }

  // Validar contraseña
  if (!data.password) {
    errors.password = ValidationMessages.required;
  } else if (!isValidPassword(data.password)) {
    errors.password = ValidationMessages.password;
  }

  // Validar confirmación de contraseña
  if (!data.confirmPassword) {
    errors.confirmPassword = ValidationMessages.required;
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = ValidationMessages.passwordMismatch;
  }

  return errors;
}
