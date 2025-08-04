import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import { errorHandler, ErrorInfo } from '../utils/errorHandler';

interface ErrorLogViewerProps {
  visible: boolean;
  onClose: () => void;
}

export const ErrorLogViewer: React.FC<ErrorLogViewerProps> = ({ visible, onClose }) => {
  const [errorLog, setErrorLog] = useState<ErrorInfo[]>([]);

  const loadErrorLog = () => {
    setErrorLog(errorHandler.getErrorLog());
  };

  const clearErrorLog = () => {
    errorHandler.clearErrorLog();
    setErrorLog([]);
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString('vi-VN');
  };

  const getErrorTypeColor = (message: string) => {
    if (message.includes('Lỗi')) return '#EF4444';
    if (message.includes('Cảnh báo')) return '#F59E0B';
    if (message.includes('Thành công')) return '#10B981';
    return '#6B7280';
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Error Log Viewer</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.button} onPress={loadErrorLog}>
              <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearErrorLog}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content}>
          {errorLog.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No errors logged yet</Text>
              <Text style={styles.emptySubtext}>Errors will appear here when they occur</Text>
            </View>
          ) : (
            errorLog.map((error, index) => (
              <View key={index} style={styles.errorItem}>
                <View style={styles.errorHeader}>
                  <Text style={[styles.errorType, { color: getErrorTypeColor(error.message) }]}>
                    {error.message}
                  </Text>
                  <Text style={styles.timestamp}>
                    {formatTimestamp(error.timestamp)}
                  </Text>
                </View>
                {error.code && (
                  <Text style={styles.errorCode}>Code: {error.code}</Text>
                )}
                {error.details && (
                  <Text style={styles.errorDetails}>
                    Details: {JSON.stringify(error.details, null, 2)}
                  </Text>
                )}
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#059669',
  },
  clearButton: {
    backgroundColor: '#EF4444',
  },
  closeButton: {
    backgroundColor: '#6B7280',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  errorItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  errorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  errorType: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  errorCode: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  errorDetails: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'monospace',
  },
}); 