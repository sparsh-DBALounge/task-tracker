import pageRoutes from '@/utils/pageRoutes';

export const sidebarLinks = [
  {
    label: 'Dashboard',
    icon: '/dashboard.png',
    path: pageRoutes.DASHBOARD(),
    pathName: '/dashboard',
  },
  {
    label: 'Employee List',
    icon: '/employee-list.png',
    path: pageRoutes.EMPLOYEE_LIST(),
    pathName: '/dashboard/employee-list',
  },
  {
    label: 'Project',
    icon: '/project.png',
    path: pageRoutes.PROJECT(),
    pathName: '/dashboard/project',
  },
  {
    label: 'Project Tracker',
    icon: '/project.png',
    path: pageRoutes.PROJECT_TRACKER(),
    pathName: '/dashboard/project-tracker',
  },
  {
    label: 'Role',
    icon: '/role.png',
    path: pageRoutes.ROLE(),
    pathName: '/dashboard/role',
  },
  {
    label: 'Task List',
    icon: '/task-list.png',
    path: pageRoutes.TASK_LIST(),
    pathName: '/dashboard/task-list',
  },
  {
    label: 'Task Tracker',
    icon: '/task-tracker.png',
    path: pageRoutes.TASK_TRACKER(),
    pathName: '/dashboard/task-tracker',
  },

  {
    label: 'Attendance',
    icon: '/attendance.png',
    path: pageRoutes.ATTENDANCE(),
    pathName: '/dashboard/attendance',
  },
];
