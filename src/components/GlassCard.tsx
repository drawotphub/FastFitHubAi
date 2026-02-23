import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { glassTheme } from '../theme/glassTheme';

interface GlassCardProps extends ViewProps {
  variant?: 'light' | 'medium' | 'dark' | 'gold';
  children: React.ReactNode;
  padding?: number;
  margin?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'light',
  children,
  padding = 16,
  margin = 8,
  style,
  ...props
}) => {
  const glassStyle = glassTheme.glass[variant];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: glassStyle.backgroundColor,
      borderRadius: parseInt(glassTheme.radius.lg),
      borderWidth: 1,
      borderColor: glassStyle.border,
      padding,
      margin,
      overflow: 'hidden',
      // Glass morphism effect (web only)
      ...(glassStyle.backdropFilter && {
        backdropFilter: glassStyle.backdropFilter,
      }),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 32,
      elevation: 5,
    },
  });

  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

export default GlassCard;
