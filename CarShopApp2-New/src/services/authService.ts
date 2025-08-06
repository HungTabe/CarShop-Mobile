import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV_CONFIG } from '../../env.config';
import { 
  LoginRequest, 
  SignupRequest, 
  AuthResponse, 
  SignupResponse,
  User 
} from '../types/auth';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: ENV_CONFIG.getApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear stored token on unauthorized
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');
    }
    return Promise.reject(error);
  }
);

// Storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
};

export class AuthService {
  // Store authentication data
  static async storeAuthData(token: string, user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw error;
    }
  }

  // Get stored authentication data
  static async getStoredAuthData(): Promise<{ token: string | null; user: User | null }> {
    try {
      const [token, userData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
      ]);

      const user = userData ? JSON.parse(userData) : null;
      return { token, user };
    } catch (error) {
      console.error('Error getting stored auth data:', error);
      return { token: null, user: null };
    }
  }

  // Clear stored authentication data
  static async clearAuthData(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw error;
    }
  }

  // User registration
  static async signup(data: SignupRequest): Promise<SignupResponse> {
    try {
      const response = await api.post('/api/auth/signup', data);
      return response.data;
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.response?.data?.error || 'Signup failed');
    }
  }

  // User login
  static async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post('/api/auth/login', data);
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  }

  // Logout
  static async logout(): Promise<void> {
    try {
      await this.clearAuthData();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Refresh token (if needed in future)
  static async refreshToken(): Promise<string | null> {
    try {
      const response = await api.post('/api/auth/refresh');
      const { accessToken } = response.data.data;
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
      return accessToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  }
}

export default AuthService; 