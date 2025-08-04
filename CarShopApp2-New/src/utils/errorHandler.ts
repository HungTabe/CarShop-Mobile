import Toast from 'react-native-toast-message';

export interface ErrorInfo {
  message: string;
  code?: string;
  details?: any;
  timestamp: Date;
}

class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: ErrorInfo[] = [];

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // Log error và hiển thị toast
  logError(error: Error | string, context?: string) {
    const errorInfo: ErrorInfo = {
      message: typeof error === 'string' ? error : error.message,
      code: typeof error === 'object' && 'code' in error ? (error as any).code : undefined,
      details: typeof error === 'object' ? error : undefined,
      timestamp: new Date(),
    };

    // Thêm vào log
    this.errorLog.push(errorInfo);

    // Hiển thị toast
    Toast.show({
      type: 'error',
      text1: 'Lỗi',
      text2: errorInfo.message,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
    });

    // Log ra console cho development
    console.error(`[${context || 'App'}] Error:`, errorInfo);
  }

  // Log warning
  logWarning(message: string, context?: string) {
    Toast.show({
      type: 'info',
      text1: 'Cảnh báo',
      text2: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
    });

    console.warn(`[${context || 'App'}] Warning:`, message);
  }

  // Log success
  logSuccess(message: string, context?: string) {
    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: message,
      position: 'top',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
    });

    console.log(`[${context || 'App'}] Success:`, message);
  }

  // Lấy tất cả errors đã log
  getErrorLog(): ErrorInfo[] {
    return [...this.errorLog];
  }

  // Clear error log
  clearErrorLog() {
    this.errorLog = [];
  }

  // Handle API errors
  handleApiError(error: any, context?: string) {
    let message = 'Đã xảy ra lỗi khi kết nối với server';
    
    if (error.response) {
      // Server trả về response với status code lỗi
      const status = error.response.status;
      switch (status) {
        case 400:
          message = 'Dữ liệu không hợp lệ';
          break;
        case 401:
          message = 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn';
          break;
        case 403:
          message = 'Bạn không có quyền truy cập';
          break;
        case 404:
          message = 'Không tìm thấy dữ liệu';
          break;
        case 500:
          message = 'Lỗi server, vui lòng thử lại sau';
          break;
        default:
          message = `Lỗi server (${status})`;
      }
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      message = 'Không thể kết nối với server, vui lòng kiểm tra mạng';
    } else {
      // Có lỗi khi setup request
      message = error.message || 'Đã xảy ra lỗi không xác định';
    }

    this.logError(message, context);
  }

  // Handle network errors
  handleNetworkError(error: any, context?: string) {
    let message = 'Lỗi kết nối mạng';
    
    if (error.code === 'NETWORK_ERROR') {
      message = 'Không có kết nối internet';
    } else if (error.code === 'TIMEOUT') {
      message = 'Kết nối bị timeout';
    }

    this.logError(message, context);
  }
}

export const errorHandler = ErrorHandler.getInstance();
export default ErrorHandler; 