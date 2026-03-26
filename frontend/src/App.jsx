// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostCreatePage from './pages/PostCreatePage';
import CategoryPage from './pages/CategoryPage';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page - No Admin Layout */}
        <Route path="/" element={<HomePage />} />
        
        {/* Admin Pages with Layout */}
        <Route 
          path="/create-category" 
          element={
            <AdminLayout>
              <CategoryPage />
            </AdminLayout>
          } 
        />
        
        <Route 
          path="/create-post" 
          element={
            <AdminLayout>
              <PostCreatePage />
            </AdminLayout>
          } 
        />

        <Route path="/admin/login" element={<AdminLogin/>} />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;