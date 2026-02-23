import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { glassTheme } from '../theme/glassTheme';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';

export const GlassLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      console.log('Login attempt:', { email, password });
    }, 1500);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: glassTheme.colors.background,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: parseInt(glassTheme.spacing.lg),
      paddingVertical: parseInt(glassTheme.spacing.xl),
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: parseInt(glassTheme.spacing['3xl']),
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: parseInt(glassTheme.spacing.lg),
      backgroundColor: glassTheme.glass.gold.backgroundColor,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: glassTheme.colors.primary,
    },
    logoText: {
      fontSize: 48,
      fontWeight: '700',
      color: glassTheme.colors.primary,
    },
    title: {
      fontSize: parseInt(glassTheme.typography.sizes['3xl']),
      fontWeight: '700',
      color: glassTheme.colors.text,
      marginBottom: parseInt(glassTheme.spacing.sm),
      textAlign: 'center',
    },
    subtitle: {
      fontSize: parseInt(glassTheme.typography.sizes.base),
      color: glassTheme.colors.textSecondary,
      textAlign: 'center',
    },
    formContainer: {
      marginBottom: parseInt(glassTheme.spacing['2xl']),
    },
    inputGroup: {
      marginBottom: parseInt(glassTheme.spacing.lg),
    },
    label: {
      fontSize: parseInt(glassTheme.typography.sizes.sm),
      color: glassTheme.colors.textSecondary,
      marginBottom: parseInt(glassTheme.spacing.sm),
      fontWeight: '500',
    },
    input: {
      backgroundColor: glassTheme.glass.light.backgroundColor,
      borderWidth: 1,
      borderColor: glassTheme.glass.light.border,
      borderRadius: parseInt(glassTheme.radius.lg),
      paddingVertical: parseInt(glassTheme.spacing.md),
      paddingHorizontal: parseInt(glassTheme.spacing.lg),
      color: glassTheme.colors.text,
      fontSize: parseInt(glassTheme.typography.sizes.base),
      fontWeight: '500',
    },
    forgotPassword: {
      alignItems: 'flex-end',
      marginBottom: parseInt(glassTheme.spacing.lg),
    },
    forgotPasswordText: {
      color: glassTheme.colors.primary,
      fontSize: parseInt(glassTheme.typography.sizes.sm),
      fontWeight: '600',
    },
    loginButton: {
      marginBottom: parseInt(glassTheme.spacing.lg),
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: parseInt(glassTheme.spacing.xl),
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: glassTheme.glass.light.border,
    },
    dividerText: {
      marginHorizontal: parseInt(glassTheme.spacing.md),
      color: glassTheme.colors.textSecondary,
      fontSize: parseInt(glassTheme.typography.sizes.sm),
    },
    socialButtons: {
      flexDirection: 'row',
      gap: parseInt(glassTheme.spacing.md),
      marginBottom: parseInt(glassTheme.spacing.xl),
    },
    socialButton: {
      flex: 1,
      paddingVertical: parseInt(glassTheme.spacing.md),
      backgroundColor: glassTheme.glass.light.backgroundColor,
      borderWidth: 1,
      borderColor: glassTheme.glass.light.border,
      borderRadius: parseInt(glassTheme.radius.lg),
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialButtonText: {
      color: glassTheme.colors.text,
      fontSize: parseInt(glassTheme.typography.sizes.lg),
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: parseInt(glassTheme.spacing.lg),
    },
    signupText: {
      color: glassTheme.colors.textSecondary,
      fontSize: parseInt(glassTheme.typography.sizes.sm),
    },
    signupLink: {
      color: glassTheme.colors.primary,
      fontWeight: '600',
      marginLeft: parseInt(glassTheme.spacing.sm),
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>FF</Text>
            </View>
            <Text style={styles.title}>FastFitHub AI</Text>
            <Text style={styles.subtitle}>Premium Fitness & Wellness</Text>
          </View>

          {/* Form Section */}
          <GlassCard variant="medium" padding={24}>
            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={glassTheme.colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={glassTheme.colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <GlassButton
                title="Sign In"
                variant="primary"
                size="lg"
                loading={loading}
                onPress={handleLogin}
                style={styles.loginButton}
              />

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login */}
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>🍎</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>🔵</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>🔴</Text>
                </TouchableOpacity>
              </View>

              {/* Sign Up Link */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </GlassCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GlassLogin;
