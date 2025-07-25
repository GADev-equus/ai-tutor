import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Bootstrap JS - by importing directly as a module instead of a script,
// it will be properly initialized and available as the 'bootstrap' global
import * as bootstrap from 'bootstrap';

// Make bootstrap globally available
window.bootstrap = bootstrap;

// Import styles
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
