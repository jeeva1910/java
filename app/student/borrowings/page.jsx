'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { renewBook, returnBook } from '@/store/borrowingSlice';
import Sidebar from '@/components/Sidebar';
import { Clock, RefreshCw, CheckCircle, ArrowRightLeft } from 'lucide-react';

export default function StudentBorrowingsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const borrowings = useSelector((state) => state.borrowings.borrowings).filter((b) => b.userId === (user?.id || 'u2'));

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">My Borrowings & History</h1>
          <p className="text-gray-600 mt-1">Manage active book loans, renewals (max 2), and view borrowing history.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-900">All Borrowing Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Book Title</th>
                  <th className="px-4 py-3">Borrowed</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Renewals</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {borrowings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{b.bookTitle}</td>
                    <td className="px-4 py-3 text-gray-600">{b.borrowDate}</td>
                    <td className="px-4 py-3 text-gray-600">{b.dueDate}</td>
                    <td className="px-4 py-3 text-gray-600">{b.renewCount} / 2</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${b.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      {b.status === 'ACTIVE' && (
                        <>
                          <button
                            onClick={() => dispatch(renewBook(b.id))}
                            disabled={b.renewCount >= 2}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${b.renewCount >= 2 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary-50 text-primary-700 hover:bg-primary-100'}`}
                          >
                            Renew (+7 Days)
                          </button>
                        </>
                      )}
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
