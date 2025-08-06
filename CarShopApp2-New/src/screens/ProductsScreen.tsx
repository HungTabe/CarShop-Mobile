import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Appbar, useTheme, FAB } from 'react-native-paper';
import { FilterModal } from '../components/FilterModal';
import { FilterChips } from '../components/FilterChips';
import { ProductGrid } from '../components/ProductGrid';
import { ErrorLogViewer } from '../components/ErrorLogViewer';
import { useProducts } from '../hooks/useProducts';
import { FilterOptions } from '../types';
import { errorHandler } from '../utils/errorHandler';

interface ProductsScreenProps {
  navigation: any;
}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showErrorLog, setShowErrorLog] = useState(false);

  const {
    products,
    loading,
    refreshing,
    filters,
    availableBrands,
    availableModels,
    refreshProducts,
    updateFilters,
    clearFilters,
  } = useProducts();

  const handleProductPress = (product: any) => {
    try {
      navigation.navigate('ProductDetail', { product });
      errorHandler.logSuccess(`Đã mở chi tiết ${product.name}`, 'Products Screen');
    } catch (error) {
      errorHandler.logError(error as Error, 'Navigation');
    }
  };

  const handleFilterApply = (newFilters: FilterOptions) => {
    updateFilters(newFilters);
  };

  const handleRemoveFilter = (key: keyof FilterOptions) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    updateFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    clearFilters();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Appbar.Content 
            title="CarShop" 
            titleStyle={{ color: theme.colors.onPrimary, fontSize: 24, fontWeight: 'bold' }}
          />
          <Appbar.Content 
            title="Discover your perfect car" 
            titleStyle={{ color: theme.colors.onPrimary, fontSize: 14, opacity: 0.8 }}
          />
        </View>
        <View style={styles.headerActions}>
          <Appbar.Action 
            icon="account" 
            onPress={() => navigation.navigate('Profile')}
            iconColor={theme.colors.onPrimary}
          />
          <Appbar.Action 
            icon="magnify" 
            onPress={() => setShowErrorLog(true)}
            iconColor={theme.colors.onPrimary}
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      {/* App Bar */}
      <Appbar.Header style={[styles.appbar, { backgroundColor: theme.colors.primary }]}>
        {renderHeader()}
      </Appbar.Header>

      {/* Filter Chips */}
      <FilterChips
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAllFilters}
      />

      {/* Product Grid */}
      <ProductGrid
        products={products}
        loading={loading}
        refreshing={refreshing}
        onRefresh={refreshProducts}
        onProductPress={handleProductPress}
      />

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleFilterApply}
        currentFilters={filters}
        availableBrands={availableBrands}
        availableModels={availableModels}
      />

      {/* Error Log Viewer */}
      <ErrorLogViewer 
        visible={showErrorLog} 
        onClose={() => setShowErrorLog(false)} 
      />

      {/* FAB for Filter */}
      <FAB
        icon="filter-variant"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => setShowFilterModal(true)}
        color={theme.colors.onPrimary}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    elevation: 4,
  },
  header: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerActions: {
    flexDirection: 'row',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 