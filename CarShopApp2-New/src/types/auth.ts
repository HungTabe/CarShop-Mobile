// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Authentication Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Login Request
export interface LoginRequest {
  email: string;
  password: string;
}

// Signup Request
export interface SignupRequest {
  email: string;
  password: string;
  username: string;
  phone?: string;
  address?: string;
}

// Authentication Response
export interface AuthResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    username: string;
    phone?: string;
    address?: string;
    accessToken: string;
  };
  message: string;
}

// Signup Response
export interface SignupResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    username: string;
    phone?: string;
    address?: string;
  };
  message: string;
}

// Form Validation Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  phone: string;
  address: string;
}

// Validation Errors
export interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  phone?: string;
  address?: string;
} 