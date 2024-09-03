export const mapEmployeeNameToId = (employees, employeeName) => {
  const employee = employees.find((emp) => emp.employee_name === employeeName);
  return employee ? employee.id : null;
};
