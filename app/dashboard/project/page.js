'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { withAuth } from '@/HOC/withAuth';
import ConfirmDelete from '@/components/modals/ConfirmDelete';
import AddNewProject from '@/components/modals/AddNewProject';
import ViewProjectDetails from '@/components/modals/ViewProjectDetails';
import { useProjectHooks } from '@/hooks/useProjectHooks';

function project() {
  const dispatch = useDispatch();
  const { fetchProjects, updateProject, deleteProjectDB } = useProjectHooks();
  const { projects } = useSelector((state) => state.projectSlice);
  const [updateProjectId, setUpdateProjectId] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openAddProjectModal, setOpenAddProjectModal] = useState(false);
  const [openViewDetailsModal, setOpenViewDetailsModal] = useState(false);
  const [viewProjectDetailsId, setViewProjectDetaildId] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (confirmDelete && selectedProject) {
      deleteProjectDB(selectedProject.id);
      toast('Project Deleted', {
        style: {
          fontWeight: 'bold',
          fontSize: '18px',
        },
      });
      setConfirmDelete(false);
    }
  }, [confirmDelete, selectedProject, dispatch]);

  const handleProjectUpdate = (project) => {
    updateProject(project.id, projectName);
    setUpdateProjectId(null);
    toast.success('Project Updated');
  };

  const handleInputChange = (e) => {
    setProjectName(e.target.value);
  };

  return (
    <>
      <div className='relative flex-1'>
        <p className='pl-3 mt-20 md:mt-5 text-3xl font-bold tracking-tight montserrat-bold'>
          PROJECTS LIST
        </p>

        <button
          onClick={() => setOpenAddProjectModal(true)}
          className='absolute right-10 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-all ease-in-out duration-300'
        >
          Add New Project
        </button>

        <div className='max-w-5xl mx-auto mt-20 px-5'>
          <table className='w-full border-collapse mt-10'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border px-4 py-2 text-left'>S. No.</th>
                <th className='border px-4 py-2 text-left'>Project Name</th>
                <th className='border px-4 py-2 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => (
                <tr key={project.id} className='hover:bg-gray-100'>
                  <td className='border px-4 py-2'>{i + 1}</td>
                  <td className='border px-4 py-2'>
                    {updateProjectId === project.id ? (
                      <input
                        value={projectName}
                        onChange={handleInputChange}
                        className='p-1 border-2 border-gray-500 rounded-md w-full'
                      />
                    ) : (
                      project.project
                    )}
                  </td>
                  <td className='border px-4 py-2 flex flex-col gap-2 sm:flex-row sm:justify-center'>
                    <button
                      onClick={() => {
                        setOpenViewDetailsModal(true);
                        setViewProjectDetaildId(project.id);
                      }}
                      className='bg-blue-500 text-white px-3 py-1 mr-2 rounded hover:bg-blue-700 transition-all'
                    >
                      View Details
                    </button>
                    {updateProjectId === project.id ? (
                      <button
                        onClick={() => {
                          handleProjectUpdate(project);
                        }}
                        className='bg-green-500 text-white px-3 py-1 mr-2 rounded hover:bg-green-700 transition-all'
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setProjectName(project.project);
                          setUpdateProjectId(project.id);
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
      </div>

      {openDeleteModal && (
        <ConfirmDelete
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          setConfirmDelete={setConfirmDelete}
          text='Project'
        />
      )}

      {openAddProjectModal && (
        <AddNewProject
          openAddProjectModal={openAddProjectModal}
          setOpenAddProjectModal={setOpenAddProjectModal}
        />
      )}

      {openViewDetailsModal && (
        <ViewProjectDetails
          viewProjectDetailsId={viewProjectDetailsId}
          openViewDetailsModal={openViewDetailsModal}
          setOpenViewDetailsModal={setOpenViewDetailsModal}
        />
      )}
    </>
  );
}

export default withAuth(project);
