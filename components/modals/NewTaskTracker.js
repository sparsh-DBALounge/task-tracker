import { Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTaskTrackerAsync } from '@/redux/slice/taskTracker.slice';
import { useSelector } from 'react-redux';
import { mapEmployeeNameToId } from '@/utils/mapEmployeeNameToId';
import { mapTaskNameToId } from '@/utils/mapTaskNameToId';

const NewTaskTracker = ({ addNewTaskTracker, setAddNewTaskTracker }) => {
  const { tasks } = useSelector((state) => state.taskSlice);
  const { employees } = useSelector((state) => state.employeeSlice);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(addNewTaskTracker);
  const [taskName, setTaskName] = useState(tasks[0].taskName);
  const [assignedBy, setAssignedBy] = useState(employees[0].employee_name);
  const [assignedTo, setAssignedTo] = useState(employees[0].employee_name);
  const [formData, setFormData] = useState({
    assigned_date: '',
    start_date: '',
    end_date: '',
    status: '',
    comment: '',
  });

  useEffect(() => {
    setIsModalOpen(addNewTaskTracker);
  }, [addNewTaskTracker]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setAddNewTaskTracker(false);
  };

  const handleInputChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const task_id = mapTaskNameToId(tasks, taskName);
    const assignedById = mapEmployeeNameToId(employees, assignedBy);
    const assignedToId = mapEmployeeNameToId(employees, assignedTo);

    const dbData = {
      task_id,
      assignedBy: assignedById,
      assignedTo: assignedToId,
      ...formData,
    };
    const reduxData = {
      ...dbData,
      task_name: taskName,
      assigned_by_name: assignedBy,
      assigned_to_name: assignedTo,
    };

    dispatch(addNewTaskTrackerAsync({ dbData, reduxData }));
    setFormData({
      assigned_date: '',
      end_date: '',
      status: '',
      comment: '',
    });
    handleCancel();
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      className='top-2'
    >
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='mt-4'>
          <p className='font-semibold'>
            Task Name <span className='text-red-500'>*</span>{' '}
          </p>
          <select
            id='task_name'
            value={taskName}
            required
            onChange={(e) => setTaskName(e.target.value)}
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
          >
            {tasks.map((task, i) => (
              <option key={i}>{task.taskName}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='font-semibold'>
            Assigned By <span className='text-red-500'>*</span>{' '}
          </p>
          <select
            id='assigned_by'
            value={assignedBy}
            required
            onChange={(e) => setAssignedBy(e.target.value)}
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
          >
            {employees.map((employee, i) => (
              <option key={i}>{employee.employee_name}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='font-semibold'>
            Assigned To <span className='text-red-500'>*</span>{' '}
          </p>
          <select
            id='assigned_to'
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
          >
            {employees.map((employee, i) => (
              <option key={i}>{employee.employee_name}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='font-semibold'>
            Assigned Date: <span className='text-red-500'>*</span>{' '}
          </p>
          <input
            value={formData.assigned_date}
            onChange={handleInputChange}
            id='assigned_date'
            type='date'
            required
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
          />
        </div>

        <div>
          <p className='font-semibold'>
            Start Date: <span className='text-red-500'>*</span>{' '}
          </p>
          <input
            value={formData.start_date}
            onChange={handleInputChange}
            id='start_date'
            required
            type='date'
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
          />
        </div>

        <div>
          <p className='font-semibold'>
            End Date: <span className='text-red-500'>*</span>{' '}
          </p>
          <input
            value={formData.end_date}
            onChange={handleInputChange}
            required
            id='end_date'
            type='date'
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
          />
        </div>

        <div>
          <p className='font-semibold'>
            Status: <span className='text-red-500'>*</span>{' '}
          </p>
          <input
            value={formData.status}
            onChange={handleInputChange}
            id='status'
            required
            type='text'
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
          />
        </div>

        <div>
          <p className='font-semibold'>Comment: </p>
          <input
            value={formData.comment}
            onChange={handleInputChange}
            id='comment'
            type='text'
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
          />
        </div>

        <button className='mt-5 text-lg rounded-md bg-blue-500 p-2 text-white w-[100px] hover:bg-blue-600 transition-all ease-in-out duration-300 self-center'>
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default NewTaskTracker;
