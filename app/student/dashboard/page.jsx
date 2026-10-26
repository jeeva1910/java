'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { BookOpen, Clock, BookMarked, DollarSign, Bell, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

export default function StudentDashboard() {
  const user = useSelector((state) => state.auth.user);
  const borrowings = useSelector((state) => state.borrowings.borrowings).filter((b) => b.userId === (user?.id || 'u2'));
  const activeBorrowings = borrowings.filter((b) => b.status === 'ACTIVE');
  const reservations = useSelector((state) => state.reservations.reservations).filter((r) => r.userId === (user?.id || 'u2') && r.status === 'QUEUED');
  const fines = useSelector((state) => state.fines.fines).filter((f) => f.userId === (user?.id || 'u2') && f.status === 'PENDING');
  const notifications = useSelector((state) => state.notifications.notifications);

  const totalFinesAmount = fines.reduce((acc, f) => acc + f.amount, 0);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name || 'Alex Johnson'} ({user?.department || 'Computer Science'})</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                <Clock className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Active</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{activeBorrowings.length}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Books Borrowed</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-50 text-purple-600 p-3 rounded-xl">
                <BookMarked className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800">Queue</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{reservations.length}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Active Reservations</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-amber-50 text-amber-600 p-3 rounded-xl">
                <DollarSign className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Overdue</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">${totalFinesAmount.toFixed(2)}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Pending Fines</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
                <Bell className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Updates</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{notifications.filter(n => !n.read).length}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Unread Notifications</p>
          </div>
        </div>

        {/* Active Borrowings Table */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Current Borrowings</h2>
            <Link href="/student/borrowings" className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {activeBorrowings.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">You have no active borrowings currently.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Book Title</th>
                    <th className="px-4 py-3">Borrowed Date</th>
                    <th className="px-4 py-3">Due Date</th>
                    <th className="px-4 py-3">Renewals</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeBorrowings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{b.bookTitle}</td>
                      <td className="px-4 py-3 text-gray-600">{b.borrowDate}</td>
                      <td className="px-4 py-3 text-gray-600">{b.dueDate}</td>
                      <td className="px-4 py-3 text-gray-600">{b.renewCount} / 2</td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs font-semibold">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
