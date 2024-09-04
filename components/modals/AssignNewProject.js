import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { assignProjectAsync } from '@/redux/slice/projectTracker.slice';
import { mapEmployeeNameToId } from '@/utils/mapEmployeeNameToId';
import { mapProjectNameToId } from '@/utils/mapProjectNameToId';
import { mapRoleToId } from '@/utils/mapRoleToId';
import { fetchRolesAsync } from '@/redux/slice/role.slice';
import { useProjectHooks } from '@/hooks/useProjectHooks';
import { useEmployeeHooks } from '@/hooks/useEmployeeHooks';
import { useRoleHooks } from '@/hooks/useRoleHooks';

const AssignNewProject = ({
  openAssignProjectModal,
  setOpenAssignProjectModal,
}) => {
  const dispatch = useDispatch();
  const { fetchProjects } = useProjectHooks();
  const { fetchEmployees } = useEmployeeHooks();
  const { fetchRoles } = useRoleHooks();
  const { employees } = useSelector((state) => state.employeeSlice);
  const { projects } = useSelector((state) => state.projectSlice);
  const { roles } = useSelector((state) => state.roleSlice);
  const [isModalOpen, setIsModalOpen] = useState(openAssignProjectModal);
  const [employeeName, setEmployeeName] = useState(employees[0].employee_name);
  const [projectName, setProjectName] = useState(projects[0].project);
  const [role, setRole] = useState(roles[0].role);

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
    fetchRoles();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeId = mapEmployeeNameToId(employees, employeeName);
    const projectId = mapProjectNameToId(projects, projectName);
    const roleId = mapRoleToId(roles, role);

    const dbData = {
      employee_id: employeeId,
      project_id: projectId,
      role_id: roleId,
    };
    const reduxData = {
      employee_id: employeeId,
      project_id: projectId,
      role_id: roleId,
      employee_name: employeeName,
      project: projectName,
      role,
    };

    dispatch(assignProjectAsync({ dbData, reduxData }));
    setEmployeeName('');
    setProjectName('');
    setRole('');

    setIsModalOpen(false);
    setOpenAssignProjectModal(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenAssignProjectModal(false);
  };

  return (
    <Modal
      open={isModalOpen}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={handleCancel}
    >
      <form
        onSubmit={handleSubmit}
        className='mt-5 flex flex-col gap-3 text-lg'
      >
        <div>
          <p>
            Employee Name <span className='text-red-500'>*</span>{' '}
          </p>
          <select
            id='employee_name'
            required
            value={employeeName}
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
            onChange={(e) => {
              setEmployeeName(e.target.value);
            }}
          >
            {employees.map((employee) => (
              <option key={employee.id}>{employee.employee_name}</option>
            ))}
          </select>
        </div>

        <div>
          <p>
            Project Name <span className='text-red-500'>*</span>
          </p>
          <select
            id='employee_name'
            required
            value={projectName}
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          >
            {projects.map((project) => (
              <option key={project.id}>{project.project}</option>
            ))}
          </select>
        </div>

        <div>
          <p>
            Role <span className='text-red-500'>*</span>
          </p>
          <select
            id='role'
            required
            value={role}
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            {roles.map((role) => (
              <option key={role.id}>{role.role}</option>
            ))}
          </select>
        </div>

        <button className='mt-5 text-lg rounded-md bg-blue-500 p-2 text-white w-[100px] hover:bg-blue-600 transition-all ease-in-out duration-300 self-center'>
          Submit
        </button>
      </form>
    </Modal>
  );
};
export default AssignNewProject;
