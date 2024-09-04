const BASE_URL = 'http://localhost:3000';

const API = {
  // Employee
  fetchEmployees: () => BASE_URL + '/employee',
  updateEmployee: (id) => BASE_URL + '/employee/' + `${id}`,
  deleteEmployee: (id) => BASE_URL + '/employee/' + `${id}`,
  EmployeeById: (id) => BASE_URL + '/employee/' + `${id}`,

  //   Project
  fetchProjects: () => BASE_URL + '/project',
  addProject: () => BASE_URL + '/project',
  updateProject: (id) => BASE_URL + '/project/' + `${id}`,
  deleteProject: (id) => BASE_URL + '/project/' + `${id}`,
  projectById: (id) => BASE_URL + '/project/' + `${id}`,

  // Assigned-Projects
  getAssignedProjects: (id) => BASE_URL + '/assignProject',
  addAssignedProjects: (id) => BASE_URL + '/assignProject',
  deleteAssignedProject: (id) => BASE_URL + '/assignProject/' + `${id}`,
  updateAssignedProject: (id) => BASE_URL + '/assignProject/' + `${id}`,

  //   Role
  fetchRoles: () => BASE_URL + '/role',
  addRole: () => BASE_URL + '/role',
  updateRole: (id) => BASE_URL + '/role/' + `${id}`,
  deleteRole: (id) => BASE_URL + '/role/' + `${id}`,

  //   Task
  fetchTasks: () => BASE_URL + '/task',
  addTask: () => BASE_URL + '/task',
  updateTask: (id) => BASE_URL + '/task/' + `${id}`,
  deleteTask: (id) => BASE_URL + '/task/' + `${id}`,

  //   Attendance
  fetchEmployeeAttendance: (id) => BASE_URL + '/employeeAttendance/' + `${id}`,
  addAttendace: () => BASE_URL + '/employeeAttendance',
  updateAttendanceRecord: (id) => BASE_URL + '/employeeAttendance/' + `${id}`,
};

export default API;
