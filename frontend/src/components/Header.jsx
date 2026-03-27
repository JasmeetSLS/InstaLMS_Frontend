// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const profileImageUrl = "https://img.freepik.com/free-photo/young-male-posing-isolated-against-blank-studio-wall_273609-12356.jpg";
  
  // Get user info from localStorage
  const userName = localStorage.getItem('userName') || 'User';
  const userRole = localStorage.getItem('userRole') || 'User';
  const isLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';

  const handleLogout = () => {
    // Clear all user session data
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isUserLoggedIn');
    
    // Clear admin session data if any
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('isAdminLoggedIn');
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md px-5 py-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50">
      {/* Left side - Profile Section */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-200 border-2 border-gray-200">
              <img 
                src={profileImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {userName}
            </p>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
          </div>
        </button>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        {/* Notification Button */}
        <button className="relative group">
          <div className="p-2.5 bg-gray-100 group-hover:bg-gray-200 rounded-full transition-all duration-200">
            <IoNotificationsOutline className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </div>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full ring-2 ring-white animate-pulse"></span>
        </button>

        {/* Logout Button */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 group"
          >
            <LogOut className="w-4 h-4 text-red-600 group-hover:text-red-700" />
            <span className="hidden sm:inline text-sm font-medium text-red-600 group-hover:text-red-700">
              Logout
            </span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;