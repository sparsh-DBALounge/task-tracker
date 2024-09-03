import React, { useState } from 'react';
import { Modal } from 'antd';
import { addNewTaskAsync } from '@/redux/slice/task.slice';
import { useDispatch } from 'react-redux';
import { getCurrentDate } from '@/utils/getCurrentDate';

const NewTaskModal = ({ addNewTask, setAddNewTask }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(addNewTask);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      taskName,
      description,
    };
    dispatch(addNewTaskAsync(newTask));
    setAddNewTask('');
    setDescription('');
    setIsModalOpen(false);
    setAddNewTask(false);
  };

  const handleCancel = () => {
    setAddNewTask(false);
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={handleCancel}
    >
      <form
        onSubmit={handleSubmit}
        className='mt-5 flex flex-col gap-3 text-lg'
      >
        <div>
          <p>
            TaskName <span className='text-red-500'>*</span>{' '}
          </p>
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
            type='text'
            required
          />
        </div>

        <div>
          <p>
            Description <span className='text-red-500'>*</span>{' '}
          </p>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
            type='text'
            required
          />
        </div>

        <button className='mt-5 text-lg rounded-md bg-blue-500 p-2 text-white w-[100px] hover:bg-blue-600 transition-all ease-in-out duration-300 self-center'>
          Submit
        </button>
      </form>
    </Modal>
  );
};
export default NewTaskModal;
