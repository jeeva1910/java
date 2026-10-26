import { createSlice } from '@reduxjs/toolkit';

const initialBooks = [
  {
    id: 'b1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen, Charles E. Leiserson',
    isbn: '9780262033848',
    category: 'Computer Science',
    totalCopies: 8,
    availableCopies: 5,
    description: 'The standard textbook on computer algorithms, covering sorting, graph algorithms, dynamic programming, and complexity theory.',
    publisher: 'MIT Press',
    publishYear: 2009,
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'b2',
    title: 'Digital Signal Processing: Principles and Applications',
    author: 'John G. Proakis, Dimitris G. Manolakis',
    isbn: '9780131873742',
    category: 'Electronics',
    totalCopies: 5,
    availableCopies: 2,
    description: 'A comprehensive treatment of digital signal processing algorithms, filter design, and hardware implementations.',
    publisher: 'Pearson',
    publishYear: 2006,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'b3',
    title: 'Engineering Mechanics: Statics and Dynamics',
    author: 'R.C. Hibbeler',
    isbn: '9780133915426',
    category: 'Mechanical Engineering',
    totalCopies: 6,
    availableCopies: 6,
    description: 'Fundamental principles of mechanics applied to engineering design, force vectors, equilibrium, and kinematics.',
    publisher: 'Pearson',
    publishYear: 2015,
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'b4',
    title: 'Feynman Lectures on Physics',
    author: 'Richard P. Feynman, Robert B. Leighton',
    isbn: '9780465023820',
    category: 'Physics',
    totalCopies: 4,
    availableCopies: 1,
    description: 'Legendary lectures covering mechanics, radiation, heat, quantum mechanics, and electromagnetism.',
    publisher: 'Basic Books',
    publishYear: 2011,
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'b5',
    title: 'Calculus and Analytic Geometry',
    author: 'George B. Thomas, Ross L. Finney',
    isbn: '9780201531749',
    category: 'Mathematics',
    totalCopies: 10,
    availableCopies: 8,
    description: 'Rigorous foundation in differential and integral calculus, vector analysis, and multi-variable mathematics.',
    publisher: 'Addison-Wesley',
    publishYear: 1996,
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'b6',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    isbn: '9780132350884',
    category: 'Computer Science',
    totalCopies: 7,
    availableCopies: 3,
    description: 'Best practices for writing maintainable, readable, and robust software code with refactoring guidelines.',
    publisher: 'Prentice Hall',
    publishYear: 2008,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
  },
];

const initialState = {
  books: initialBooks,
  selectedCategory: 'All',
  searchQuery: '',
  sortBy: 'title',
  loading: false,
  error: null,
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    addBook: (state, action) => {
      const newBook = { id: 'b_' + Date.now(), availableCopies: action.payload.totalCopies, ...action.payload };
      state.books.unshift(newBook);
    },
    updateBook: (state, action) => {
      const index = state.books.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = { ...state.books[index], ...action.payload };
      }
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((b) => b.id !== action.payload);
    },
    adjustInventory: (state, action) => {
      const { id, quantityChange } = action.payload;
      const book = state.books.find((b) => b.id === id);
      if (book) {
        book.availableCopies = Math.max(0, Math.min(book.totalCopies, book.availableCopies + quantityChange));
      }
    },
  },
});

export const { setCategory, setSearchQuery, setSortBy, addBook, updateBook, deleteBook, adjustInventory } = bookSlice.actions;
export default bookSlice.reducer;
