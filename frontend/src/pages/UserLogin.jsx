// src/pages/UserLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

const UserLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Static user credentials (you can add multiple users)
    const users = [
        { email: 'user@user.com', password: 'User@123', name: 'John Doe', role: 'User' },
        { email: 'john@example.com', password: 'john123', name: 'John', role: 'User' },
        { email: 'demo@bat.com', password: 'demo123', name: 'Demo User', role: 'User' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);
        setError('');

        // Static authentication
        setTimeout(() => {
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Store user session
                localStorage.setItem('userToken', 'user-token-123');
                localStorage.setItem('userEmail', user.email);
                localStorage.setItem('userName', user.name);
                localStorage.setItem('userRole', user.role);
                localStorage.setItem('isUserLoggedIn', 'true');
                
                // Redirect to home page
                navigate('/home');
            } else {
                setError('Invalid email or password');
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image Section (Desktop) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-purple-900 via-pink-800 to-orange-900 overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Learning Community"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            {/* Right Side - Login Form (Desktop) / Full Screen on Mobile with Background */}
            <div className="w-full lg:w-1/2 flex items-center bg-black justify-center p-8 relative">
                {/* Mobile Background Image */}
                <div className="lg:hidden absolute inset-0">
                    <div className="absolute inset-0  z-10"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Learning Community"
                        className="w-full h-full object-cover "
                    />
                </div>

                <div className="relative z-10 max-w-md w-full">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-2xl shadow-lg mb-4">
                            <Sparkles className="w-8 h-8 text-pink-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">INSTA STYLE LMS</h1>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white/20 backdrop-blur rounded-2xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur  shadow-lg rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="w-8 h-8 text-pink-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Welcome Back!</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 animate-shake">
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                    <span className="text-sm text-red-600">{error}</span>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-white" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition  placeholder:text-gray-400"
                                        placeholder="your@email.com"
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
                                        className="block w-full pl-10 pr-10 py-3 border text-white placeholder:text-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
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
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
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

export default UserLogin;