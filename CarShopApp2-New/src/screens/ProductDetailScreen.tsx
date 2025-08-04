import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Product } from '../types';
import { RootStackParamList } from '../../App';
import { errorHandler } from '../utils/errorHandler';

type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface ProductDetailScreenProps {
  navigation: ProductDetailScreenNavigationProp;
  route: ProductDetailScreenRouteProp;
}

const { width } = Dimensions.get('window');

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { product } = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(numericPrice);
  };

  const handleAddToCart = () => {
    try {
      errorHandler.logSuccess(`${product.name} đã được thêm vào giỏ hàng`, 'Product Detail');
      Alert.alert(
        'Added to Cart',
        `${product.name} has been added to your cart`,
        [
          {
            text: 'Continue Shopping',
            style: 'cancel',
          },
          {
            text: 'View Cart',
            onPress: () => {
              errorHandler.logWarning('Chức năng giỏ hàng chưa được implement', 'Product Detail');
            },
          },
        ]
      );
    } catch (error) {
      errorHandler.logError(error as Error, 'Add to Cart');
    }
  };

  const handleQuantityChange = (increment: boolean) => {
    try {
      if (increment) {
        setQuantity(quantity + 1);
        errorHandler.logSuccess('Đã tăng số lượng', 'Product Detail');
      } else if (quantity > 1) {
        setQuantity(quantity - 1);
        errorHandler.logSuccess('Đã giảm số lượng', 'Product Detail');
      } else {
        errorHandler.logWarning('Số lượng không thể giảm dưới 1', 'Product Detail');
      }
    } catch (error) {
      errorHandler.logError(error as Error, 'Quantity Change');
    }
  };

  const renderImageSlider = () => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: product.imageUrls[selectedImageIndex] }}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      <View style={styles.imageIndicators}>
        {product.imageUrls.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              selectedImageIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );

  const renderProductInfo = () => (
    <View style={styles.productInfo}>
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );

  const renderSpecifications = () => (
    <View style={styles.specifications}>
      <Text style={styles.sectionTitle}>Specifications</Text>
      <View style={styles.specGrid}>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Year</Text>
          <Text style={styles.specValue}>{product.year}</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Mileage</Text>
          <Text style={styles.specValue}>{product.mileage.toLocaleString()} mi</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Fuel Type</Text>
          <Text style={styles.specValue}>{product.fuelType}</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Transmission</Text>
          <Text style={styles.specValue}>{product.transmission}</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Engine Size</Text>
          <Text style={styles.specValue}>{product.engineSize}</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Color</Text>
          <Text style={styles.specValue}>{product.color}</Text>
        </View>
      </View>
    </View>
  );

  const renderQuantitySelector = () => (
    <View style={styles.quantityContainer}>
      <Text style={styles.quantityLabel}>Quantity</Text>
      <View style={styles.quantitySelector}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(false)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(true)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAddToCartButton = () => (
    <View style={styles.addToCartContainer}>
      <TouchableOpacity
        style={[
          styles.addToCartButton,
          !product.inStock && styles.disabledButton,
        ]}
        onPress={handleAddToCart}
        disabled={!product.inStock}
      >
        <Text style={styles.addToCartText}>
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderImageSlider()}
        <View style={styles.content}>
          {renderProductInfo()}
          {renderSpecifications()}
          {renderQuantitySelector()}
        </View>
      </ScrollView>
      {renderAddToCartButton()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
    backgroundColor: '#000000',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  productInfo: {
    marginBottom: 24,
  },
  brand: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 30,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#059669',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  specifications: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specItem: {
    width: '50%',
    marginBottom: 16,
  },
  specLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  quantityContainer: {
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#059669',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  addToCartButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 