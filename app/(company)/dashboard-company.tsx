/**
 * Dashboard para usuarios con rol Company
 * Vista básica con información de la compañía
 */

import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { logoutCompany } from '@/src/api/services/auth.service';

export default function DashboardCompany() {
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await logoutCompany();
              router.replace('/login');
            } catch (error) {
              console.error('[DashboardCompany] Error logging out:', error);
              Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
            }
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="business-outline" size={64} color="#4B5563" style={styles.icon} />
        
        <ThemedText type="title" style={styles.title}>
          Dashboard Company
        </ThemedText>
        
        <ThemedText style={styles.subtitle}>
          ¡Bienvenido! Panel de control para empresas.
        </ThemedText>

        <View style={styles.infoBox}>
          <ThemedText style={styles.infoText}>
            Esta es tu área de empresa.
          </ThemedText>
          <ThemedText style={styles.infoText}>
            Próximamente agregaremos más funcionalidades.
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.7,
  },
  infoBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
