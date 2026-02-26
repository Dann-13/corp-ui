/**
 * Configuración del cliente HTTP para comunicación con el backend
 * Usa axios con interceptores para manejo de errores y tokens
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';

// URL base del backend - configurable por ambiente
const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

/**
 * Instancia principal de axios configurada
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de requests - agrega token de autenticación si existe
 */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // TODO: Agregar token de AsyncStorage cuando implementemos login
    // const token = await AsyncStorage.getItem('auth_token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

/**
 * Interceptor de responses - manejo centralizado de errores
 */
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API] Response ${response.status} from ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // El servidor respondió con un código de error
      const status = error.response.status;
      const data = error.response.data as any;

      console.error(`[API] Error ${status}:`, data);

      switch (status) {
        case 400:
          return Promise.reject({
            message: data.message || 'Datos inválidos',
            errors: data.errors || [],
          });
        case 401:
          // TODO: Limpiar sesión y redirigir a login
          return Promise.reject({
            message: 'No autorizado. Por favor inicia sesión nuevamente.',
          });
        case 409:
          return Promise.reject({
            message: data.message || 'El recurso ya existe',
          });
        case 500:
          return Promise.reject({
            message: 'Error del servidor. Por favor intenta más tarde.',
          });
        default:
          return Promise.reject({
            message: data.message || 'Ocurrió un error inesperado',
          });
      }
    } else if (error.request) {
      // No se recibió respuesta del servidor
      console.error('[API] No response from server:', error.request);
      return Promise.reject({
        message: 'No se pudo conectar al servidor. Verifica tu conexión.',
      });
    } else {
      // Error al configurar la petición
      console.error('[API] Error setting up request:', error.message);
      return Promise.reject({
        message: 'Error al preparar la solicitud',
      });
    }
  }
);

export default apiClient;
