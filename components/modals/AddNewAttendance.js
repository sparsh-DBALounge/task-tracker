import React, { useState } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { mapEmployeeNameToId } from '@/utils/mapEmployeeNameToId';
import { useAttendanceHooks } from '@/hooks/useAttendanceHooks';

const AddNewAttendance = ({ addAttendance, setAddAttendance }) => {
  const { addAttendanceDB } = useAttendanceHooks();
  const { employees } = useSelector((state) => state.employeeSlice);
  const [isModalOpen, setIsModalOpen] = useState(addAttendance);
  const [employeeName, setEmployeeName] = useState(employees[0].employee_name);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    location: 'DBA Lounge',
    shift: 'morning',
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    setAddAttendance(false);
  };

  const handleInputChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dbData = {
      ...formData,
      employee_id: mapEmployeeNameToId(employees, employeeName),
    };
    addAttendanceDB(dbData);
    setAddAttendance(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
    >
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <div>
          <p>
            Start Date <span className='text-red-500'>*</span>
          </p>
          <input
            type='date'
            id='startDate'
            value={formData.startDate}
            onChange={handleInputChange}
            className='w-full border-2 p-1 mt-1 focus:border-blue-500'
            required
          />
        </div>

        <div>
          <p>
            End Date <span className='text-red-500'>*</span>
          </p>
          <input
            type='date'
            id='endDate'
            value={formData.endDate}
            onChange={handleInputChange}
            className='w-full border-2 p-1 mt-1 focus:border-blue-500'
            required
          />
        </div>

        <div>
          <p>
            Employee Name <span className='text-red-500'>*</span>
          </p>
          <select
            id='employee_name'
            onChange={(e) => setEmployeeName(e.target.value)}
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
          >
            {employees.map((employee, i) => (
              <option key={i}>{employee.employee_name}</option>
            ))}
          </select>
        </div>

        <div>
          <p>
            Location <span className='text-red-500'>*</span>
          </p>
          <select
            id='location'
            value={formData.location}
            onChange={handleInputChange}
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
          >
            <option value='DBA Lounge'>DBA Lounge</option>
            <option value='WFH'>WFH</option>
          </select>
        </div>

        <div>
          <p>
            Shift <span className='text-red-500'>*</span>
          </p>
          <select
            id='shift'
            value={formData.shift}
            onChange={handleInputChange}
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
          >
            <option value='morning'>morning</option>
            <option value='evening'>evening</option>
          </select>
        </div>

        <button className='mt-5 text-lg rounded-md bg-blue-500 p-2 text-white w-[100px] hover:bg-blue-600 transition-all ease-in-out duration-300 self-center'>
          Submit
        </button>
      </form>
    </Modal>
  );
};
export default AddNewAttendance;
