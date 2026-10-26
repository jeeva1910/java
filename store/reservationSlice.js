import { createSlice } from '@reduxjs/toolkit';

const initialReservations = [
  {
    id: 'res_1',
    bookId: 'b4',
    bookTitle: 'Feynman Lectures on Physics',
    userId: 'u2',
    userName: 'Alex Johnson',
    reservationDate: '2026-10-18',
    status: 'QUEUED', // QUEUED, FULFILLED, CANCELLED
    queuePosition: 1,
  },
];

const initialState = {
  reservations: initialReservations,
};

export const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    createReservation: (state, action) => {
      const { bookId, bookTitle, userId, userName } = action.payload;
      const existingForBook = state.reservations.filter((r) => r.bookId === bookId && r.status === 'QUEUED');
      const newReservation = {
        id: 'res_' + Date.now(),
        bookId,
        bookTitle,
        userId,
        userName,
        reservationDate: new Date().toISOString().split('T')[0],
        status: 'QUEUED',
        queuePosition: existingForBook.length + 1,
      };
      state.reservations.push(newReservation);
    },
    cancelReservation: (state, action) => {
      const resId = action.payload;
      const res = state.reservations.find((r) => r.id === resId);
      if (res) {
        res.status = 'CANCELLED';
      }
    },
    fulfillReservation: (state, action) => {
      const resId = action.payload;
      const res = state.reservations.find((r) => r.id === resId);
      if (res) {
        res.status = 'FULFILLED';
      }
    },
  },
});

export const { createReservation, cancelReservation, fulfillReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
