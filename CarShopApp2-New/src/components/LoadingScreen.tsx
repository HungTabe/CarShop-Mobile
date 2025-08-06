import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { spacing, typography } from '../theme';

export const LoadingScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={styles.spinner}
      />
      <Text style={[styles.text, { color: theme.colors.onSurfaceVariant }]}>
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  spinner: {
    marginBottom: spacing.lg,
  },
  text: {
    ...typography.body1,
  },
});

export default LoadingScreen; 