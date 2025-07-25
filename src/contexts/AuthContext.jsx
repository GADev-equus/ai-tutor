/**
 * Authentication Context for AI Tutor Subdomain App
 * Lightweight version focused on cookie-based authentication
 */

import { createContext, useContext, useState, useEffect } from 'react';
import httpService from '../services/httpService.js';

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
        const response = await httpService.get(`/api/auth/validate-token?t=${Date.now()}`);
        
        if (response.success && response.user) {
          setUser(response.user);
          setIsAuthenticated(true);
          console.log('✅ AI-TUTOR: Authentication successful');
        } else {
          console.log('❌ AI-TUTOR: Authentication validation failed');
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = async () => {
    try {
      await httpService.post('/api/auth/logout');
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