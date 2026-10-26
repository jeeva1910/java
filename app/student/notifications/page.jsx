'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead, markAllAsRead } from '@/store/notificationSlice';
import Sidebar from '@/components/Sidebar';
import { Bell, CheckCheck } from 'lucide-react';

export default function StudentNotificationsPage() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-950">Notifications & Announcements</h1>
            <p className="text-gray-600 mt-1">Stay updated with due date alerts, reservation updates, and announcements.</p>
          </div>
          <button
            onClick={() => dispatch(markAllAsRead())}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm flex items-center space-x-2"
          >
            <CheckCheck className="h-4 w-4" />
            <span>Mark All as Read</span>
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => dispatch(markAsRead(n.id))}
              className={`bg-white p-6 rounded-2xl border shadow-sm cursor-pointer transition-all hover:shadow-md ${n.read ? 'border-gray-200' : 'border-primary-300 bg-blue-50/20'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${n.read ? 'bg-gray-300' : 'bg-primary-600'}`} />
                  <h3 className="font-bold text-gray-900 text-base">{n.title}</h3>
                </div>
                <span className="text-xs text-gray-400 font-medium">{n.date}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pl-4">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
