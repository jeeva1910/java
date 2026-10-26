'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { payFine } from '@/store/fineSlice';
import Sidebar from '@/components/Sidebar';
import { DollarSign, CheckCircle } from 'lucide-react';

export default function StudentFinesPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const fines = useSelector((state) => state.fines.fines).filter((f) => f.userId === (user?.id || 'u2'));
  const [successMsg, setSuccessMsg] = useState(null);

  const handlePay = (fineId) => {
    dispatch(payFine(fineId));
    setSuccessMsg('Fine successfully settled via simulated payment gateway.');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Fines & Payments</h1>
          <p className="text-gray-600 mt-1">Review overdue fine rates ($2/day) and settle outstanding balances.</p>
        </div>

        {successMsg && (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm font-medium border border-emerald-200">
            {successMsg}
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Fine Ledger</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Book Title</th>
                  <th className="px-4 py-3">Days Overdue</th>
                  <th className="px-4 py-3">Amount ($)</th>
                  <th className="px-4 py-3">Issued Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fines.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{f.bookTitle}</td>
                    <td className="px-4 py-3 text-gray-600">{f.daysOverdue} days</td>
                    <td className="px-4 py-3 font-bold text-gray-900">${f.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-600">{f.issuedDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${f.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {f.status === 'PENDING' && (
                        <button
                          onClick={() => handlePay(f.id)}
                          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-1.5 rounded-lg text-xs transition-colors shadow-sm"
                        >
                          Pay Fine ($2/day rate)
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
