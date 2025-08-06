import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import { FilterOptions } from '../types';

interface FilterChipsProps {
  filters: FilterOptions;
  onRemoveFilter: (key: keyof FilterOptions) => void;
  onClearAll: () => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  filters,
  onRemoveFilter,
  onClearAll,
}) => {
  const theme = useTheme();

  const getActiveFilters = () => {
    const activeFilters: Array<{ key: keyof FilterOptions; label: string; value: string }> = [];

    if (filters.sort) {
      const sortLabels: Record<string, string> = {
        price_asc: 'Price: Low to High',
        price_desc: 'Price: High to Low',
        name_asc: 'Name: A to Z',
        name_desc: 'Name: Z to A',
        created_at: 'Newest First',
      };
      activeFilters.push({ key: 'sort', label: 'Sort', value: sortLabels[filters.sort] });
    }

    if (filters.brand) {
      activeFilters.push({ key: 'brand', label: 'Brand', value: filters.brand });
    }

    if (filters.model) {
      activeFilters.push({ key: 'model', label: 'Model', value: filters.model });
    }

    if (filters.minPrice || filters.maxPrice) {
      const minPrice = filters.minPrice || 0;
      const maxPrice = filters.maxPrice || 1000000;
      const minDisplay = filters.minPrice ? `$${minPrice.toLocaleString()}` : '$0';
      const maxDisplay = filters.maxPrice ? `$${maxPrice.toLocaleString()}` : '∞';
      activeFilters.push({
        key: 'minPrice',
        label: 'Price Range',
        value: `${minDisplay} - ${maxDisplay}`,
      });
    }

    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleSmall" style={{ color: theme.colors.onSurface }}>
          Active Filters
        </Text>
        <Chip
          mode="outlined"
          onPress={onClearAll}
          textStyle={{ color: theme.colors.primary }}
          style={[styles.clearChip, { borderColor: theme.colors.primary }]}
        >
          Clear All
        </Chip>
      </View>
      <View style={styles.chipContainer}>
        {activeFilters.map((filter) => (
          <Chip
            key={filter.key}
            mode="outlined"
            onPress={() => onRemoveFilter(filter.key)}
            style={[styles.filterChip, { borderColor: theme.colors.outline }]}
            textStyle={{ color: theme.colors.onSurface }}
            closeIcon="close"
            onClose={() => onRemoveFilter(filter.key)}
          >
            {filter.label}: {filter.value}
          </Chip>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    marginBottom: 4,
  },
  clearChip: {
    height: 32,
  },
}); 