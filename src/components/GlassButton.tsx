import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { glassTheme } from '../theme/glassTheme';

interface GlassButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  onPress,
  style,
  ...props
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: parseInt(glassTheme.radius.lg),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      opacity: disabled ? 0.5 : 1,
    };

    const sizeStyles = {
      sm: { paddingVertical: 8, paddingHorizontal: 12 },
      md: { paddingVertical: 12, paddingHorizontal: 20 },
      lg: { paddingVertical: 16, paddingHorizontal: 24 },
    };

    const variantStyles = {
      primary: {
        backgroundColor: glassTheme.colors.primary,
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: glassTheme.glass.gold.backgroundColor,
        borderWidth: 1,
        borderColor: glassTheme.colors.primary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: glassTheme.colors.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = (): TextStyle => {
    const textColor = variant === 'outline' || variant === 'ghost' 
      ? glassTheme.colors.primary 
      : glassTheme.colors.background;

    return {
      color: textColor,
      fontSize: parseInt(glassTheme.typography.sizes.base),
      fontWeight: '600',
      marginLeft: icon ? 8 : 0,
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {icon}
      <Text style={getTextStyle()}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default GlassButton;
