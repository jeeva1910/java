'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginStart, loginFailure } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { BookOpen, Shield, GraduationCap, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('student@college.edu');
  const [password, setPassword] = useState('student123');
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // Simulated secure authentication
    setTimeout(() => {
      if (email === 'admin@college.edu') {
        const adminUser = { id: 'u1', name: 'Dr. Jane Smith', email: 'admin@college.edu', role: 'ADMIN', department: 'Library Administration' };
        dispatch(loginSuccess({ user: adminUser, token: 'admin-jwt-token-xyz' }));
        router.push('/admin/dashboard');
      } else {
        const studentUser = { id: 'u2', name: 'Alex Johnson', email: email, role: 'STUDENT', department: 'Computer Science', studentId: 'CS2026001' };
        dispatch(loginSuccess({ user: studentUser, token: 'student-jwt-token-xyz' }));
        router.push('/student/dashboard');
      }
    }, 500);
  };

  const fillDemo = (role) => {
    if (role === 'admin') {
      setEmail('admin@college.edu');
      setPassword('admin123');
    } else {
      setEmail('student@college.edu');
      setPassword('student123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="text-center">
          <div className="bg-primary-600 text-white p-3 rounded-xl w-12 h-12 mx-auto flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Sign in to Apex Library</h2>
          <p className="text-sm text-gray-500 mt-1">Access your student portal or administration dashboard</p>
        </div>

        {/* Demo Quick Fill */}
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex justify-between items-center text-xs">
          <span className="text-blue-800 font-medium">Quick Demo Accounts:</span>
          <div className="space-x-2">
            <button type="button" onClick={() => fillDemo('student')} className="bg-blue-600 text-white px-2.5 py-1 rounded font-semibold hover:bg-blue-700">
              Student
            </button>
            <button type="button" onClick={() => fillDemo('admin')} className="bg-purple-600 text-white px-2.5 py-1 rounded font-semibold hover:bg-purple-700">
              Admin
            </button>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{error}</div>}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="name@college.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg text-sm transition-colors shadow-sm flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
          Don't have an account?{' '}
          <a href="/register" className="text-primary-600 font-semibold hover:underline">
            Register as Student
          </a>
        </div>
      </div>
    </div>
  );
}
