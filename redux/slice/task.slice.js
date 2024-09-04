import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updatedTask }
          : task
      );
    },
  },
});

export const { setTasks, deleteTask, addTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
