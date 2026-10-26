'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { BookOpen, User, Mail, Lock, GraduationCap, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [studentId, setStudentId] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      id: 'u_' + Date.now(),
      name,
      email,
      role: 'STUDENT',
      department,
      studentId: studentId || 'ST2026' + Math.floor(100 + Math.random() * 900),
    };
    dispatch(loginSuccess({ user: newUser, token: 'student-jwt-token-xyz' }));
    router.push('/student/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="text-center">
          <div className="bg-primary-600 text-white p-3 rounded-xl w-12 h-12 mx-auto flex items-center justify-center mb-4">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Student Account Registration</h2>
          <p className="text-sm text-gray-500 mt-1">Register for library borrowing, reservations, and digital resources</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Alex Johnson"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student ID / Roll Number</label>
            <input
              type="text"
              required
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="CS2026001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">College Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="alex@college.edu"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
            </select>
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

          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg text-sm transition-colors shadow-sm flex items-center justify-center space-x-2 mt-4"
          >
            <span>Complete Registration</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
          Already have an account?{' '}
          <a href="/login" className="text-primary-600 font-semibold hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
