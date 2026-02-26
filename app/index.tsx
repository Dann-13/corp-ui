/**
 * Punto de entrada principal de la aplicación
 * Redirige automáticamente a la pantalla de login
 */

import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/login" />;
}
