import axios from 'axios';
import useActionDispatch from './useActionDispatch';
import API from '@/services/endpoints';

export const useProjectHooks = () => {
  const { setProjects, setProject, updateProjects, deleteProject, addProject } =
    useActionDispatch();

  const fetchProjects = async () => {
    try {
      const response = await axios.get(API.fetchProjects());
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProject = async (id, project) => {
    try {
      await axios.put(API.updateProject(id), {
        project,
      });
      const reduxData = {
        id,
        data: { project },
      };
      updateProjects(reduxData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProjectDB = async (id) => {
    try {
      await axios.delete(API.deleteProject(id));
      deleteProject(id);
    } catch (error) {
      console.log(error);
    }
  };

  const addProjectDB = async (project) => {
    try {
      await axios.post(API.addProject(), { project });
      addProject({ project });
    } catch (error) {
      console.log(error);
    }
  };

  const projectViewDetails = async (id) => {
    try {
      const response = await axios.get(API.projectById(id));
      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchProjects,
    updateProject,
    deleteProjectDB,
    addProjectDB,
    projectViewDetails,
  };
};
