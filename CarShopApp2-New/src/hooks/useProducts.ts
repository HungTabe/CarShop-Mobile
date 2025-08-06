import { useState, useEffect, useCallback } from 'react';
import { Product, FilterOptions } from '../types';
import { getProducts } from '../services/api';
import { errorHandler } from '../utils/errorHandler';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  refreshing: boolean;
  filters: FilterOptions;
  availableBrands: string[];
  availableModels: string[];
  loadProducts: (newFilters?: FilterOptions) => Promise<void>;
  refreshProducts: () => Promise<void>;
  updateFilters: (newFilters: FilterOptions) => void;
  clearFilters: () => void;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  // Extract unique brands and models from products
  const extractFilterOptions = useCallback((productsList: Product[]) => {
    const brands = [...new Set(productsList.map(product => product.brand))].sort();
    const models = [...new Set(productsList.map(product => product.model))].sort();
    setAvailableBrands(brands);
    setAvailableModels(models);
  }, []);

  const loadProducts = useCallback(async (newFilters?: FilterOptions) => {
    try {
      setLoading(true);
      const filtersToUse = newFilters || filters;
      const productsData = await getProducts(filtersToUse);
      setProducts(productsData);
      extractFilterOptions(productsData);
      errorHandler.logSuccess('Sản phẩm đã được tải thành công', 'Products Hook');
    } catch (error) {
      errorHandler.logError(error as Error, 'Products Hook');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters, extractFilterOptions]);

  const refreshProducts = useCallback(async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  }, [loadProducts]);

  const updateFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    // Load products with new filters immediately
    loadProducts(newFilters);
  }, [loadProducts]);

  const clearFilters = useCallback(() => {
    setFilters({});
    // Load products without filters
    loadProducts({});
  }, [loadProducts]);

  // Load products on mount only
  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    refreshing,
    filters,
    availableBrands,
    availableModels,
    loadProducts,
    refreshProducts,
    updateFilters,
    clearFilters,
  };
}; 