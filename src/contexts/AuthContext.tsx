import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '../types';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    loading: true,
    error: null,
  });

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({
            isLoggedIn: true,
            user,
            loading: false,
            error: null,
          });
        } else {
          setAuthState((prev) => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthState((prev) => ({ ...prev, loading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      // TODO: Replace with actual Firebase authentication
      // For now, using mock authentication
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser: User = {
        id: `user_${Date.now()}`,
        email: credentials.email,
        fullName: credentials.email.split('@')[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('userToken', `token_${Date.now()}`);

      setAuthState({
        isLoggedIn: true,
        user: mockUser,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      // Validation
      if (!credentials.fullName || !credentials.email || !credentials.password) {
        throw new Error('All fields are required');
      }

      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // TODO: Replace with actual Firebase authentication
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newUser: User = {
        id: `user_${Date.now()}`,
        email: credentials.email,
        fullName: credentials.fullName,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      await AsyncStorage.setItem('userToken', `token_${Date.now()}`);

      setAuthState({
        isLoggedIn: true,
        user: newUser,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('userToken');
      setAuthState({
        isLoggedIn: false,
        user: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
