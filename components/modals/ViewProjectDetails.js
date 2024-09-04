import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { useProjectHooks } from '@/hooks/useProjectHooks';

const ViewProjectDetails = ({
  openViewDetailsModal,
  setOpenViewDetailsModal,
  viewProjectDetailsId,
}) => {
  const { projectViewDetails } = useProjectHooks();
  const { project } = useSelector((state) => state.projectSlice);
  const [isModalOpen, setIsModalOpen] = useState(openViewDetailsModal);

  useEffect(() => {
    projectViewDetails(viewProjectDetailsId);
  }, []);

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
