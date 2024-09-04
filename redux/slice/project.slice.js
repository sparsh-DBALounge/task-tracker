import { createSlice } from '@reduxjs/toolkit';

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    project: {},
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    updateProjects: (state, action) => {
      state.projects = state.projects.map((project) =>
        project.id === action.payload.id
          ? { ...project, ...action.payload.data }
          : project
      );
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    addProject: (state, action) => {
      state.projects = [...state.projects, action.payload];
    },
    setProject: (state, action) => {
      state.project = action.payload;
    },
  },
});

export const {
  setProjects,
  setProject,
  updateProjects,
  deleteProject,
  addProject,
} = projectSlice.actions;
export default projectSlice.reducer;
