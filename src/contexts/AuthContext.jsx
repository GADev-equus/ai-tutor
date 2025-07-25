/**
 * Authentication Context for Biology Tutor Subdomain App
 * Adapted from ai-tutor for bio-tutor-client integration
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Step 1: Check for auth_token in URL (from main site)
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('auth_token');
        
        if (urlToken) {
          console.log('🔑 AI-TUTOR: Received JWT token from main site via URL');
          
          // Store token in localStorage for subsequent API calls
          localStorage.setItem('auth_token', urlToken);
          
          // Remove token from URL for security (without refreshing page)
          const newUrl = new URL(window.location);
          newUrl.searchParams.delete('auth_token');
          window.history.replaceState({}, document.title, newUrl);
          
          console.log('🔒 AI-TUTOR: Token stored and removed from URL');
        }
        
        // Step 2: Validate authentication (token will be sent via Authorization header)
        // Add timestamp to bypass browser cache
        const response = await api.get(`/auth/validate-token?t=${Date.now()}`);
        
        if (response.data.success && response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
          console.log('✅ AI-TUTOR: Authentication successful');
        } else {
          console.log('❌ AI-TUTOR: Authentication validation failed');
          setIsAuthenticated(false);
          // Redirect to main site for login
          setTimeout(() => {
            window.location.href = import.meta.env.VITE_MAIN_DOMAIN || 'https://equussystems.co';
          }, 2000); // 2 second delay to show the loading message
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setIsAuthenticated(false);
        // Redirect to main site for login on error
        setTimeout(() => {
          window.location.href = import.meta.env.VITE_MAIN_DOMAIN || 'https://equussystems.co';
        }, 2000); // 2 second delay to show the loading message
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear stored token
      localStorage.removeItem('auth_token');
      setUser(null);
      setIsAuthenticated(false);
      // Redirect to main site
      window.location.href = import.meta.env.VITE_MAIN_DOMAIN || 'https://equussystems.co';
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};