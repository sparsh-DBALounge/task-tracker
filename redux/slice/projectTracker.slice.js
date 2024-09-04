import { createSlice } from '@reduxjs/toolkit';

export const projectTrackerSlice = createSlice({
  name: 'projectTracker',
  initialState: {
    assignedProjects: [],
  },
  reducers: {
    setAssignedProjects: (state, action) => {
      state.assignedProjects = action.payload;
    },
    deleteAssignedProject: (state, action) => {
      state.assignedProjects = state.assignedProjects.filter(
        (ap) => ap.id !== action.payload
      );
    },
    addAssignProject: (state, action) => {
      state.assignedProjects = [...state.assignedProjects, action.payload];
    },
    updateAssignedProject: (state, action) => {
      console.log(action.payload);
      state.assignedProjects = state.assignedProjects.map((project) =>
        project.id === action.payload.id ? action.payload.reduxData : project
      );
    },
  },
});

export const {
  setAssignedProjects,
  deleteAssignedProject,
  addAssignProject,
  updateAssignedProject,
} = projectTrackerSlice.actions;
export default projectTrackerSlice.reducer;
