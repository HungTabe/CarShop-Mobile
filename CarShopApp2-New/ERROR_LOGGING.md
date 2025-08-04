# Error Logging System

Hệ thống error logging này giúp developer theo dõi và debug các lỗi trong ứng dụng React Native.

## Tính năng

### 1. Toast Notifications
- Hiển thị thông báo lỗi, cảnh báo và thành công
- Tự động ẩn sau 2-4 giây
- Hiển thị ở vị trí top của màn hình

### 2. Error Handler
- Singleton pattern để quản lý errors
- Lưu trữ log errors với timestamp
- Phân loại errors: Error, Warning, Success
- Handle API errors với status codes
- Handle network errors

### 3. Error Log Viewer
- Modal để xem tất cả errors đã log
- Refresh để cập nhật log mới
- Clear để xóa log
- Hiển thị chi tiết: message, code, timestamp, details

## Cách sử dụng

### Import Error Handler
```typescript
import { errorHandler } from '../utils/errorHandler';
```

### Log Errors
```typescript
// Log error
errorHandler.logError('Có lỗi xảy ra', 'Context');

// Log warning
errorHandler.logWarning('Cảnh báo', 'Context');

// Log success
errorHandler.logSuccess('Thành công', 'Context');
```

### Handle API Errors
```typescript
try {
  const response = await api.get('/products');
  // handle success
} catch (error) {
  errorHandler.handleApiError(error, 'API Context');
}
```

### Handle Network Errors
```typescript
try {
  // network operation
} catch (error) {
  errorHandler.handleNetworkError(error, 'Network Context');
}
```

### Xem Error Log
- Tap vào icon 🔍 ở header của ProductsScreen
- Modal sẽ hiển thị tất cả errors đã log
- Có thể refresh hoặc clear log

## Cấu trúc Error Info

```typescript
interface ErrorInfo {
  message: string;        // Nội dung lỗi
  code?: string;          // Mã lỗi (nếu có)
  details?: any;          // Chi tiết lỗi
  timestamp: Date;        // Thời gian xảy ra
}
```

## Toast Types

- **Error**: Màu đỏ, hiển thị 4 giây
- **Warning**: Màu cam, hiển thị 3 giây  
- **Success**: Màu xanh, hiển thị 2 giây

## Development Tips

1. **Sử dụng context**: Luôn thêm context để biết lỗi xảy ra ở đâu
2. **Log chi tiết**: Log đầy đủ thông tin để debug dễ dàng
3. **User-friendly messages**: Hiển thị message dễ hiểu cho user
4. **Console logging**: Errors cũng được log ra console cho development

## Ví dụ sử dụng

```typescript
// Trong component
const handlePress = () => {
  try {
    // some operation
    errorHandler.logSuccess('Thao tác thành công', 'Component Name');
  } catch (error) {
    errorHandler.logError(error as Error, 'Component Name');
  }
};

// Trong API service
export const fetchData = async () => {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    errorHandler.handleApiError(error, 'Fetch Data');
    throw error;
  }
};
```

## Lưu ý

- Error handler sử dụng singleton pattern
- Toast notifications cần được thêm vào App.tsx
- Error log viewer chỉ hiển thị trong development
- Có thể customize toast styles và timing 