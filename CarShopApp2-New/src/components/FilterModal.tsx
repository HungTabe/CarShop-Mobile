import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import {
  Button,
  Card,
  Chip,
  Divider,
  Text,
  useTheme,
  Portal,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import { FilterOptions } from '../types';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
  availableBrands: string[];
  availableModels: string[];
}

const sortOptions = [
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A to Z', value: 'name_asc' },
  { label: 'Name: Z to A', value: 'name_desc' },
  { label: 'Newest First', value: 'created_at' },
];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters,
  availableBrands,
  availableModels,
}) => {
  const theme = useTheme();
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);
  const [minPrice, setMinPrice] = useState<string>(
    currentFilters.minPrice?.toString() || ''
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    currentFilters.maxPrice?.toString() || ''
  );

  const handleSortChange = (sortValue: string) => {
    setFilters(prev => ({ ...prev, sort: sortValue as any }));
  };

  const handleBrandToggle = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brand: prev.brand === brand ? undefined : brand,
    }));
  };

  const handleModelToggle = (model: string) => {
    setFilters(prev => ({
      ...prev,
      model: prev.model === model ? undefined : model,
    }));
  };

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    const numValue = value ? parseInt(value) : undefined;
    setFilters(prev => ({
      ...prev,
      minPrice: numValue,
    }));
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    const numValue = value ? parseInt(value) : undefined;
    setFilters(prev => ({
      ...prev,
      maxPrice: numValue,
    }));
  };

  const handleClearAll = () => {
    setFilters({});
    setMinPrice('');
    setMaxPrice('');
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.sort) count++;
    if (filters.brand) count++;
    if (filters.model) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    return count;
  };

  const formatPrice = (price: string) => {
    if (!price) return '';
    const numPrice = parseInt(price);
    if (isNaN(numPrice)) return '';
    return numPrice.toLocaleString();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onClose}
      >
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
            <Text variant="headlineSmall" style={{ color: theme.colors.onSurface }}>
              Filters & Sort
            </Text>
            <Button
              mode="text"
              onPress={handleClearAll}
              textColor={theme.colors.primary}
            >
              Clear All
            </Button>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Sort Options */}
            <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
              <Card.Content>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
                  Sort By
                </Text>
                <RadioButton.Group
                  onValueChange={handleSortChange}
                  value={filters.sort || ''}
                >
                  {sortOptions.map((option) => (
                    <RadioButton.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      color={theme.colors.primary}
                      labelStyle={{ color: theme.colors.onSurface }}
                    />
                  ))}
                </RadioButton.Group>
              </Card.Content>
            </Card>

            <Divider style={{ marginVertical: 16 }} />

            {/* Price Range */}
            <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
              <Card.Content>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
                  Price Range
                </Text>
                <View style={styles.priceInputContainer}>
                  <View style={styles.priceInput}>
                    <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8 }}>
                      Min Price
                    </Text>
                    <TextInput
                      mode="outlined"
                      value={minPrice}
                      onChangeText={handleMinPriceChange}
                      placeholder="0"
                      keyboardType="numeric"
                      left={<TextInput.Affix text="$" />}
                      style={{ backgroundColor: theme.colors.surface }}
                      outlineColor={theme.colors.outline}
                      activeOutlineColor={theme.colors.primary}
                    />
                  </View>
                  <View style={styles.priceInput}>
                    <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8 }}>
                      Max Price
                    </Text>
                    <TextInput
                      mode="outlined"
                      value={maxPrice}
                      onChangeText={handleMaxPriceChange}
                      placeholder="1000000"
                      keyboardType="numeric"
                      left={<TextInput.Affix text="$" />}
                      style={{ backgroundColor: theme.colors.surface }}
                      outlineColor={theme.colors.outline}
                      activeOutlineColor={theme.colors.primary}
                    />
                  </View>
                </View>
                {(minPrice || maxPrice) && (
                  <View style={styles.priceDisplay}>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                      Range: ${formatPrice(minPrice) || '0'} - ${formatPrice(maxPrice) || '∞'}
                    </Text>
                  </View>
                )}
              </Card.Content>
            </Card>

            <Divider style={{ marginVertical: 16 }} />

            {/* Brand Filter */}
            <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
              <Card.Content>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
                  Brand
                </Text>
                <View style={styles.chipContainer}>
                  {availableBrands.map((brand) => (
                    <Chip
                      key={brand}
                      selected={filters.brand === brand}
                      onPress={() => handleBrandToggle(brand)}
                      style={styles.chip}
                      selectedColor={theme.colors.primary}
                      textStyle={{ color: theme.colors.onSurface }}
                    >
                      {brand}
                    </Chip>
                  ))}
                </View>
              </Card.Content>
            </Card>

            <Divider style={{ marginVertical: 16 }} />

            {/* Model Filter */}
            <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
              <Card.Content>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
                  Model
                </Text>
                <View style={styles.chipContainer}>
                  {availableModels.map((model) => (
                    <Chip
                      key={model}
                      selected={filters.model === model}
                      onPress={() => handleModelToggle(model)}
                      style={styles.chip}
                      selectedColor={theme.colors.primary}
                      textStyle={{ color: theme.colors.onSurface }}
                    >
                      {model}
                    </Chip>
                  ))}
                </View>
              </Card.Content>
            </Card>
          </ScrollView>

          {/* Footer */}
          <View style={[styles.footer, { backgroundColor: theme.colors.surface }]}>
            <Button
              mode="outlined"
              onPress={onClose}
              style={styles.footerButton}
              textColor={theme.colors.onSurface}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleApply}
              style={styles.footerButton}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
            >
              Apply ({getActiveFiltersCount()})
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 8,
    elevation: 2,
  },
  priceInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  priceInput: {
    flex: 1,
  },
  priceDisplay: {
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  footerButton: {
    flex: 1,
  },
}); 