import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchProjectsAsync = createAsyncThunk(
  'project/fetchProjects',
  async () => {
    const response = await axios.get('http://localhost:3000/project');
    return response.data;
  }
);

export const fetchProjectByIdAsync = createAsyncThunk(
  'project/fetchProject',
  async (id) => {
    const response = await axios.get(`http://localhost:3000/project/${id}`);
    return response.data;
  }
);

export const deleteProjectAsync = createAsyncThunk(
  'project/deleteProject',
  async (id) => {
    await axios.delete(`http://localhost:3000/project/${id}`);
    return id;
  }
);

export const addProjectAsync = createAsyncThunk(
  'project/addProject',
  async (projectDetails) => {
    await axios.post(`http://localhost:3000/project`, projectDetails);
    return projectDetails;
  }
);

export const updateProjectAsync = createAsyncThunk(
  'project/updateProject',
  async ({ id, updatedName }) => {
    await axios.put(`http://localhost:3000/project/${id}`, {
      project: updatedName,
    });
    return { id, updatedName };
  }
);

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    project: {},
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjectsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProjectByIdAsync.fulfilled, (state, action) => {
        state.project = action.payload;
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.projects = [...state.projects, action.payload];
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        state.projects = state.projects.map((project) =>
          project.id === action.payload.id
            ? { ...project, project: action.payload.updatedName }
            : project
        );
      });
  },
});

export default projectSlice.reducer;
