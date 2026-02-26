/**
 * Pantalla de Login con diseño moderno
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { SocialButton } from '@/components/ui/SocialButton';
import { useLoginForm } from '../hooks/useLoginForm';

export function LoginScreen() {
  const router = useRouter();
  const { values, errors, loading, handleChange, handleSubmit, handleSocialLogin } = useLoginForm();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header con gradiente y patrón */}
        <LinearGradient
          colors={['#1F2937', '#111827']}
          style={styles.header}
        >
          <View style={styles.headerPattern} />
          <View style={styles.headerContent}>
            <Text style={styles.title}>Log In</Text>
            <Text style={styles.subtitle}>Please sign in to your existing account</Text>
          </View>
        </LinearGradient>

        {/* Formulario */}
        <View style={styles.formContainer}>
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

          {/* Remember me y Forgot Password */}
          <View style={styles.optionsRow}>
            <Checkbox
              checked={values.rememberMe}
              onChange={(checked) => handleChange('rememberMe', checked)}
              label="Remember me"
            />
            <TouchableOpacity
              onPress={() => console.log('Forgot password')}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          {/* Botón de login */}
          <Button
            title="LOG IN"
            onPress={handleSubmit}
            loading={loading}
            fullWidth
            style={styles.loginButton}
          />

          {/* Sign up link */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}> Don&apos;t have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push('/register')}
              activeOpacity={0.7}
            >
              <Text style={styles.signupLink}>SIGN UP</Text>
            </TouchableOpacity>
          </View>

          {/* Separador "Or" */}
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>Or</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Botones sociales */}
          <View style={styles.socialButtons}>
            <SocialButton
              provider="facebook"
              onPress={() => handleSocialLogin('facebook')}
            />
            <SocialButton
              provider="twitter"
              onPress={() => handleSocialLogin('twitter')}
            />
            <SocialButton
              provider="apple"
              onPress={() => handleSocialLogin('apple')}
            />
          </View>
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
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
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
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: 24,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  signupText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signupLink: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '700',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  separatorText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 40,
  },
});
