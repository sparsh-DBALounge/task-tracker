export const selectTaskSummary = (state) => ({
  totalTasks: state.taskSlice?.tasks?.length || 0,
});

export const selectEmployeeSummary = (state) => ({
  totalEmployees: state.employeeSlice?.employees?.length || 0,
});

export const selectProjectSummary = (state) => ({
  totalProject: state.projectSlice?.projects?.length || 0,
});
