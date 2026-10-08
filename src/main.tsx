import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './theme/ThemeContext';
import { AppointmentProvider } from './context/AppointmentContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppointmentProvider>
        <App />
      </AppointmentProvider>
    </ThemeProvider>
  </React.StrictMode>
);
