import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { ProductsScreen } from './src/screens/ProductsScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import { Product } from './src/types';

export type RootStackParamList = {
  Products: undefined;
  ProductDetail: { product: Product };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Products"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
} 