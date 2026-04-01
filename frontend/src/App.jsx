// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import UserList from './pages/UserList';
import Categories from './pages/Categories';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/admin/login" element={<AdminLogin/>} />

         <Route path="/admin/user" element={<AdminLayout><UserList/></AdminLayout>} />
          <Route path="/admin/category" element={<AdminLayout><Categories/></AdminLayout>} />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;