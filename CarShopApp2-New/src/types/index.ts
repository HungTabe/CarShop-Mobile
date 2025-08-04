export interface Product {
  id: string;
  name: string;
  description: string;
  price: string; // Changed from number to string to match API
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize: string;
  color: string;
  imageUrls: string[];
  inStock: boolean;
  createdAt: string;
  updatedAt: string; // Added to match API response
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  itemCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pagination: PaginationInfo;
}

export interface FilterOptions {
  page?: number;
  limit?: number;
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'created_at';
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
} 