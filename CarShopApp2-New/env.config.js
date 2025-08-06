// Environment Configuration
export const ENV_CONFIG = {
  // API Configuration
  API_BASE_URL: 'https://car-shop-backend-pxlk.vercel.app',
  API_LOCAL_URL: 'http://localhost:3000',
  
  // Environment
  NODE_ENV: 'development',
  
  // App Configuration
  APP_NAME: 'CarShop Mobile',
  APP_VERSION: '1.0.0',
  
  // Get current API URL based on environment
  getApiUrl: () => {
    return ENV_CONFIG.API_BASE_URL;
  }
  // // Demo
  // getApiUrl: () => {
  //   return ENV_CONFIG.NODE_ENV === 'production' 
  //     ? ENV_CONFIG.API_BASE_URL 
  //     : ENV_CONFIG.API_LOCAL_URL;
  // }
}; 