'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { BookOpen, User, Bell, LogOut, Shield, GraduationCap, LayoutDashboard, Database } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notifications.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">Apex Library</span>
            </Link>
            <nav className="hidden md:flex space-x-6 ml-8">
              <Link href="/catalog" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                Book Catalog
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                Digital Resources
              </Link>
              {isAuthenticated && user?.role === 'STUDENT' && (
                <Link href="/student/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                  Student Portal
                </Link>
              )}
              {isAuthenticated && user?.role === 'ADMIN' && (
                <Link href="/admin/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                  Admin Dashboard
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href={user?.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'} className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors">
                  {user?.role === 'ADMIN' ? <Shield className="h-4 w-4 text-blue-600" /> : <GraduationCap className="h-4 w-4 text-emerald-600" />}
                  <span className="text-sm font-semibold text-gray-800">{user?.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-primary-100 text-primary-800 font-medium">{user?.role}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 text-sm">
                  Login
                </Link>
                <Link href="/register" className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
