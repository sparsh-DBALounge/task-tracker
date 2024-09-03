import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchTaskTrackerAsync = createAsyncThunk(
  'taskTracker/fetchTaskTracker',
  async () => {
    const response = await axios.get('http://localhost:3000/taskTracker');
    return response.data;
  }
);

export const fetchTaskTrackerByIdAsync = createAsyncThunk(
  'taskTracker/fetchTaskById',
  async (id) => {
    const response = await axios.get(`http://localhost:3000/taskTracker/${id}`);
    return response.data;
  }
);

export const deleteTaskTrackerAsync = createAsyncThunk(
  'taskTracker/deleteTaskTracker',
  async (id) => {
    await axios.delete(`http://localhost:3000/taskTracker/${id}`);
    return id;
  }
);

export const updateTaskTrackerAsync = createAsyncThunk(
  'taskTracker/updateTaskTracker',
  async ({ id, dbData, reduxData }) => {
    await axios.put(`http://localhost:3000/taskTracker/${id}`, dbData);
    toast.success('Task Tracker Updated');
    return { id, dbData, reduxData };
  }
);

export const addNewTaskTrackerAsync = createAsyncThunk(
  'taskTracker/addNewTaskTracker',
  async ({ dbData, reduxData }) => {
    await axios.post('http://localhost:3000/taskTracker', dbData);
    toast.success('Task Tracker Assigned');
    return reduxData;
  }
);

export const taskTrackerSlice = createSlice({
  name: 'taskTracker',
  initialState: {
    taskTrackingDetails: {},
    taskTracker: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskTrackerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskTrackerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.taskTracker = action.payload;
      })
      .addCase(fetchTaskTrackerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTaskTrackerByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskTrackerByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.taskTrackingDetails = action.payload;
      })
      .addCase(fetchTaskTrackerByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewTaskTrackerAsync.fulfilled, (state, action) => {
        state.taskTracker = [...state.taskTracker, action.payload];
      })
      .addCase(deleteTaskTrackerAsync.fulfilled, (state, action) => {
        state.taskTracker = state.taskTracker.filter(
          (taskTracker) => taskTracker.id !== action.payload
        );
      })
      .addCase(updateTaskTrackerAsync.fulfilled, (state, action) => {
        state.taskTracker = state.taskTracker.map((taskTracker) =>
          taskTracker.id === action.payload.id
            ? { ...taskTracker, ...action.payload.reduxData }
            : taskTracker
        );
      });
  },
});

export default taskTrackerSlice.reducer;
