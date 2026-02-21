import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';

// Providers
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { HealthProvider } from './contexts/HealthContext';
import { WalletProvider } from './contexts/WalletContext';

// Screens
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import DashboardScreen from './screens/Dashboard';
import ActivitiesScreen from './screens/Activities';
import NutritionScreen from './screens/Nutrition';
import WalletScreen from './screens/Wallet';
import ProfileScreen from './screens/Profile';

// Types
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#0a7ea4',
        tabBarInactiveTintColor: '#687076',
        tabBarStyle: {
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
          backgroundColor: '#fff',
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomColor: '#e5e7eb',
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: '#11181c',
        },
        headerTintColor: '#0a7ea4',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabIcon name="🏠" color={color} />,
        }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{
          title: 'Activities',
          tabBarLabel: 'Activities',
          tabBarIcon: ({ color }) => <TabIcon name="🏃" color={color} />,
        }}
      />
      <Tab.Screen
        name="Nutrition"
        component={NutritionScreen}
        options={{
          title: 'Nutrition',
          tabBarLabel: 'Nutrition',
          tabBarIcon: ({ color }) => <TabIcon name="🍽️" color={color} />,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          title: 'Wallet',
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color }) => <TabIcon name="💰" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <TabIcon name="👤" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function TabIcon({ name, color }: { name: string; color: string }) {
  return <View style={{ fontSize: 20, opacity: color === '#0a7ea4' ? 1 : 0.5 }}>{name}</View>;
}

function RootNavigator() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HealthProvider>
        <WalletProvider>
          <RootNavigator />
        </WalletProvider>
      </HealthProvider>
    </AuthProvider>
  );
}
