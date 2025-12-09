import React from 'react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Layout from './components/layout/Layout';
import './styles/globals.css';
import './styles/theme.css';

function App() {
  return (
    <Layout>
      <Dashboard />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10B981',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#EF4444',
            },
          },
        }}
      />
    </Layout>
  );
}

export default App;