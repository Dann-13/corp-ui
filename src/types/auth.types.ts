/**
 * Tipos relacionados con autenticación
 */

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthError {
  field?: keyof RegisterFormData | keyof LoginFormData;
  message: string;
}
