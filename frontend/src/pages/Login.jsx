import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [userType, setUserType] = useState('user');
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleUserTypeChange = (type) => {
    setUserType(type);
    if (type === 'admin') setAuthMode('login');
  };

  return (
    <div>
      <h1 className="text-4xl text-center mt-10 mb-4">monarch</h1>
      <div className="flex justify-center mt-10">
        <div className="w-125 min-h-125 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="px-8 py-8 text-center" style={{ backgroundColor: '#03A07B' }}>
            <h2 className="text-3xl font-bold text-white mb-2">
              {userType === 'admin' ? 'Admin Portal' : (authMode === 'login' ? 'Welcome Back' : 'Join Us')}
            </h2>
            <p className="text-sm" style={{ color: '#E6FEF2' }}>
              {userType === 'admin'
                ? 'Enter your credentials to manage schedules'
                : (authMode === 'login' ? 'Sign in to access your schedule' : 'Create an account to get started')}
            </p>
          </div>

          {/* User/Admin Toggle */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => handleUserTypeChange('user')}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300
                ${userType === 'user' ? 'bg-white border-b-2 border-green-600 text-green-600' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
            >
              <User size={18} /> User
            </button>
            <button
              onClick={() => handleUserTypeChange('admin')}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300
                ${userType === 'admin' ? 'bg-white border-b-2 border-green-600 text-green-600' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
            >
              <Lock size={18} /> Admin
            </button>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            <div className="space-y-4">

              {/* Username (signup only) */}
              {authMode === 'signup' && (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Full Name / Username"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  />
                </div>
              )}

              {/* Email */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={userType === 'admin' ? 'Admin ID' : 'Email Address'}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

            {/* Create account / Forgot password */}
            <div className="flex items-center justify-between text-sm">
              {userType === 'user' && (
                <button
                  onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setError(''); }}
                  className="font-medium text-green-500 hover:text-green-700 transition-colors"
                >
                  {authMode === 'login' ? 'Create account' : 'Already have an account?'}
                </button>
              )}
              <a href="#" className="font-medium text-gray-500 hover:text-green-700 transition-colors ml-auto">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              className="w-full py-3.5 px-4 text-sm font-semibold rounded-xl text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#04CD69' }}
            >
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-center">
            <p className="text-xs text-gray-500 text-center">Monarch Scheduling Portal</p>
          </div>

        </div>
      </div>
    </div>
  );
}