/**
 * Layout para rutas de empresa
 * Incluye protección de ruta - solo usuarios autenticados
 */

import { Stack, useRouter, usePathname } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CompanyLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const companyData = await AsyncStorage.getItem('company');
      
      if (!companyData) {
        // No hay sesión, redirigir a login
        router.replace('/login');
        return;
      }

      const company = JSON.parse(companyData);
      
      // Si es admin, redirigir a dashboard de admin
      if (company.roles && company.roles.includes('admin')) {
        console.log('[CompanyLayout] User is admin, redirecting...');
        router.replace('/dashboard-admin');
        return;
      }

      setIsChecking(false);
    } catch (error) {
      console.error('[CompanyLayout] Error checking auth:', error);
      router.replace('/login');
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [pathname, checkAuth]);

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F9FAFB' },
      }}
    >
      <Stack.Screen name="dashboard-company" />
    </Stack>
  );
}
