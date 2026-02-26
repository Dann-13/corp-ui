/**
 * Bot\u00f3n de login social (Facebook, Twitter, Apple, Google, etc.)
 */

import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SocialProvider = 'facebook' | 'twitter' | 'apple' | 'google';

interface SocialButtonProps {
  provider: SocialProvider;
  onPress: () => void;
  style?: ViewStyle;
}

const SOCIAL_CONFIG = {
  facebook: {
    icon: 'logo-facebook' as keyof typeof Ionicons.glyphMap,
    backgroundColor: '#1877F2',
  },
  twitter: {
    icon: 'logo-twitter' as keyof typeof Ionicons.glyphMap,
    backgroundColor: '#1DA1F2',
  },
  apple: {
    icon: 'logo-apple' as keyof typeof Ionicons.glyphMap,
    backgroundColor: '#000000',
  },
  google: {
    icon: 'logo-google' as keyof typeof Ionicons.glyphMap,
    backgroundColor: '#DB4437',
  },
};

export function SocialButton({ provider, onPress, style }: SocialButtonProps) {
  const config = SOCIAL_CONFIG[provider];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: config.backgroundColor },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name={config.icon} size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
