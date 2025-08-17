import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n'; // Importa la configuración de i18n
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);