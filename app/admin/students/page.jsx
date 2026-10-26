'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Users } from 'lucide-react';

export default function AdminStudentsPage() {
  const students = [
    { id: 'u2', name: 'Alex Johnson', email: 'student@college.edu', department: 'Computer Science', studentId: 'CS2026001', status: 'ACTIVE' },
    { id: 'u3', name: 'Sarah Connor', email: 'sarah@college.edu', department: 'Electronics', studentId: 'EC2026042', status: 'ACTIVE' },
    { id: 'u4', name: 'Michael Vance', email: 'michael@college.edu', department: 'Mechanical Engineering', studentId: 'ME2026109', status: 'ACTIVE' },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Student Directory</h1>
          <p className="text-gray-600 mt-1">Manage registered student library accounts and borrowing privileges.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Student ID</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{s.name}</td>
                    <td className="px-4 py-3 text-gray-600">{s.studentId}</td>
                    <td className="px-4 py-3 text-gray-600">{s.email}</td>
                    <td className="px-4 py-3 text-gray-600">{s.department}</td>
                    <td className="px-4 py-3">
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {s.status}
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
