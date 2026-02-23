/**
 * Glass Morphism Theme - iOS 26 Liquid Glass Style
 * Premium black, white, and metallic gold branding
 */

export const glassTheme = {
  // Primary Colors
  colors: {
    primary: '#D4AF37', // Metallic Gold
    primaryLight: '#FFD700', // Light Gold
    primaryDark: '#B8860B', // Dark Gold
    
    // Background
    background: '#0A0A0A', // Deep Black
    backgroundLight: '#1A1A1A', // Dark Gray
    backgroundLighter: '#2A2A2A', // Medium Gray
    
    // Text
    text: '#FFFFFF', // White
    textSecondary: '#CCCCCC', // Light Gray
    textMuted: '#999999', // Muted Gray
    
    // Glass Effects
    glassLight: 'rgba(255, 255, 255, 0.1)', // Light glass
    glassMedium: 'rgba(255, 255, 255, 0.15)', // Medium glass
    glassDark: 'rgba(255, 255, 255, 0.2)', // Dark glass
    
    // Gold Glass
    goldGlass: 'rgba(212, 175, 55, 0.15)', // Gold tinted glass
    goldGlassLight: 'rgba(255, 215, 0, 0.1)', // Light gold glass
    
    // Status Colors
    success: '#4ADE80', // Green
    warning: '#FBBF24', // Amber
    error: '#F87171', // Red
    info: '#60A5FA', // Blue
  },

  // Glass Morphism Effects
  glass: {
    light: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
    medium: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(30px)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    },
    dark: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(40px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },
    gold: {
      backgroundColor: 'rgba(212, 175, 55, 0.15)',
      backdropFilter: 'blur(25px)',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      boxShadow: '0 8px 32px rgba(212, 175, 55, 0.1)',
    },
  },

  // Typography
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
  },

  // Border Radius
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
    glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
    glassGold: '0 8px 32px rgba(212, 175, 55, 0.1)',
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },

  // Gradients
  gradients: {
    goldToGoldLight: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
    blackToGold: 'linear-gradient(135deg, #0A0A0A 0%, #D4AF37 100%)',
    glassGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    goldGlassGradient: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)',
  },
};

export type GlassTheme = typeof glassTheme;
