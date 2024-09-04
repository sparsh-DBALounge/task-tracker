import { createSlice } from '@reduxjs/toolkit';

export const roleSlice = createSlice({
  name: 'role',
  initialState: {
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    deleteRole: (state, action) => {
      state.roles = state.roles.filter((role) => role.id !== action.payload);
    },
    addRole: (state, action) => {
      state.roles = [...state.roles, action.payload];
    },
    updateRole: (state, action) => {
      state.roles = state.roles.map((role) =>
        role.id === action.payload.id
          ? { ...role, ...action.payload.updatedRole }
          : role
      );
    },
  },
});

export const { setRoles, deleteRole, addRole, updateRole } = roleSlice.actions;
export default roleSlice.reducer;
