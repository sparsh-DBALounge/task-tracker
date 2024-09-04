import useActionDispatch from './useActionDispatch';
import axios from 'axios';
import API from '@/services/endpoints';

export const useProjectTrackerHooks = () => {
  const {
    setAssignedProjects,
    addAssignProject,
    deleteAssignedProject,
    updateAssignedProject,
  } = useActionDispatch();

  const fetchAssignedProjects = async () => {
    try {
      const response = await axios.get(API.getAssignedProjects());
      setAssignedProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAssignedProjectDB = async (id) => {
    try {
      await axios.delete(API.deleteAssignedProject(id));
      deleteAssignedProject(id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAssignedProjectDB = async (id, dbData, reduxData) => {
    try {
      await axios.put(API.updateAssignedProject(id), dbData);
      updateAssignedProject({ id, reduxData });
    } catch (error) {
      console.log(error);
    }
  };

  const addAssignedProjectDB = async (dbData, reduxData) => {
    try {
      await axios.post(API.addAssignedProjects(), dbData);
      addAssignProject(reduxData);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchAssignedProjects,
    addAssignedProjectDB,
    deleteAssignedProjectDB,
    updateAssignedProjectDB,
  };
};
