import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchAssignedProjectsAsync = createAsyncThunk(
  'projectTracker/fetchAssignedProjects',
  async () => {
    const response = await axios.get('http://localhost:3000/assignProject');
    return response.data;
  }
);

export const updateAssignedProjectAsync = createAsyncThunk(
  'projectTracker/updateAssignedProject',
  async ({ id, dbData, reduxData }) => {
    await axios.put(`http://localhost:3000/assignProject/${id}`, dbData);
    toast.success('Details Updated');
    return { id, reduxData };
  }
);

export const deleteAssignedProjectAsync = createAsyncThunk(
  'projectTracker/deleteAssignedProject',
  async (id) => {
    await axios.delete(`http://localhost:3000/assignProject/${id}`);
    return id;
  }
);

export const assignProjectAsync = createAsyncThunk(
  'project/assignProject',
  async ({ dbData, reduxData }) => {
    await axios.post('http://localhost:3000/assignProject', dbData);
    toast.success('Project Assigned');
    return reduxData;
  }
);

export const projectTrackerSlice = createSlice({
  name: 'projectTracker',
  initialState: {
    assignedProjects: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignedProjectsAsync.fulfilled, (state, action) => {
        state.assignedProjects = action.payload;
      })
      .addCase(updateAssignedProjectAsync.fulfilled, (state, action) => {
        state.assignedProjects = state.assignedProjects.map((project) =>
          project.employee_id === action.payload.id
            ? { ...project, ...action.payload.reduxData }
            : project
        );
      })
      .addCase(deleteAssignedProjectAsync.fulfilled, (state, action) => {
        state.assignedProjects = state.assignedProjects.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(assignProjectAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.assignedProjects = [...state.assignedProjects, action.payload];
      });
  },
});

export default projectTrackerSlice.reducer;
