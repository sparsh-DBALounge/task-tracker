import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employee: {},
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },

    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
    updateEmployee: (state, action) => {
      state.employees = state.employees.map((employee) =>
        employee.id === action.payload.id ? action.payload.data : employee
      );
    },
  },
});

export const { setEmployees, setEmployee, deleteEmployee, updateEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
