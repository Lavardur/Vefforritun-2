'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthApi } from '../api';
import { AuthState, LoginCredentials} from '../types';

type AuthContextType = {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  authState: { user: null, token: null, isAuthenticated: false, isLoading: true },
  login: async () => false,
  logout: async () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const authApi = new AuthApi();

  // Initialize auth state from localStorage
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          return;
        }

        const result = await authApi.getCurrentUser(token);
        if (result.ok && result.value) {
          setAuthState({
            user: result.value,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          // Token is invalid or expired
          localStorage.removeItem('authToken');
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Failed to initialize auth state:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadAuthState();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const result = await authApi.login(credentials);
      
      if (result.ok && result.value) {
        const { token } = result.value;
        localStorage.setItem('authToken', token);
        
        // Decode the token to get user information
        const userResult = await authApi.getCurrentUser(token);
        
        if (userResult.ok && userResult.value) {
          setAuthState({
            user: userResult.value,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          return false;
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  // Logout function (the backend doesn't have a logout endpoint, so we just clear local state)
  const logout = async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const contextValue = {
    authState,
    login,
    logout,
    isLoading: authState.isLoading,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};