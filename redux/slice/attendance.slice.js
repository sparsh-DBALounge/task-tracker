import { createSlice } from '@reduxjs/toolkit';

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    employeeAttendance: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEmployeeAttendance: (state, action) => {
      state.employeeAttendance = action.payload;
    },
    updateAttendance: (state, action) => {
      state.employeeAttendance = state.employeeAttendance.map((record) =>
        record.date === action.payload.date ? action.payload : record
      );
    },
  },
});

export const { setEmployeeAttendance, updateAttendance } =
  attendanceSlice.actions;
export default attendanceSlice.reducer;
