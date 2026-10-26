import { createSlice } from '@reduxjs/toolkit';

const initialResources = [
  {
    id: 'res_src_1',
    title: 'ACM Digital Library',
    description: 'Premier collection of computer science journals, conference proceedings, and SIGGRAPH publications.',
    url: 'https://dl.acm.org',
    category: 'Computer Science',
    type: 'Research Database',
  },
  {
    id: 'res_src_2',
    title: 'IEEE Xplore Digital Library',
    description: 'Access to electrical engineering, electronics, computer science, and allied technical literature.',
    url: 'https://ieeexplore.ieee.org',
    category: 'Electronics',
    type: 'Journals & Standards',
  },
  {
    id: 'res_src_3',
    title: 'MIT OpenCourseWare',
    description: 'Free lecture notes, exams, and videos from MIT undergraduate and graduate courses across all disciplines.',
    url: 'https://ocw.mit.edu',
    category: 'General Engineering',
    type: 'Open Courseware',
  },
  {
    id: 'res_src_4',
    title: 'Springer Link e-Books & Journals',
    description: 'Comprehensive repository of scientific, technical, and medical books, reference works, and protocols.',
    url: 'https://link.springer.com',
    category: 'Mathematics & Physics',
    type: 'E-Books Collection',
  },
];

const initialState = {
  resources: initialResources,
};

export const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    addResource: (state, action) => {
      const newRes = { id: 'r_' + Date.now(), ...action.payload };
      state.resources.unshift(newRes);
    },
    updateResource: (state, action) => {
      const index = state.resources.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.resources[index] = { ...state.resources[index], ...action.payload };
      }
    },
    deleteResource: (state, action) => {
      state.resources = state.resources.filter((r) => r.id !== action.payload);
    },
  },
});

export const { addResource, updateResource, deleteResource } = resourceSlice.actions;
export default resourceSlice.reducer;
