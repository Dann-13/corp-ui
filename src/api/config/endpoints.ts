/**
 * Constantes de endpoints del API
 * Centraliza todas las rutas para facilitar mantenimiento
 */

export const API_ENDPOINTS = {
  // Auth & Companies
  COMPANY: {
    REGISTER: '/companies/register',
    LOGIN: '/companies/login', // Para futuro
  },

  // Otros módulos (ejemplo para futuras integraciones)
  // USER: {
  //   PROFILE: '/users/profile',
  //   UPDATE: '/users/update',
  // },
  // INVOICE: {
  //   LIST: '/invoices',
  //   CREATE: '/invoices/create',
  // },
} as const;

export default API_ENDPOINTS;
