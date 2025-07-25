/**
 * Authentication Guard Component for AI Tutor
 * Protects routes and components from unauthenticated access
 */

import useAuthGuard from '../hooks/useAuthGuard.js';
import LoadingSpinner from './ui/LoadingSpinner.jsx';

export default function AuthGuard({ 
  children, 
  fallback = null,
  showLoading = true 
}) {
  const { isAuthenticated, loading } = useAuthGuard(true);

  if (loading && showLoading) {
    return (
      <div className="auth-guard-loading">
        <LoadingSpinner size="medium" message="Checking authentication..." />
      </div>
    );
  }

  if (isAuthenticated === false) {
    return fallback || (
      <div className="auth-guard-unauthorized">
        <h2>Authentication Required</h2>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  if (isAuthenticated === true) {
    return children;
  }

  return null;
}