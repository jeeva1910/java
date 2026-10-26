import { createSlice } from '@reduxjs/toolkit';

const initialBorrowings = [
  {
    id: 'bor_1',
    bookId: 'b1',
    bookTitle: 'Introduction to Algorithms',
    userId: 'u2',
    userName: 'Alex Johnson',
    borrowDate: '2026-10-01',
    dueDate: '2026-10-15',
    returnDate: null,
    status: 'ACTIVE', // ACTIVE, RETURNED, OVERDUE
    renewCount: 1,
  },
  {
    id: 'bor_2',
    bookId: 'b2',
    bookTitle: 'Digital Signal Processing: Principles and Applications',
    userId: 'u2',
    userName: 'Alex Johnson',
    borrowDate: '2026-09-10',
    dueDate: '2026-09-24',
    returnDate: '2026-09-22',
    status: 'RETURNED',
    renewCount: 0,
  },
];

const initialState = {
  borrowings: initialBorrowings,
  loading: false,
  error: null,
};

export const borrowingSlice = createSlice({
  name: 'borrowings',
  initialState,
  reducers: {
    issueBook: (state, action) => {
      const { bookId, bookTitle, userId, userName } = action.payload;
      const borrowDate = new Date().toISOString().split('T')[0];
      const dueDateObj = new Date();
      dueDateObj.setDate(dueDateObj.getDate() + 14);
      const dueDate = dueDateObj.toISOString().split('T')[0];

      const newBorrowing = {
        id: 'bor_' + Date.now(),
        bookId,
        bookTitle,
        userId,
        userName,
        borrowDate,
        dueDate,
        returnDate: null,
        status: 'ACTIVE',
        renewCount: 0,
      };
      state.borrowings.unshift(newBorrowing);
    },
    returnBook: (state, action) => {
      const borrowingId = action.payload;
      const borrowing = state.borrowings.find((b) => b.id === borrowingId);
      if (borrowing) {
        borrowing.status = 'RETURNED';
        borrowing.returnDate = new Date().toISOString().split('T')[0];
      }
    },
    renewBook: (state, action) => {
      const borrowingId = action.payload;
      const borrowing = state.borrowings.find((b) => b.id === borrowingId);
      if (borrowing && borrowing.renewCount < 2 && borrowing.status === 'ACTIVE') {
        borrowing.renewCount += 1;
        const currentDueDate = new Date(borrowing.dueDate);
        currentDueDate.setDate(currentDueDate.getDate() + 7);
        borrowing.dueDate = currentDueDate.toISOString().split('T')[0];
      }
    },
  },
});

export const { issueBook, returnBook, renewBook } = borrowingSlice.actions;
export default borrowingSlice.reducer;
