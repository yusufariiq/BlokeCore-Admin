import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

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

  return (
    <>
      <Toaster />
      <Routes>
        {/* If no token, redirect to login */}
        <Route 
          path="/" 
          element={token ? <Home /> : <Navigate to="/login" replace />} 
        />
        
        {/* Login route */}
        <Route 
          path="/login" 
          element={<Login setToken={setToken} />} 
        />
        
        {/* Protected routes */}
        <Route 
          path="/add" 
          element={token ? <Add /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/list" 
          element={token ? <List /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/orders" 
          element={token ? <Orders /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </>
  )
}

export default App