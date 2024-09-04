import useActionDispatch from './useActionDispatch';
import axios from 'axios';
import API from '@/services/endpoints';

export const useRoleHooks = () => {
  const { setRoles, deleteRole, addRole, updateRole } = useActionDispatch();
  const fetchRoles = async () => {
    try {
      const response = await axios.get(API.fetchRoles());
      setRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoleDB = async (id) => {
    try {
      await axios.delete(API.deleteRole(id));
      deleteRole(id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRoleDB = async (id, updatedRole) => {
    try {
      const reduxData = {
        id,
        updatedRole,
      };
      await axios.put(API.updateRole(id), updatedRole);
      updateRole(reduxData);
    } catch (error) {
      console.log(error);
    }
  };

  const addRoleDB = async (role) => {
    try {
      await axios.post(API.addRole(), role);
      addRole(role);
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchRoles, deleteRoleDB, updateRoleDB, addRoleDB };
};
