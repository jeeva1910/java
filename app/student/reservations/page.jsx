'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancelReservation } from '@/store/reservationSlice';
import Sidebar from '@/components/Sidebar';
import { BookMarked, XCircle } from 'lucide-react';

export default function StudentReservationsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const reservations = useSelector((state) => state.reservations.reservations).filter((r) => r.userId === (user?.id || 'u2'));

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Book Reservations Queue</h1>
          <p className="text-gray-600 mt-1">Track your reservation queue status and cancellation options.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Your Reservations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Book Title</th>
                  <th className="px-4 py-3">Reservation Date</th>
                  <th className="px-4 py-3">Queue Position</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reservations.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{r.bookTitle}</td>
                    <td className="px-4 py-3 text-gray-600">{r.reservationDate}</td>
                    <td className="px-4 py-3 text-gray-600">#{r.queuePosition}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${r.status === 'QUEUED' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {r.status === 'QUEUED' && (
                        <button
                          onClick={() => dispatch(cancelReservation(r.id))}
                          className="bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Cancel
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
