'use client';

import { useDispatch } from 'react-redux';
import { setUser, logoutUser } from '@/redux/slice/auth.slice';
import {
  setProjects,
  setProject,
  updateProjects,
  deleteProject,
  addProject,
} from '@/redux/slice/project.slice';

import {
  setEmployees,
  setEmployee,
  deleteEmployee,
  updateEmployee,
} from '@/redux/slice/employee.slice';

import {
  setTasks,
  deleteTask,
  addTask,
  updateTask,
} from '@/redux/slice/task.slice';

import {
  setRoles,
  deleteRole,
  addRole,
  updateRole,
} from '@/redux/slice/role.slice';

import {
  setEmployeeAttendance,
  updateAttendance,
} from '@/redux/slice/attendance.slice';

const useActionDispatch = () => {
  const dispatch = useDispatch();

  return {
    // Auth
    setUser: (payload) => dispatch(setUser(payload)),
    logoutUser: () => dispatch(logoutUser()),

    // Employee
    setEmployees: (payload) => dispatch(setEmployees(payload)),
    setEmployee: (payload) => dispatch(setEmployee(payload)),
    deleteEmployee: (payload) => dispatch(deleteEmployee(payload)),
    updateEmployee: (payload) => dispatch(updateEmployee(payload)),

    // Project
    setProjects: (payload) => dispatch(setProjects(payload)),
    setProject: (payload) => dispatch(setProject(payload)),
    updateProjects: (payload) => dispatch(updateProjects(payload)),
    deleteProject: (payload) => dispatch(deleteProject(payload)),
    addProject: (payload) => dispatch(addProject(payload)),

    // Tasks
    setTasks: (payload) => dispatch(setTasks(payload)),
    deleteTask: (payload) => dispatch(deleteTask(payload)),
    addTask: (payload) => dispatch(addTask(payload)),
    updateTask: (payload) => dispatch(updateTask(payload)),

    // Roles
    setRoles: (payload) => dispatch(setRoles(payload)),
    deleteRole: (payload) => dispatch(deleteRole(payload)),
    addRole: (payload) => dispatch(addRole(payload)),
    updateRole: (payload) => dispatch(updateRole(payload)),

    // Attendance
    setEmployeeAttendance: (payload) =>
      dispatch(setEmployeeAttendance(payload)),
    updateAttendance: (payload) => dispatch(updateAttendance(payload)),
  };
};

export default useActionDispatch;
