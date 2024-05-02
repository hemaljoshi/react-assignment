import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SelectedApplicationProvider } from './context/SelectedApplicationContext';
import Layout from './components/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SelectedApplicationProvider>
      <Layout>
        <App />
      </Layout>
    </SelectedApplicationProvider>
  </React.StrictMode>
);
