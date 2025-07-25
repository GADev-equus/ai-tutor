/**
 * Authentication Guard Hook for AI Tutor
 * Checks if user is authenticated via cookies and redirects if not
 */

import { useEffect, useState } from 'react';
import httpService from '../services/httpService.js';

const MAIN_DOMAIN = import.meta.env.VITE_MAIN_DOMAIN || 'https://equussystems.co';
const LOGIN_URL = `${MAIN_DOMAIN}/auth/signin`;

export default function useAuthGuard(redirectOnFailure = true) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setLoading(true);
        
        // Validate token via cookies (cookies sent automatically)
        const response = await httpService.get('/api/auth/validate-token');
        
        if (response.success && response.user) {
          setIsAuthenticated(true);
          setUser(response.user);
        } else {
          setIsAuthenticated(false);
          if (redirectOnFailure) {
            window.location.href = LOGIN_URL;
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
        
        if (redirectOnFailure) {
          // Redirect to main site for login
          window.location.href = LOGIN_URL;
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [redirectOnFailure]);

  return {
    isAuthenticated,
    user,
    loading,
    checkAuth: () => checkAuthentication()
  };
}