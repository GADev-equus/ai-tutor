/**
 * ApiStatus component for showing the connection status with the backend
 */
import { useState, useEffect } from 'react';
import { checkApiHealth } from '../services/api';

const ApiStatus = () => {
  const [status, setStatus] = useState('checking');
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await checkApiHealth();
        console.log('Health check complete:', response);
        if (response && response.status === 'ok') {
          setStatus('connected');
        } else {
          console.warn('API returned non-ok status:', response);
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
        console.error('API health check failed:', error);
      }
    };

    checkHealth();

    // Check health periodically
    const intervalId = setInterval(checkHealth, 60000); // Every minute

    return () => clearInterval(intervalId);
  }, []);

  if (status === 'checking') {
    return (
      <div className="api-status d-inline-flex align-items-center">
        <div
          className="spinner-grow spinner-grow-sm text-warning me-2"
          role="status"
        >
          <span className="visually-hidden">Checking connection...</span>
        </div>
        <small>Checking backend status...</small>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="api-status d-inline-flex align-items-center text-danger">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-exclamation-circle me-2"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
        </svg>
        <small>Backend connection error</small>
      </div>
    );
  }

  return (
    <div className="api-status d-inline-flex align-items-center text-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-check-circle me-2"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="m10.97 4.97-.708.707L7.5 8.5 6.738 7.738l-.707.707L7.5 9.929l3.469-3.469-.707-.707z" />
      </svg>
      <small>Backend connected</small>
    </div>
  );
};

export default ApiStatus;
