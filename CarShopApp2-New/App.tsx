import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { store } from './src/store';
import { lightTheme } from './src/theme';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { MainNavigator } from './src/navigation/MainNavigator';
import { AuthProvider } from './src/components/AuthProvider';
import { useAuth } from './src/hooks/useAuth';

// Root component that handles authentication state
const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      <Toast />
    </NavigationContainer>
  );
};

// Main App component with providers
export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={lightTheme}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </PaperProvider>
    </StoreProvider>
  );
} 