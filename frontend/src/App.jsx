// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import UserList from './pages/UserList';
import Categories from './pages/Categories';
import Posts from './pages/Posts';
import Quiz from './pages/Quiz';
import CMS from './pages/CMS';
import PerformanceAnalytics from './pages/PerformanceAnalytics';
import Content from './pages/Content';
import Stream from './pages/Stream';
import Sections from './pages/Sections';
import AddContentQuestion from './pages/AddContentQuestion';
import CreateContent from './pages/CreateContent';
import CreateQuestion from './pages/CreateQuestion';
import VideoAnalysis from './pages/VideoAnalysis';
import VideoAnalysisReport from './pages/VideoAnalysisReport';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<AdminLogin/>} />

         <Route path="/admin/user" element={<AdminLayout><UserList/></AdminLayout>} />
          <Route path="/admin/category" element={<AdminLayout><Categories/></AdminLayout>} />
        <Route path="/admin/post" element={<AdminLayout><Posts/></AdminLayout>} />
         <Route path="/admin/quiz" element={<AdminLayout><Quiz/></AdminLayout>} />
         <Route path="/admin/cms" element={<AdminLayout><CMS/></AdminLayout>} />
          <Route path="/admin/performanceAnalytics" element={<AdminLayout><PerformanceAnalytics/></AdminLayout>} />
          <Route path="/admin/video-analysis" element={<VideoAnalysis />} />
<Route path="/admin/video-analysis/report/:userId" element={<VideoAnalysisReport />} />
         <Route path="/admin/content" element={<Content />} />
<Route path="/admin/stream/:categoryId" element={<Stream />} />
<Route path="/admin/sections/:streamId" element={<Sections />} />
<Route path="/admin/add-content-question" element={<AddContentQuestion />} />
<Route path="/admin/create-content" element={<CreateContent />} />
<Route path="/admin/create-question" element={<CreateQuestion />} />
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;