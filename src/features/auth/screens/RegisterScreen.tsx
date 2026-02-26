/**
 * Pantalla de Registro con diseño moderno
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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header con gradiente y patrón */}
        <LinearGradient
          colors={['#1F2937', '#111827']}
          style={styles.header}
        >
          {/* Botón de volver */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.headerPattern} />
          <View style={styles.headerContent}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Please sign up to get started</Text>
          </View>
        </LinearGradient>

        {/* Formulario */}
        <View style={styles.formContainer}>
          <Input
            label="NAME"
            placeholder="John doe"
            value={values.name}
            onChangeText={(text) => handleChange('name', text)}
            error={errors.name}
            autoCapitalize="words"
          />

          <Input
            label="EMAIL"
            placeholder="example@gmail.com"
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="PASSWORD"
            placeholder="• • • • • • • • • •"
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
            error={errors.password}
            showPasswordToggle
          />

          <Input
            label="RE-TYPE PASSWORD"
            placeholder="• • • • • • • • • •"
            value={values.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            error={errors.confirmPassword}
            showPasswordToggle
          />

          {/* Botón de registro */}
          <Button
            title="SIGN UP"
            onPress={handleSubmit}
            loading={submitting}
            fullWidth
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerPattern: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 40,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    transform: [{ rotate: '45deg' }],
  },
  headerContent: {
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  submitButton: {
    marginTop: 8,
  },
});
