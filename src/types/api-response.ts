/**
 * Tipos genéricos para respuestas del API
 */

/**
 * Respuesta exitosa estándar del backend
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * Respuesta de error del backend
 */
export interface ApiErrorResponse {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * Tipo de error manejado por los interceptores
 */
export interface ApiError {
  message: string;
  errors?: any[];
}
