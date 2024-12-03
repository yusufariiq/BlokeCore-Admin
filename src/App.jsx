import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const ProtectedRoute = ({ children }) => {
    return token ? (
      <Layout>
        {children}
      </Layout>
    ) : (
      <Navigate to="/login" replace />
    )
  }

  return (
    <>
      <Toaster />
      <Routes>
          <Route 
            path="/login" 
            element={<Login setToken={setToken} />} 
          />
          
          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add" 
            element={
              <ProtectedRoute>
                <Add token={token} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/list" 
            element={
              <ProtectedRoute>
                <List token={token} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <Orders token={token}/>
              </ProtectedRoute>
            } 
          />
        </Routes>
    </>
  )
}

export default App