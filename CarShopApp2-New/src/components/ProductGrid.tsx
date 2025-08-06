import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onProductPress: (product: Product) => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  refreshing,
  onRefresh,
  onProductPress,
  onEndReached,
  onEndReachedThreshold = 0.5,
}) => {
  const theme = useTheme();

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} onPress={onProductPress} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
        No products found
      </Text>
      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
        Try adjusting your filters
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginLeft: 8 }}>
          Loading more...
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyState}
      ListFooterComponent={renderFooter}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    marginTop: 10,
    minHeight: 400,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
}); 