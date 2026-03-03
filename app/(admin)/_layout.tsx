/**
 * Layout para rutas de administrador
 * Incluye protección de ruta - solo usuarios con rol 'admin'
 */

import { Stack, useRouter, usePathname } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  const checkAdminAuth = useCallback(async () => {
    try {
      const companyData = await AsyncStorage.getItem('company');
      
      if (!companyData) {
        // No hay sesión, redirigir a login
        router.replace('/login');
        return;
      }

      const company = JSON.parse(companyData);
      
      if (!company.roles || !company.roles.includes('admin')) {
        // No es admin, redirigir a dashboard de company
        console.log('[AdminLayout] User is not admin, redirecting...');
        router.replace('/dashboard-company');
        return;
      }

      setIsChecking(false);
    } catch (error) {
      console.error('[AdminLayout] Error checking auth:', error);
      router.replace('/login');
    }
  }, [router]);

  useEffect(() => {
    checkAdminAuth();
  }, [pathname, checkAdminAuth]);

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
        <ActivityIndicator size="large" color="#FF6B35" />
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
      <Stack.Screen name="dashboard-admin" />
    </Stack>
  );
}
