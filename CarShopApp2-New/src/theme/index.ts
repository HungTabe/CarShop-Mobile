import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Custom color palette
const colors = {
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  secondary: {
    50: '#F3E5F5',
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0',
    600: '#8E24AA',
    700: '#7B1FA2',
    800: '#6A1B9A',
    900: '#4A148C',
  },
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

// Light Theme
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary[500],
    primaryContainer: colors.primary[100],
    secondary: colors.secondary[500],
    secondaryContainer: colors.secondary[100],
    tertiary: colors.grey[500],
    tertiaryContainer: colors.grey[100],
    surface: '#FFFFFF',
    surfaceVariant: colors.grey[50],
    background: '#FFFFFF',
    error: colors.error,
    errorContainer: '#FFEBEE',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: colors.grey[900],
    onSurfaceVariant: colors.grey[700],
    onBackground: colors.grey[900],
    outline: colors.grey[300],
    outlineVariant: colors.grey[200],
    shadow: colors.grey[900],
    scrim: colors.grey[900],
    inverseSurface: colors.grey[900],
    inverseOnSurface: '#FFFFFF',
    inversePrimary: colors.primary[100],
    elevation: {
      level0: 'transparent',
      level1: '#FFFFFF',
      level2: '#FFFFFF',
      level3: '#FFFFFF',
      level4: '#FFFFFF',
      level5: '#FFFFFF',
    },
  },
  roundness: 12,
};

// Dark Theme
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary[400],
    primaryContainer: colors.primary[900],
    secondary: colors.secondary[400],
    secondaryContainer: colors.secondary[900],
    tertiary: colors.grey[400],
    tertiaryContainer: colors.grey[800],
    surface: colors.grey[900],
    surfaceVariant: colors.grey[800],
    background: colors.grey[900],
    error: colors.error,
    errorContainer: '#3D1F1F',
    onPrimary: colors.grey[900],
    onSecondary: colors.grey[900],
    onSurface: '#FFFFFF',
    onSurfaceVariant: colors.grey[300],
    onBackground: '#FFFFFF',
    outline: colors.grey[600],
    outlineVariant: colors.grey[700],
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#FFFFFF',
    inverseOnSurface: colors.grey[900],
    inversePrimary: colors.primary[900],
    elevation: {
      level0: 'transparent',
      level1: colors.grey[800],
      level2: colors.grey[700],
      level3: colors.grey[600],
      level4: colors.grey[500],
      level5: colors.grey[400],
    },
  },
  roundness: 12,
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Typography
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  h6: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
};

export default {
  lightTheme,
  darkTheme,
  spacing,
  typography,
  colors,
}; 