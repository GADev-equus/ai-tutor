/**
 * Loading Spinner Component
 * Simple spinner for loading states
 */

import './LoadingSpinner.css';

export default function LoadingSpinner({ size = 'medium', message = '' }) {
  const sizeClass = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  }[size];

  return (
    <div className="loading-spinner-container">
      <div className={`loading-spinner ${sizeClass}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}