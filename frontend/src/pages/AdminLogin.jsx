import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Shield, AlertCircle, ArrowRight } from 'lucide-react';
import api from '../services/api';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Call admin login API
            const response = await api.adminLogin(username, password);
            
            if (response.success) {
                // Store admin session
                localStorage.setItem('adminToken', response.token);
                localStorage.setItem('adminUsername', username);
                localStorage.setItem('adminEmail', response.data?.email || username);
                localStorage.setItem('adminRole', response.data?.role || 'admin');
                localStorage.setItem('isAdminLoggedIn', 'true');
                
                // Redirect to admin dashboard
                navigate('/');
            } else {
                setError(response.error || 'Login failed');
            }
        } catch (err) {
            console.error('Admin login error:', err);
            setError(err.message || 'Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image Section */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img 
                    src="https://www.orisoftcomputereducation.com/Photo/Data_security_01.jpg"
                    alt="Admin Office"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
                <div className="max-w-md w-full">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">INSTA STYLE LMS ADMIN</h1>
                    </div>

                    {/* Login Card */}
                    <div className="text-white rounded-lg border border-transparent 
                         shadow-[0_4px_6px_-1px_rgba(255,255,255,0.1),0_2px_4px_-1px_rgba(0,0,0,0.5)] 
                         backdrop-blur-sm bg-black/10 relative
                         before:absolute before:inset-0 before:rounded-lg 
                         before:border-2 before:border-white/70 before:shadow-[0_0_15px_rgba(255,255,255,0.6)] 
                         before:content-[''] before:pointer-events-none p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white">Admin Login</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                    <span className="text-sm text-red-600">{error}</span>
                                </div>
                            )}

                            {/* Username Field */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border text-white border-gray-300 rounded-lg focus:ring-1 focus:ring-white transition placeholder:text-gray-400 bg-transparent"
                                        placeholder="Enter username"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-white" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-10 py-3 text-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-white transition placeholder:text-gray-400 bg-transparent"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-white" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-white" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Signing in...
                                    </span>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;