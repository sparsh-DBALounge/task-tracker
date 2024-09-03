import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { fetchProjectByIdAsync } from '@/redux/slice/project.slice';
import { useDispatch, useSelector } from 'react-redux';

const ViewProjectDetails = ({
  openViewDetailsModal,
  setOpenViewDetailsModal,
  viewProjectDetailsId,
}) => {
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.projectSlice);
  const [isModalOpen, setIsModalOpen] = useState(openViewDetailsModal);

  useEffect(() => {
    dispatch(fetchProjectByIdAsync(viewProjectDetailsId));
  }, [dispatch]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenViewDetailsModal(false);
  };

  return (
    <Modal
      open={isModalOpen}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={handleCancel}
    >
      {project.length === 0 && (
        <p className='text-center mt-5 font-bold text-lg'>
          Not Assigned to Anyone
        </p>
      )}

      {project.length !== 0 && (
        <p className='text-center mt-5 font-bold text-lg'>
          Employees Working on this Project:
          {project[0]?.employee_name.map((name) => (
            <p className='font-semibold text-md'>{name}</p>
          ))}
        </p>
      )}
    </Modal>
  );
};
export default ViewProjectDetails;
