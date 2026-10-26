import { createSlice } from '@reduxjs/toolkit';

const initialFines = [
  {
    id: 'fine_1',
    userId: 'u2',
    userName: 'Alex Johnson',
    bookTitle: 'Introduction to Algorithms',
    amount: 10.00,
    daysOverdue: 5,
    status: 'PENDING', // PENDING, PAID
    issuedDate: '2026-10-16',
    settledDate: null,
  },
];

const initialState = {
  fines: initialFines,
  fineRatePerDay: 2.00,
};

export const fineSlice = createSlice({
  name: 'fines',
  initialState,
  reducers: {
    payFine: (state, action) => {
      const fineId = action.payload;
      const fine = state.fines.find((f) => f.id === fineId);
      if (fine) {
        fine.status = 'PAID';
        fine.settledDate = new Date().toISOString().split('T')[0];
      }
    },
    issueFine: (state, action) => {
      const { userId, userName, bookTitle, daysOverdue } = action.payload;
      const amount = daysOverdue * state.fineRatePerDay;
      const newFine = {
        id: 'fine_' + Date.now(),
        userId,
        userName,
        bookTitle,
        amount,
        daysOverdue,
        status: 'PENDING',
        issuedDate: new Date().toISOString().split('T')[0],
        settledDate: null,
      };
      state.fines.push(newFine);
    },
  },
});

export const { payFine, issueFine } = fineSlice.actions;
export default fineSlice.reducer;
