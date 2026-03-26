// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FolderPlus, PlusCircle, Image, X, Menu, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const navItems = [
        { 
            path: '/create-category', 
            name: 'Categories', 
            icon: <FolderPlus className="w-5 h-5" />,
        },
        { 
            path: '/create-post', 
            name: 'Create Post', 
            icon: <PlusCircle className="w-5 h-5" />,
        },
    ];

    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('isAdminLoggedIn');
        
        // Close sidebar if open
        onClose();
        
        // Redirect to login page
        navigate('/admin/login');
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 flex flex-col
                w-72 lg:translate-x-0 lg:static lg:w-80
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Header */}
                <div className="p-5 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                INSTA STYLE LMS
                            </h1>
                            <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => onClose()}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                ${isActive 
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                                    : 'text-gray-700 hover:bg-gray-100'
                                }
                            `}
                        >
                            <span className="flex-shrink-0">{item.icon}</span>
                            <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                            </div>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer with Logout Button */}
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
                    >
                        <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;