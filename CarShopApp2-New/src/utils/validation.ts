import { LoginFormData, SignupFormData, ValidationErrors } from '../types/auth';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation regex (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// Phone validation regex
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

export class ValidationUtils {
  // Validate email
  static validateEmail(email: string): string | null {
    if (!email) {
      return 'Email is required';
    }
    if (!EMAIL_REGEX.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  }

  // Validate password
  static validatePassword(password: string): string | null {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!PASSWORD_REGEX.test(password)) {
      return 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number';
    }
    return null;
  }

  // Validate confirm password
  static validateConfirmPassword(password: string, confirmPassword: string): string | null {
    if (!confirmPassword) {
      return 'Please confirm your password';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  }

  // Validate username
  static validateUsername(username: string): string | null {
    if (!username) {
      return 'Username is required';
    }
    if (username.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    if (username.length > 20) {
      return 'Username must be less than 20 characters';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return null;
  }

  // Validate phone number
  static validatePhone(phone: string): string | null {
    if (!phone) {
      return null; // Phone is optional
    }
    if (!PHONE_REGEX.test(phone)) {
      return 'Please enter a valid phone number';
    }
    return null;
  }

  // Validate address
  static validateAddress(address: string): string | null {
    if (!address) {
      return null; // Address is optional
    }
    if (address.length < 10) {
      return 'Address must be at least 10 characters long';
    }
    return null;
  }

  // Validate login form
  static validateLoginForm(data: LoginFormData): ValidationErrors {
    const errors: ValidationErrors = {};

    const emailError = this.validateEmail(data.email);
    if (emailError) errors.email = emailError;

    const passwordError = this.validatePassword(data.password);
    if (passwordError) errors.password = passwordError;

    return errors;
  }

  // Validate signup form
  static validateSignupForm(data: SignupFormData): ValidationErrors {
    const errors: ValidationErrors = {};

    const emailError = this.validateEmail(data.email);
    if (emailError) errors.email = emailError;

    const passwordError = this.validatePassword(data.password);
    if (passwordError) errors.password = passwordError;

    const confirmPasswordError = this.validateConfirmPassword(data.password, data.confirmPassword);
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    const usernameError = this.validateUsername(data.username);
    if (usernameError) errors.username = usernameError;

    const phoneError = this.validatePhone(data.phone);
    if (phoneError) errors.phone = phoneError;

    const addressError = this.validateAddress(data.address);
    if (addressError) errors.address = addressError;

    return errors;
  }

  // Check if form has errors
  static hasErrors(errors: ValidationErrors): boolean {
    return Object.keys(errors).length > 0;
  }

  // Get first error message
  static getFirstError(errors: ValidationErrors): string | null {
    const errorKeys = Object.keys(errors);
    return errorKeys.length > 0 ? errors[errorKeys[0] as keyof ValidationErrors] || null : null;
  }

  // Sanitize form data
  static sanitizeFormData<T extends Record<string, any>>(data: T): T {
    const sanitized = { ...data };
  
    (Object.keys(sanitized) as (keyof T)[]).forEach(key => {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = (sanitized[key] as string).trim() as T[typeof key];
      }
    });
  
    return sanitized;
  }
}

export default ValidationUtils; 