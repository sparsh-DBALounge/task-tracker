import useActionDispatch from './useActionDispatch';
import axios from 'axios';
import API from '@/services/endpoints';
import { getCurrentDate } from '@/utils/getCurrentDate';

export const useTaskHooks = () => {
  const { setTasks, deleteTask, addTask, updateTask } = useActionDispatch();
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API.fetchTasks());
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTaskDB = async (id) => {
    try {
      await axios.delete(API.deleteTask(id));
      deleteTask(id);
    } catch (error) {
      console.log(error);
    }
  };

  const addTaskDB = async (newTask) => {
    try {
      const reduxData = {
        ...newTask,
        created_at: getCurrentDate(),
      };
      await axios.post(API.addTask(), newTask);
      addTask(reduxData);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskDB = async (id, updatedTask) => {
    try {
      const reduxData = {
        id,
        updatedTask,
      };
      await axios.put(API.updateTask(id), updatedTask);
      updateTask(reduxData);
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchTasks, deleteTaskDB, addTaskDB, updateTaskDB };
};
