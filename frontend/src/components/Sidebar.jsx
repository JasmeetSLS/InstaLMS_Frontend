// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  X, LogOut, LayoutGrid, Newspaper, TestTube, Brain } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
   const navItems = [
        { 
            path: '/admin/category', 
            name: 'Category', 
            icon: <LayoutGrid className="w-5 h-5" />,
        },
        { 
            path: '/admin/post', 
            name: 'Post', 
            icon: <Newspaper className="w-5 h-5" />,
        },
         { 
            path: '/admin/quiz', 
            name: 'Quiz', 
            icon: <Brain className="w-5 h-5" />,
        },
         { 
            path: '/admin/cms', 
            name: 'CMS', 
            icon: <Brain className="w-5 h-5" />,
        },
    ];

    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminData');
        
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
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full z-50 transition-transform duration-300 flex flex-col
                w-72 lg:translate-x-0 lg:static lg:w-80
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                bg-black border-r border-white/20
                shadow-[4px_0_6px_-1px_rgba(0,0,0,0.5)]
            `}>
                {/* Header */}
                <div className="p-5 border-b border-white/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                                    INSTA STYLE LMS
                                </span>
                            </h1>
                            <p className="text-xs text-white/50 mt-1">Admin Panel</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-all"
                        >
                            <X className="w-5 h-5 text-white/70" />
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
                                    ? 'bg-white/20 backdrop-blur-sm border border-white/30 text-white shadow-lg' 
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
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
                <div className="p-4 border-t border-white/20">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400  hover:text-red-300 transition-all duration-200 group"
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