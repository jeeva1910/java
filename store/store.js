import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import bookReducer from './bookSlice';
import borrowingReducer from './borrowingSlice';
import reservationReducer from './reservationSlice';
import fineReducer from './fineSlice';
import resourceReducer from './resourceSlice';
import notificationReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    borrowings: borrowingReducer,
    reservations: reservationReducer,
    fines: fineReducer,
    resources: resourceReducer,
    notifications: notificationReducer,
  },
});
