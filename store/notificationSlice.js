import { createSlice } from '@reduxjs/toolkit';

const initialNotifications = [
  {
    id: 'notif_1',
    title: 'Welcome to Digital Library System',
    message: 'Explore our vast collection of engineering and science books, research journals, and digital learning resources.',
    date: '2026-10-15',
    read: false,
    type: 'ANNOUNCEMENT',
  },
  {
    id: 'notif_2',
    title: 'Due Date Reminder',
    message: 'Your borrowed book "Introduction to Algorithms" is due on 2026-10-15.',
    date: '2026-10-12',
    read: true,
    type: 'REMINDER',
  },
];

const initialState = {
  notifications: initialNotifications,
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const notif = state.notifications.find((n) => n.id === action.payload);
      if (notif) {
        notif.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
    },
    addNotification: (state, action) => {
      const newNotif = {
        id: 'notif_' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        read: false,
        ...action.payload,
      };
      state.notifications.unshift(newNotif);
    },
  },
});

export const { markAsRead, markAllAsRead, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
