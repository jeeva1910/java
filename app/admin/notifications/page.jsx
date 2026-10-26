'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '@/store/notificationSlice';
import Sidebar from '@/components/Sidebar';
import { Bell, Send } from 'lucide-react';

export default function AdminNotificationsPage() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleBroadcast = (e) => {
    e.preventDefault();
    dispatch(addNotification({ title, message, type: 'ANNOUNCEMENT' }));
    setTitle('');
    setMessage('');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Broadcast Announcements</h1>
          <p className="text-gray-600 mt-1">Send library notifications and announcements to all registered students.</p>
        </div>

        <form onSubmit={handleBroadcast} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">New Broadcast Announcement</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Announcement Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              placeholder="Library Hours Update for Midterms"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message Content</label>
            <textarea
              rows="3"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              placeholder="The library will remain open 24/7 during midterm examination weeks..."
            />
          </div>
          <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm flex items-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Broadcast to All Students</span>
          </button>
        </form>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Announcements</h2>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 border border-gray-100 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 text-sm">{n.title}</h3>
                  <span className="text-xs text-gray-400">{n.date}</span>
                </div>
                <p className="text-xs text-gray-600">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
