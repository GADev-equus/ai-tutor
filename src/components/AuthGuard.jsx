/**
 * Authentication Guard Component for AI Tutor
 * Protects routes and components from unauthenticated access
 */

import { useAuth } from '../contexts/AuthContext.jsx';
import LoadingSpinner from './ui/LoadingSpinner.jsx';

export default function AuthGuard({ 
  children, 
  fallback = null,
  showLoading = true 
}) {
  const { isAuthenticated, loading } = useAuth();

  if (loading && showLoading) {
    return (
      <div className="auth-guard-loading">
        <LoadingSpinner size="medium" message="Checking authentication..." />
      </div>
    );
  }

  if (isAuthenticated === false) {
    // Don't redirect here - let AuthContext handle authentication and redirects
    return fallback || (
      <div className="auth-guard-unauthorized">
        <h2>Authentication Required</h2>
        <p>Please wait while we verify your authentication...</p>
      </div>
    );
  }

  if (isAuthenticated === true) {
    return children;
  }

  return null;
}