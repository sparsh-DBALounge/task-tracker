import React, { useState } from 'react';
import { Modal } from 'antd';
import toast from 'react-hot-toast';
import { useRoleHooks } from '@/hooks/useRoleHooks';

const AddNewRole = ({ addNewRole, setAddNewRole }) => {
  const { addRoleDB } = useRoleHooks();
  const [isModalOpen, setIsModalOpen] = useState(addNewRole);
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addRoleDB({ role });
    toast.success('New Role Added');
    setRole('');

    setIsModalOpen(false);
    setAddNewRole(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAddNewRole(false);
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
            Role <span className='text-red-500'>*</span>{' '}
          </p>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
export default AddNewRole;
