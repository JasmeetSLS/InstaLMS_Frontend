// src/components/Header.jsx
import React from 'react';
import { IoNotificationsOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { FiBell } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { BsBell, BsPersonCircle } from 'react-icons/bs';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md px-5 py-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50">
      {/* Left side - Notification */}
      <button className="relative group">
        <div className="p-2.5 bg-gray-50 group-hover:bg-gray-100 rounded-full transition-all duration-200">
          <IoNotificationsOutline className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
        </div>
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full ring-2 ring-white animate-pulse"></span>
      </button>

      {/* Right side - Profile Icon */}
      <button className="flex items-center gap-2 group">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
            <IoPersonCircleOutline className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
        </div>
        <span className="hidden sm:inline text-sm font-medium text-gray-700 group-hover:text-gray-900">
          Trainer
        </span>
      </button>
    </header>
  );
};

export default Header;