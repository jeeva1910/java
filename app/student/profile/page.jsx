'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '@/store/authSlice';
import Sidebar from '@/components/Sidebar';
import { User, Mail, GraduationCap, Lock, Check } from 'lucide-react';

export default function StudentProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState(user?.name || '');
  const [department, setDepartment] = useState(user?.department || 'Computer Science');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, department }));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Student Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account information and preferences.</p>
        </div>

        {success && (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm font-medium border border-emerald-200 flex items-center space-x-2">
            <Check className="h-4 w-4" />
            <span>Profile successfully updated!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="pl-10 w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-500 cursor-not-allowed"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <input
                type="text"
                disabled
                value={user?.studentId || 'CS2026001'}
                className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
