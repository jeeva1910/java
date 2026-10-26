import { createSlice } from '@reduxjs/toolkit';

const initialUsers = [
  { id: 'u1', name: 'Dr. Jane Smith', email: 'admin@college.edu', role: 'ADMIN', department: 'Library Administration' },
  { id: 'u2', name: 'Alex Johnson', email: 'student@college.edu', role: 'STUDENT', department: 'Computer Science', studentId: 'CS2026001' },
];

const initialState = {
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('library_user')) || initialUsers[1] : initialUsers[1],
  token: typeof window !== 'undefined' ? localStorage.getItem('library_token') || 'demo-jwt-token-123' : 'demo-jwt-token-123',
  isAuthenticated: true,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('library_user', JSON.stringify(action.payload.user));
        localStorage.setItem('library_token', action.payload.token);
      }
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('library_user');
        localStorage.removeItem('library_token');
      }
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      if (typeof window !== 'undefined') {
        localStorage.setItem('library_user', JSON.stringify(state.user));
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
