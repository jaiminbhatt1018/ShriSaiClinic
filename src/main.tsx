import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { ThemeProvider } from './theme/ThemeContext';
import { AppointmentProvider } from './context/AppointmentContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <AppointmentProvider>
          <App />
        </AppointmentProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);

