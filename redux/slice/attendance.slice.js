import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchAttendanceAsync = createAsyncThunk(
  'attendance/fetchAttendance',
  async () => {
    const response = await axios.get(
      'http://localhost:3000/employeeAttendance'
    );
    return response.data;
  }
);

export const addAttendanceAsync = createAsyncThunk(
  'attendance/addAttendance',
  async (attendanceData) => {
    await axios.post(
      'http://localhost:3000/employeeAttendance',
      attendanceData
    );
    toast.success('Attendance Record Added ');
  }
);

export const fetchAttendanceById = createAsyncThunk(
  'attendance/fetchAttendacenById',
  async (id) => {
    const response = await axios.get(
      `http://localhost:3000/employeeAttendance/${id}`
    );
    return response.data;
  }
);

export const updateAttendance = createAsyncThunk(
  'attendance/updateAttendance',
  async ({ id, data }) => {
    await axios.put(`http://localhost:3000/employeeAttendance/${id}`, data);
    toast.success('Record Updated');
    return data;
  }
);

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    employeeAttendance: {},
    attendance: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAttendanceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload;
      })
      .addCase(fetchAttendanceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAttendanceAsync.fulfilled, (state, action) => {
        state.attendance = [...state.attendance, action.payload];
      })
      .addCase(fetchAttendanceById.fulfilled, (state, action) => {
        state.employeeAttendance = action.payload;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.employeeAttendance = state.employeeAttendance.map((record) =>
          record.date === action.payload.date ? action.payload : record
        );
      });
  },
});

export default attendanceSlice.reducer;
