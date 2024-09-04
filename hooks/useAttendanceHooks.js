import useActionDispatch from './useActionDispatch';
import axios from 'axios';
import toast from 'react-hot-toast';
import API from '@/services/endpoints';

export const useAttendanceHooks = () => {
  const { setEmployeeAttendance, updateAttendance } = useActionDispatch();

  const fetchEmployeeAttendance = async (id) => {
    try {
      const response = await axios.get(API.fetchEmployeeAttendance(id));
      setEmployeeAttendance(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addAttendanceDB = async (attendanceData) => {
    try {
      await axios.post(API.addAttendace(), attendanceData);
      toast.success('Attendance Record Added ');
    } catch (error) {
      console.log(error);
    }
  };

  const updateAttendanceRecord = async (id, data) => {
    try {
      console.log(id);
      await axios.put(API.updateAttendanceRecord(id), data);
      updateAttendance(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchEmployeeAttendance, addAttendanceDB, updateAttendanceRecord };
};
