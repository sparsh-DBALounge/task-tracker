import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRolesAsync = createAsyncThunk('role/fetchRoles', async () => {
  const response = await axios.get('http://localhost:3000/role');
  return response.data;
});

export const addRoleAsync = createAsyncThunk('role/addRole', async (role) => {
  await axios.post('http://localhost:3000/role', role);
  return role;
});

export const updateRoleAsync = createAsyncThunk(
  'role/updateRole',
  async ({ id, updatedRole }) => {
    console.log(id, updatedRole);
    await axios.put(`http://localhost:3000/role/${id}`, updatedRole);
    return { id, updatedRole };
  }
);

export const deleteRoleAsync = createAsyncThunk(
  'role/deleteRole',
  async (roleId) => {
    await axios.delete(`http://localhost:3000/role/${roleId}`);
    return roleId;
  }
);

export const roleSlice = createSlice({
  name: 'role',
  initialState: {
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRolesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRolesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRolesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRoleAsync.fulfilled, (state, action) => {
        state.roles = [...state.roles, action.payload];
      })
      .addCase(updateRoleAsync.fulfilled, (state, action) => {
        state.roles = state.roles.map((role) =>
          role.id === action.payload.id
            ? { ...role, ...action.payload.updatedRole }
            : role
        );
      })
      .addCase(deleteRoleAsync.fulfilled, (state, action) => {
        state.roles = state.roles.filter((role) => role.id !== action.payload);
      });
  },
});

export default roleSlice.reducer;
