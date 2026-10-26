'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fulfillReservation } from '@/store/reservationSlice';
import Sidebar from '@/components/Sidebar';
import { BookMarked, Check } from 'lucide-react';

export default function AdminReservationsPage() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Reservation Queue Management</h1>
          <p className="text-gray-600 mt-1">Manage queued reservations and fulfill when copies become available.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Book Title</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Reservation Date</th>
                  <th className="px-4 py-3">Queue Position</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reservations.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{r.bookTitle}</td>
                    <td className="px-4 py-3 text-gray-600">{r.userName}</td>
                    <td className="px-4 py-3 text-gray-600">{r.reservationDate}</td>
                    <td className="px-4 py-3 text-gray-600">#{r.queuePosition}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${r.status === 'QUEUED' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {r.status === 'QUEUED' && (
                        <button
                          onClick={() => dispatch(fulfillReservation(r.id))}
                          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors shadow-sm"
                        >
                          Fulfill Reservation
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
