const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for react-native-worklets
config.resolver.platforms = ['native', 'android', 'ios', 'web'];

module.exports = config; 