/**
 * Componente de tarjeta de estadística
 * Muestra un número grande con etiqueta descriptiva
 */

import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface StatCardProps {
  value: string | number;
  label: string;
  color?: string;
  style?: ViewStyle;
}

export function StatCard({ value, label, color = '#FF6B35', style }: StatCardProps) {
  return (
    <View style={[styles.card, style]}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    minWidth: 150,
  },
  value: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
