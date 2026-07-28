/**
 * Premium Login & Registration Screen with Glassmorphic Card Container
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Gamepad2, Mail, Lock, User, Sparkles } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/theme';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const setGuestMode = useAuthStore((state) => state.setGuestMode);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleAuth = () => {
    setGuestMode(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Brand Logo Header */}
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <Gamepad2 size={42} color={colors.accent.glow} />
          </View>
          <Text style={styles.brandTitle}>GameVault</Text>
          <Text style={styles.brandSubtitle}>
            {isRegister ? 'Create your gamer account' : 'Log in to track your backlog & reviews'}
          </Text>
        </View>

        {/* Input Fields Glass Card */}
        <Card variant="glow" style={styles.formCard}>
          {isRegister && (
            <Input
              label="Username"
              placeholder="e.g. shadow_slayer"
              value={username}
              onChangeText={setUsername}
              leftIcon={<User size={18} color={colors.accent.glow} />}
            />
          )}
          <Input
            label="Email Address"
            placeholder="gamer@domain.com"
            value={email}
            onChangeText={setEmail}
            leftIcon={<Mail size={18} color={colors.accent.glow} />}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            leftIcon={<Lock size={18} color={colors.accent.glow} />}
          />

          <Button
            title={isRegister ? 'Register Account' : 'Sign In'}
            onPress={handleAuth}
            style={styles.submitBtn}
          />
          <Button
            title="Explore as Guest"
            variant="glass"
            onPress={() => {
              setGuestMode(true);
              navigation.goBack();
            }}
            icon={<Sparkles size={16} color={colors.accent.glow} />}
          />
        </Card>

        {/* Toggle Mode Footer */}
        <TouchableOpacity
          onPress={() => setIsRegister(!isRegister)}
          style={styles.toggleFooter}
          activeOpacity={0.7}
        >
          <Text style={styles.toggleText}>
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create One"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.background.tertiary,
    borderWidth: 2,
    borderColor: colors.accent.glow,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    ...shadows.redGlow,
  },
  brandTitle: {
    ...typography.h1,
    fontSize: 30,
    fontWeight: '800',
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
  },
  formCard: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  submitBtn: {
    marginTop: spacing.sm,
  },
  toggleFooter: {
    alignItems: 'center',
  },
  toggleText: {
    ...typography.bodyMedium,
    color: colors.accent.glow,
    fontWeight: '700',
  },
});
