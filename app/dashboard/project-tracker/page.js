'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAssignedProjectsAsync,
  updateAssignedProjectAsync,
  deleteAssignedProjectAsync,
} from '@/redux/slice/projectTracker.slice';
import AssignNewProject from '@/components/modals/AssignNewProject';
import { mapEmployeeNameToId } from '@/utils/mapEmployeeNameToId';
import { mapRoleToId } from '@/utils/mapRoleToId';
import { mapProjectNameToId } from '@/utils/mapProjectNameToId';
import ConfirmDelete from '@/components/modals/ConfirmDelete';
import toast from 'react-hot-toast';
import { useProjectTrackerHooks } from '@/hooks/useProjectTrackerHooks';

export default function ProjectTracker() {
  const dispatch = useDispatch();
  const {
    fetchAssignedProjects,
    deleteAssignedProjectDB,
    updateAssignedProjectDB,
  } = useProjectTrackerHooks();
  const { employees } = useSelector((state) => state.employeeSlice);
  const { projects } = useSelector((state) => state.projectSlice);
  const { roles } = useSelector((state) => state.roleSlice);
  const [updateAssignedProjectId, setupdateAssignedProjectId] = useState(null);
  const [openAssignProjectModal, setOpenAssignProjectModal] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [role, setRole] = useState('');

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const { assignedProjects } = useSelector(
    (state) => state.projectTrackerSlice
  );

  useEffect(() => {
    fetchAssignedProjects();
  }, []);

  useEffect(() => {
    if (confirmDelete && selectedProject) {
      deleteAssignedProjectDB(selectedProject.id);
      toast('Assigned Project Deleted', {
        style: {
          fontWeight: 'bold',
          fontSize: '18px',
        },
      });
      setConfirmDelete(false);
    }
  }, [confirmDelete, selectedProject, dispatch]);

  const handleTaskUpdate = (project) => {
    const employee_id = mapEmployeeNameToId(employees, employeeName);
    const project_id = mapProjectNameToId(projects, projectName);
    const role_id = mapRoleToId(roles, role);

    const dbData = {
      employee_id,
      project_id,
      role_id,
    };
    const reduxData = {
      ...dbData,
      employee_name: employeeName,
      project: projectName,
      role,
    };
    updateAssignedProjectDB(project.id, dbData, reduxData);
    setupdateAssignedProjectId(null);
  };

  return (
    <>
      <div className='relative flex-1 px-5'>
        <p className='pl-3 mt-20 md:mt-5 text-3xl font-bold tracking-tight montserrat-bold'>
          PROJECT TRACKER
        </p>

        <button
          onClick={() => setOpenAssignProjectModal(true)}
          className='absolute right-5 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-all ease-in-out duration-300'
        >
          Assign Project
        </button>

        <table className='w-full border-collapse mt-20'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border px-4 py-2 text-left'>Employee Name</th>
              <th className='border px-4 py-2 text-left'>Project Name</th>
              <th className='border px-4 py-2 text-left'>Role</th>
              <th className='border px-4 py-2 text-left'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {assignedProjects.length !== 0 &&
              assignedProjects.map((project) => (
                <tr key={project?.id} className='hover:bg-gray-100'>
                  <td className='border px-4 py-2'>
                    {updateAssignedProjectId === project?.id ? (
                      <select
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        className='p-1 border-2 border-gray-500 rounded-md w-full'
                      >
                        {employees.map((e) => (
                          <option key={e.id}>{e.employee_name}</option>
                        ))}
                      </select>
                    ) : (
                      project?.employee_name
                    )}
                  </td>
                  <td className='border px-4 py-2'>
                    {updateAssignedProjectId === project?.id ? (
                      <select
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className='p-1 border-2 border-gray-500 rounded-md w-full'
                      >
                        {projects.map((p) => (
                          <option key={p.id}>{p.project}</option>
                        ))}
                      </select>
                    ) : (
                      project?.project
                    )}
                  </td>
                  <td className='border px-4 py-2'>
                    {updateAssignedProjectId === project?.id ? (
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='p-1 border-2 border-gray-500 rounded-md w-full'
                      >
                        {roles.map((r) => (
                          <option key={r.id}>{r.role}</option>
                        ))}
                      </select>
                    ) : (
                      project?.role
                    )}
                  </td>
                  <td className='border px-4 py-2 flex flex-col gap-2 md:flex-row md:justify-center'>
                    {updateAssignedProjectId === project?.id ? (
                      <button
                        onClick={() => handleTaskUpdate(project)}
                        className='bg-green-500 text-white px-3 py-1 mr-2 rounded hover:bg-green-700 transition-all'
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEmployeeName(project.employee_name);
                          setProjectName(project.project);
                          setRole(project.role);
                          setupdateAssignedProjectId(project.id);
                        }}
                        className='bg-yellow-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-700 transition-all'
                      >
                        Update
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setSelectedProject(project);
                      }}
                      className='bg-red-500 text-white px-3 py-1 mr-2 rounded hover:bg-red-700 transition-all'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {openAssignProjectModal && (
        <AssignNewProject
          openAssignProjectModal={openAssignProjectModal}
          setOpenAssignProjectModal={setOpenAssignProjectModal}
        />
      )}

      {openDeleteModal && (
        <ConfirmDelete
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          setConfirmDelete={setConfirmDelete}
          text='Assigned Project'
        />
      )}
    </>
  );
}
