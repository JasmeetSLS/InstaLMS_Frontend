// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoNotificationsOutline, IoSendOutline } from 'react-icons/io5';
import { LogOut, User, X, Mail, Briefcase, BadgeCheck, Calendar, Image as ImageIcon, Share2 } from 'lucide-react';
import { authAPI } from '../services/api';

const Header = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  
  // Get user info from localStorage (fallback)
  const userName = userData?.name || localStorage.getItem('userName') || 'User';
  const userRole = userData?.role || localStorage.getItem('userRole') || 'User';
  const profileImageUrl = userData?.profile_image 
    ? `http://localhost:5000${userData.profile_image}` 
    : "https://img.freepik.com/free-photo/young-male-posing-isolated-against-blank-studio-wall_273609-12356.jpg";
  
  const isLoggedIn = localStorage.getItem('token') !== null;

  useEffect(() => {
    // Fetch user profile if logged in
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.getProfile();
          if (response.data) {
            setUserData(response.data);
            // Update localStorage with latest user info
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('user', JSON.stringify(response.data));
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // If token is invalid, logout
          if (error.response?.status === 401 || error.response?.status === 403) {
            handleLogout();
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    // Clear all user session data
    authAPI.logout();
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isUserLoggedIn');
    
    // Clear admin session data if any
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('isAdminLoggedIn');
    
    // Close popup if open
    setShowProfilePopup(false);
    
    // Redirect to home page
    navigate('/');
  };

  const handleProfileClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const handleSharedPostsClick = () => {
    navigate('/shared-posts');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <header className="bg-white/80 backdrop-blur-md px-5 py-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="hidden sm:block">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-16 bg-gray-200 rounded mt-1 animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md px-5 py-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50">
        {/* Left side - Profile Section */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleProfileClick}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-200 border-2 border-gray-200 group-hover:border-blue-400">
                <img 
                  src={profileImageUrl}
                  alt={userName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://img.freepik.com/free-photo/young-male-posing-isolated-against-blank-studio-wall_273609-12356.jpg";
                  }}
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
          {/* Shared Posts Button */}
          <button 
            onClick={handleSharedPostsClick}
            className="relative group"
            title="Shared Posts"
          >
            <div className="p-2.5 bg-gray-100 group-hover:bg-green-100 rounded-full transition-all duration-200">
              <Share2 className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
            </div>
          </button>

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

      {/* Profile Popup Modal */}
      {showProfilePopup && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={() => setShowProfilePopup(false)}>
          <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 transition-opacity"></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div 
              className="relative bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowProfilePopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Header with Background */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-t-2xl"></div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                      <img 
                        src={profileImageUrl}
                        alt={userData?.name || 'Profile'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://img.freepik.com/free-photo/young-male-posing-isolated-against-blank-studio-wall_273609-12356.jpg";
                        }}
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="pt-16 pb-6 px-6">
                {/* Name and Role */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{userData?.name || 'User'}</h3>
                  <div className="inline-flex items-center gap-1 mt-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                    <BadgeCheck className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-700 capitalize">{userData?.role || 'User'}</span>
                  </div>
                </div>

                {/* User Details */}
                <div className="space-y-3">
                  {/* Employee ID */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Employee ID</p>
                      <p className="text-sm font-medium text-gray-900">{userData?.employeeid || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="text-sm font-medium text-gray-900">{userData?.name || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <BadgeCheck className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="text-sm font-medium">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          userData?.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            userData?.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          {userData?.status || 'active'}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Member Since</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(userData?.created_at)}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 group"
                  >
                    <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;