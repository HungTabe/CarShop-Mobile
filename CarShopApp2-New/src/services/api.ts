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

// Mock data for development (when API is not available)
export const getMockProducts = (): Product[] => {
  return [
    {
      id: '1',
      name: 'BMW X5 2024',
      description: 'Luxury SUV with premium features and advanced technology',
      price: 85000,
      brand: 'BMW',
      model: 'X5',
      year: 2024,
      mileage: 5000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      engineSize: '3.0L',
      color: 'Alpine White',
      imageUrls: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
      ],
      inStock: true,
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: '2',
      name: 'Mercedes-Benz C-Class',
      description: 'Elegant sedan with sophisticated design and comfort',
      price: 65000,
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2024,
      mileage: 3000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      engineSize: '2.0L',
      color: 'Obsidian Black',
      imageUrls: [
        'https://images.unsplash.com/photo-1618843479618-39b0c7b2b8c8?w=800',
        'https://images.unsplash.com/photo-1618843479618-39b0c7b2b8c8?w=800',
        'https://images.unsplash.com/photo-1618843479618-39b0c7b2b8c8?w=800'
      ],
      inStock: true,
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: '3',
      name: 'Audi A4',
      description: 'Premium compact sedan with quattro all-wheel drive',
      price: 55000,
      brand: 'Audi',
      model: 'A4',
      year: 2024,
      mileage: 8000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      engineSize: '2.0L',
      color: 'Glacier White',
      imageUrls: [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
      ],
      inStock: true,
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: '4',
      name: 'Tesla Model 3',
      description: 'Electric vehicle with autopilot and zero emissions',
      price: 45000,
      brand: 'Tesla',
      model: 'Model 3',
      year: 2024,
      mileage: 12000,
      fuelType: 'Electric',
      transmission: 'Automatic',
      engineSize: 'Dual Motor',
      color: 'Pearl White',
      imageUrls: [
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800'
      ],
      inStock: true,
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: '5',
      name: 'Porsche 911',
      description: 'Iconic sports car with unmatched performance',
      price: 120000,
      brand: 'Porsche',
      model: '911',
      year: 2024,
      mileage: 2000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      engineSize: '3.0L',
      color: 'GT Silver',
      imageUrls: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'
      ],
      inStock: true,
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: '6',
      name: 'Lexus RX 350',
      description: 'Luxury crossover with hybrid technology',
      price: 75000,
      brand: 'Lexus',
      model: 'RX 350',
      year: 2024,
      mileage: 6000,
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      engineSize: '3.5L',
      color: 'Celestial Blue',
      imageUrls: [
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
      ],
      inStock: true,
      createdAt: '2024-01-01T00:00:00.000Z'
    }
  ];
}; 