import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCurrentDate } from '@/utils/getCurrentDate';

export const fetchTasksAsync = createAsyncThunk('task/fetchTasks', async () => {
  const response = await axios.get('http://localhost:3000/task');
  return response.data;
});

export const deleteTaskAsync = createAsyncThunk(
  'task/deleteTask',
  async (id) => {
    await axios.delete(`http://localhost:3000/task/${id}`);
    return id;
  }
);

export const updateTaskAsync = createAsyncThunk(
  'task/updateTask',
  async ({ id, updatedTask }, { rejectWithValue }) => {
    try {
      await axios.put(`http://localhost:3000/task/${id}`, updatedTask);
      return { id, updatedTask };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewTaskAsync = createAsyncThunk(
  'task/addTask',
  async (newTask) => {
    const reduxData = {
      ...newTask,
      created_at: getCurrentDate(),
    };
    await axios.post('http://localhost:3000/task', newTask);
    return reduxData;
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updatedTask }
            : task
        );
      })
      .addCase(addNewTaskAsync.fulfilled, (state, action) => {
        state.tasks = [...state.tasks, action.payload];
      });
  },
});

export default taskSlice.reducer;
