'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { returnBook } from '@/store/borrowingSlice';
import { adjustInventory } from '@/store/bookSlice';
import Sidebar from '@/components/Sidebar';
import { ArrowRightLeft, CheckCircle } from 'lucide-react';

export default function AdminCirculationPage() {
  const dispatch = useDispatch();
  const borrowings = useSelector((state) => state.borrowings.borrowings);

  const handleReturn = (borrowingId, bookId) => {
    dispatch(returnBook(borrowingId));
    dispatch(adjustInventory({ id: bookId, quantityChange: 1 }));
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Circulation Desk & Issue/Return</h1>
          <p className="text-gray-600 mt-1">Process manual book issues, returns, and inventory restoration.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-900">All Library Borrowings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Book Title</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Borrow Date</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
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
                    <td className="px-4 py-3">
                      {b.status === 'ACTIVE' && (
                        <button
                          onClick={() => handleReturn(b.id, b.bookId)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-1.5 rounded-lg text-xs transition-colors shadow-sm"
                        >
                          Process Return
                        </button>
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
