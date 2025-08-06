import axios from 'axios';
import { ApiResponse, Product, ProductsResponse, FilterOptions } from '../types';
import { errorHandler } from '../utils/errorHandler';

const API_BASE_URL = 'https://car-shop-backend-pxlk.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health check
export const checkHealth = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    errorHandler.handleApiError(error, 'Health Check');
    throw new Error('Failed to check API health');
  }
};

// Get products with filters
export const getProducts = async (filters: FilterOptions = {}): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.model) params.append('model', filters.model);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());

    const response = await api.get(`/products?${params.toString()}`);
    
    // Handle the new API response format
    if (response.data.success && response.data.data && response.data.data.products) {
      return response.data.data.products;
    } else {
      throw new Error('Invalid API response format');
    }
  } catch (error) {
    errorHandler.handleApiError(error, 'Get Products');
    throw new Error('Failed to fetch products');
  }
};

// Get product by ID
export const getProductById = async (productId: string): Promise<ApiResponse<Product>> => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    errorHandler.handleApiError(error, 'Get Product Details');
    throw new Error('Failed to fetch product details');
  }
};