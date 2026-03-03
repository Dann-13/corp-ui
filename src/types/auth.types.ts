/**
 * Tipos relacionados con autenticación
 * Basados en los DTOs del backend Corp API
 */

/**
 * Request para registro de compañía
 * Coincide con CompanyRegisterRequestDto del backend
 */
export interface CompanyRegisterRequest {
  name: string;
  email: string;
  password: string;
  address: string;
}

/**
 * Response de compañía registrada
 * Coincide con CompanyResponseDto del backend
 */
export interface CompanyResponse {
  uuid: string;
  name: string;
  email: string;
  address: string;
  isActive: boolean;
  roles: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Datos del formulario de registro (frontend)
 * Incluye confirmPassword para validación local y address para el backend
 */
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Request para login de compañía (para futuro)
 */
export interface CompanyLoginRequest {
  email: string;
  password: string;
}

/**
 * Response de login (para futuro)
 */
export interface CompanyLoginResponse {
  company: CompanyResponse;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
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
