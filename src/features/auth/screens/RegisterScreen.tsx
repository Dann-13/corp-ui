/**
 * Pantalla de Registro
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRegisterForm } from '../hooks/useRegisterForm';

export function RegisterScreen() {
  const router = useRouter();
  const { values, errors, submitting, handleChange, handleSubmit } = useRegisterForm();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="dark" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>
            Completa los datos para comenzar
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          <Input
            label="Nombre completo"
            placeholder="Ej: Juan Pérez"
            value={values.name}
            onChangeText={(text) => handleChange('name', text)}
            error={errors.name}
            autoCapitalize="words"
            autoComplete="name"
          />

          <Input
            label="Email"
            placeholder="tu@email.com"
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Input
            label="Contraseña"
            placeholder="Mínimo 8 caracteres"
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
            error={errors.password}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password-new"
          />

          <Input
            label="Confirmar contraseña"
            placeholder="Repite tu contraseña"
            value={values.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            error={errors.confirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password-new"
          />

          <Button
            title="Registrarse"
            onPress={handleSubmit}
            loading={submitting}
            style={styles.submitButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.linkText}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>

        {/* Nota de desarrollo */}
        <View style={styles.devNote}>
          <Text style={styles.devNoteText}>
            💡 Nota: Esta es solo la UI. La conexión al backend se agregará después.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  form: {
    marginBottom: 24,
  },
  submitButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  linkText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  devNote: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  devNoteText: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 18,
  },
});
