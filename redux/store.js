import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import employeeSlice from './slice/employee.slice';
import authSlice from './slice/auth.slice';
import projectSlice from './slice/project.slice';
import projectTrackerSlice from './slice/projectTracker.slice';
import roleSlice from './slice/role.slice';
import taskSlice from './slice/task.slice';
import taskTrackerSlice from './slice/taskTracker.slice';
import attendanceSlice from './slice/attendance.slice';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  employeeSlice,
  authSlice,
  projectSlice,
  projectTrackerSlice,
  roleSlice,
  taskSlice,
  taskTrackerSlice,
  attendanceSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
