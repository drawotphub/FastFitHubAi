import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
<<<<<<< HEAD
        <Stack.Screen name="Login" component={LoginScreen} />
=======
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
>>>>>>> 0a7beda8 (Your commit message describing the changes)
      </Stack.Navigator>
    </NavigationContainer>
  );
}
