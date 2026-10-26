'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '@/components/Sidebar';
import { BookOpen, Users, Clock, DollarSign, BookMarked, TrendingUp, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const books = useSelector((state) => state.books.books);
  const borrowings = useSelector((state) => state.borrowings.borrowings);
  const reservations = useSelector((state) => state.reservations.reservations);
  const fines = useSelector((state) => state.fines.fines);

  const totalCopies = books.reduce((acc, b) => acc + b.totalCopies, 0);
  const availableCopies = books.reduce((acc, b) => acc + b.availableCopies, 0);
  const activeBorrowingsCount = borrowings.filter((b) => b.status === 'ACTIVE').length;
  const totalFinesCollected = fines.filter((f) => f.status === 'PAID').reduce((acc, f) => acc + f.amount, 0);
  const pendingFines = fines.filter((f) => f.status === 'PENDING').reduce((acc, f) => acc + f.amount, 0);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Head Librarian & Administrator Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time analytics, circulation metrics, inventory status, and financial ledgers.</p>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Inventory</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{totalCopies}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Total Book Copies ({availableCopies} available)</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-50 text-purple-600 p-3 rounded-xl">
                <Clock className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800">Circulation</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{activeBorrowingsCount}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Active Borrowings</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-amber-50 text-amber-600 p-3 rounded-xl">
                <BookMarked className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Queue</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{reservations.filter(r => r.status === 'QUEUED').length}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Queued Reservations</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
                <DollarSign className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Ledger</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">${totalFinesCollected.toFixed(2)}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Fines Collected (${pendingFines.toFixed(2)} pending)</p>
          </div>
        </div>

        {/* Recent Circulation Summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Recent System Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Book Title</th>
                  <th className="px-4 py-3">Borrower</th>
                  <th className="px-4 py-3">Borrow Date</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {borrowings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{b.bookTitle}</td>
                    <td className="px-4 py-3 text-gray-600">{b.userName}</td>
                    <td className="px-4 py-3 text-gray-600">{b.borrowDate}</td>
                    <td className="px-4 py-3 text-gray-600">{b.dueDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${b.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
