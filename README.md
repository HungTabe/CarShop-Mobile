# CarShop Mobile Application

## Project Overview
The CarShop Mobile Application is a cross-platform mobile app built with React Native, designed to provide a seamless car purchasing experience. It integrates with a Next.js-based RESTful API powered by Supabase and Stripe, enabling users to browse car products, manage their shopping cart, process payments, communicate with store representatives, and locate physical stores. The app is user-friendly, secure, and optimized for both Android and iOS platforms.

### Features
- **Authentication**: Secure user signup and login with email and password, managed by Supabase Auth.
- **Product Browsing**: View a list of cars with sorting and filtering options by price, brand, or other attributes.
- **Product Details**: Access detailed car information, including descriptions, specifications, and images, with an option to add items to the cart.
- **Cart Management**: Add, update, or remove items in the cart, with real-time total price calculation.
- **Billing**: Process secure payments via Stripe (adaptable to VNPay/ZaloPay) and view order confirmations.
- **Notifications**: Display a badge on the app icon indicating the number of items in the cart.
- **Store Locator**: View store locations on an integrated Google Maps interface with directions.
- **Real-Time Chat**: Communicate with store representatives through a real-time chat feature powered by Supabase Realtime.

## Tech Stack
- **Framework**: React Native (TypeScript)
- **State Management**: Redux Toolkit
- **API Client**: Axios
- **Authentication**: Supabase JavaScript Client
- **Navigation**: React Navigation
- **Maps**: react-native-maps
- **Notifications**: react-native-push-notification
- **Payments**: Stripe React Native SDK (adaptable to VNPay/ZaloPay)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Storage**: React Native Async Storage
- **Environment**: Node.js (v18 or higher)

## Prerequisites
- Node.js (v18 or higher)
- React Native CLI or Expo CLI
- Supabase account with a configured project
- Stripe account (for sandbox testing)
- Google Maps API key
- Android Studio (for Android) or Xcode (for iOS)
- Git

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/carshop-mobile.git
   cd carshop-mobile
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the project root with the following:
   ```
   SUPABASE_URL=https://[project-ref].supabase.co
   SUPABASE_ANON_KEY=[your-anon-key]
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   GOOGLE_MAPS_API_KEY=[your-google-maps-api-key]
   ```
   - Obtain `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the Supabase dashboard.
   - Get `STRIPE_PUBLISHABLE_KEY` from Stripe’s dashboard (test mode).
   - Acquire `GOOGLE_MAPS_API_KEY` from the Google Cloud Console.

4. **Set Up Platform Permissions**:
   - **Android**: Add location and notification permissions in `android/app/src/main/AndroidManifest.xml`.
   - **iOS**: Update `ios/CarShopApp/Info.plist` with location and notification usage descriptions.

5. **Run the Application**:
   Start the development server and run on an emulator or device:
   ```bash
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

## Integration with Backend
The app connects to a Next.js-based RESTful API (deployed on Vercel or similar) with the following endpoints:
- `/api/auth/signup` and `/api/auth/login` for user authentication.
- `/api/products` and `/api/products/[id]` for product browsing and details.
- `/api/cart` for cart management (GET, POST, PUT, DELETE).
- `/api/billing` for payment processing.
- `/api/notifications` for cart badge updates.
- `/api/store/location` for store location data.
- `/api/chat` for real-time chat messaging.

The backend uses Supabase for authentication, PostgreSQL for data storage, and Stripe for payments, with Supabase Realtime enabling live chat functionality.

## Security
- **Authentication**: Supabase Auth ensures secure user credential management with JWTs.
- **Data Access**: Protected API endpoints require JWT authentication.
- **Sensitive Data**: API keys and credentials are stored securely in environment variables.

## Testing
- Use Supabase’s test accounts for authentication testing.
- Test payments with Stripe’s sandbox environment.
- Verify map functionality with mock coordinates.
- Simulate real-time chat using Supabase’s dashboard.
- Test notifications on emulators or physical devices.

## Deployment
- **Build**: Generate production builds for Android (APK/AAB) and iOS (IPA) using React Native CLI.
- **Distribution**: Publish to Google Play Store, App Store, or use TestFlight for iOS testing.
- **Backend**: Ensure the backend API is deployed and accessible.

## Future Improvements
- Support localized payment gateways (e.g., VNPay, ZaloPay).
- Enhance product filtering with advanced car-specific criteria.
- Add multimedia support for chat (e.g., images).
- Implement offline caching for improved user experience.

## Contributing
Contributions are welcome! Please submit issues or pull requests to the GitHub repository. Follow TypeScript conventions and include tests for new features.

## Contact
For questions or support, contact [trandinhhung717@gmail.com] or open an issue on the GitHub repository.