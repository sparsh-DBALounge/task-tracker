import axios from 'axios';
import useActionDispatch from './useActionDispatch';
import API from '@/services/endpoints';

export const useEmployeeHooks = () => {
  const { setEmployees, deleteEmployee, updateEmployee, setEmployee } =
    useActionDispatch();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API.fetchEmployees());
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmployeeDB = async (id, data) => {
    try {
      await axios.put(API.updateEmployee(id), data);
      const reduxData = { id, data };
      updateEmployee(reduxData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployeeDB = async (id) => {
    try {
      await axios.delete(API.deleteEmployee(id));
      deleteEmployee(id);
    } catch (error) {
      console.log(error);
    }
  };

  const employeeViewDetails = async (id) => {
    try {
      const response = await axios.get(API.EmployeeById(id));
      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchEmployees,
    employeeViewDetails,
    updateEmployeeDB,
    deleteEmployeeDB,
  };
};
