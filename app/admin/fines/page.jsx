'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { payFine } from '@/store/fineSlice';
import Sidebar from '@/components/Sidebar';
import { DollarSign } from 'lucide-react';

export default function AdminFinesPage() {
  const dispatch = useDispatch();
  const fines = useSelector((state) => state.fines.fines);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Fine Collection Ledger</h1>
          <p className="text-gray-600 mt-1">Track overdue fine rates ($2/day), settlements, and payment balances.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Book Title</th>
                  <th className="px-4 py-3">Days Overdue</th>
                  <th className="px-4 py-3">Amount ($)</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fines.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{f.userName}</td>
                    <td className="px-4 py-3 text-gray-600">{f.bookTitle}</td>
                    <td className="px-4 py-3 text-gray-600">{f.daysOverdue} days</td>
                    <td className="px-4 py-3 font-bold text-gray-900">${f.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${f.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {f.status === 'PENDING' && (
                        <button
                          onClick={() => dispatch(payFine(f.id))}
                          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors shadow-sm"
                        >
                          Mark as Settled
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
