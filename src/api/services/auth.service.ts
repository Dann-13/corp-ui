/**
 * Servicio de autenticación
 * Maneja todas las operaciones relacionadas con auth/companies
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../config/api-client';
import { API_ENDPOINTS } from '../config/endpoints';
import type { ApiSuccessResponse } from '@/src/types/api-response';
import type {
  CompanyRegisterRequest,
  CompanyResponse,
  CompanyLoginRequest,
  CompanyLoginResponse,
} from '@/src/types/auth.types';

/**
 * Registra una nueva compañía
 * @param data Datos de registro de la compañía
 * @returns Información de la compañía registrada
 * @throws ApiError si la petición falla
 */
export async function registerCompany(
  data: CompanyRegisterRequest
): Promise<CompanyResponse> {
  try {
    const response = await apiClient.post<ApiSuccessResponse<CompanyResponse>>(
      API_ENDPOINTS.COMPANY.REGISTER,
      data
    );

    return response.data.data;
  } catch (error: any) {
    console.error('[AuthService] Error registering company:', error);
    throw error;
  }
}

/**
 * Login de compañía (para futuro)
 * @param credentials Email y password
 * @returns Información de la compañía y token
 */
export async function loginCompany(
  credentials: CompanyLoginRequest
): Promise<CompanyLoginResponse> {
  try {
    const response = await apiClient.post<ApiSuccessResponse<CompanyLoginResponse>>(
      API_ENDPOINTS.COMPANY.LOGIN,
      credentials
    );

    // TODO: Guardar token en AsyncStorage
    // await AsyncStorage.setItem('auth_token', response.data.data.token);

    return response.data.data;
  } catch (error: any) {
    console.error('[AuthService] Error logging in:', error);
    throw error;
  }
}

/**
 * Logout
 * Limpia tokens del almacenamiento local
 */
export async function logoutCompany(): Promise<void> {
  try {
    // Limpiar tokens de AsyncStorage
    await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'company', 'saved_email']);
    
    console.log('[AuthService] Logout successful');
  } catch (error: any) {
    console.error('[AuthService] Error logging out:', error);
    throw error;
  }
}

// Exportar como objeto para facilitar mocking en tests
export const authService = {
  registerCompany,
  loginCompany,
  logoutCompany,
};

export default authService;
