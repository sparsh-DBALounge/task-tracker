import { useState } from 'react';
import { Modal } from 'antd';
import { addProjectAsync } from '@/redux/slice/project.slice';
import { useDispatch } from 'react-redux';

const AddNewProject = ({ openAddProjectModal, setOpenAddProjectModal }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(openAddProjectModal);
  const [project, setProject] = useState('');

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenAddProjectModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addProjectAsync({ project }));
    setProject('');
    setOpenAddProjectModal(false);
  };

  return (
    <Modal
      open={isModalOpen}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={handleCancel}
    >
      <form onSubmit={handleSubmit} className='mt-5 flex flex-col'>
        <p className='text-lg'>
          Project Name <span className='text-red-500'>*</span>{' '}
        </p>
        <input
          type='text'
          value={project}
          onChange={(e) => setProject(e.target.value)}
          required
          className='mt-1 border w-full focus:outline-none pl-1 p-1 focus:border-blue-500'
        />

        <button className='mt-5 text-lg rounded-md bg-blue-500 p-2 text-white w-[100px] hover:bg-blue-600 transition-all ease-in-out duration-300 self-center'>
          Submit
        </button>
      </form>
    </Modal>
  );
};
export default AddNewProject;
