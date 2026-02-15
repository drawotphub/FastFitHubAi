# FastFitHub AI

An open-source AI-powered fitness application built with React Native and Expo. Get personalized workout recommendations, nutrition tracking, and community features powered by artificial intelligence.

## 🎯 Features

**Fitness Tracking**
- Log workouts with duration, intensity, and calories burned
- Track daily activity and weekly progress
- AI-powered workout recommendations
- Real-time performance metrics

**Nutrition Management**
- Track daily calorie intake and macronutrients
- Food database with nutritional information
- Meal planning and suggestions
- Dietary preference customization

**AI Features**
- Personalized workout plans based on your fitness level
- AI nutrition recommendations
- Progress analysis and insights
- Smart goal setting and tracking

**Community**
- Share achievements and progress
- Join fitness challenges
- Connect with other fitness enthusiasts
- Leaderboards and badges

## 🛠️ Tech Stack

- **Framework:** React Native 0.74.5
- **Platform:** Expo 51.0.28
- **Language:** TypeScript 5.3.3
- **Navigation:** React Navigation 6.1.18
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **UI Components:** React Native Elements + RNEUI Themed
- **HTTP Client:** Axios 1.7.7

## 📋 Prerequisites

- Node.js 16+ and npm/pnpm
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator or Android Emulator (or physical device)
- Firebase account for backend services

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/drawotphub/FastFitHubAi.git
cd FastFitHubAi
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_key
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_key
EXPO_PUBLIC_ENV_MODE=development
```

### 4. Start the Development Server

```bash
npm start
# or
pnpm start
```

### 5. Run on Your Device

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Web:**
```bash
npm run web
```

**Expo Go (Mobile):**
- Scan the QR code with Expo Go app (iOS/Android)

## 📁 Project Structure

```
src/
├── screens/
│   ├── Login.tsx              # Login screen with authentication
│   ├── Register.tsx           # User registration
│   ├── Dashboard.tsx          # Main dashboard with stats
│   └── ...                    # Additional screens
├── components/
│   ├── Card.tsx               # Reusable card component
│   └── ...                    # Other components
├── services/
│   ├── firebase.ts            # Firebase configuration and functions
│   └── ...                    # Other services
├── utils/
│   ├── env.ts                 # Environment configuration
│   └── ...                    # Utility functions
├── App.tsx                    # Root app component
└── index.ts                   # Entry point
```

## 🔐 Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Copy your Firebase config to `.env` file
5. Update `src/services/firebase.ts` with your configuration

## 🎨 Screens

### Login Screen
- Email and password authentication
- Social login options (Google, Apple)
- Link to registration screen
- Password recovery option

### Register Screen
- Full name, email, and password input
- Form validation
- Terms and conditions acceptance
- Automatic redirect to login on success

### Dashboard Screen
- Daily fitness metrics
- Weekly goal progress
- Recent workouts
- AI recommendations
- Quick action buttons

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web

# Lint code
npm run lint
```

## 📦 Dependencies

- `expo` - React Native framework
- `react-native` - Mobile development framework
- `@react-navigation/native` - Navigation library
- `firebase` - Backend services
- `axios` - HTTP client
- `@rneui/themed` - UI components

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow the existing code structure
- Write meaningful commit messages
- Test your changes before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Reporting Issues

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 📞 Support

For support, please:
- Open an issue on GitHub
- Check existing issues for similar problems
- Provide detailed information about your setup

## 🗺️ Roadmap

- [ ] Apple Health integration
- [ ] Google Fit integration
- [ ] Wearable device support (Apple Watch, Fitbit)
- [ ] Advanced analytics dashboard
- [ ] Social features (friend challenges, leaderboards)
- [ ] Offline mode
- [ ] Push notifications
- [ ] Video workout tutorials
- [ ] Nutrition database expansion
- [ ] Multi-language support

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- UI components from [React Native Elements](https://reactnativeelements.com/)
- Icons from [Expo Vector Icons](https://icons.expo.fyi/)
- Backend powered by [Firebase](https://firebase.google.com/)

## 📄 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation Documentation](https://reactnavigation.org/)

---

**Happy Coding!** 🚀 If you find this project helpful, please give it a ⭐ on GitHub!
