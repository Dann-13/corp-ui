/**
 * Dashboard principal - Pantalla después del login exitoso
 */

import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { logoutCompany } from '@/src/api/services/auth.service';

export default function Dashboard() {
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
              console.error('[Dashboard] Error logging out:', error);
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
        <ThemedText type="title" style={styles.title}>
          🎉 Dashboard
        </ThemedText>
        
        <ThemedText style={styles.subtitle}>
          ¡Bienvenido! Has iniciado sesión exitosamente.
        </ThemedText>

        <View style={styles.infoBox}>
          <ThemedText style={styles.infoText}>
            Esta es tu página principal después del login.
          </ThemedText>
          <ThemedText style={styles.infoText}>
            Aquí podrás agregar widgets, gráficas, y más funcionalidades.
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>🚪 Cerrar Sesión</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.8,
  },
  infoBox: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
