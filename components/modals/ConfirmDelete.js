import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

const ConfirmDelete = ({
  openDeleteModal,
  setOpenDeleteModal,
  setConfirmDelete,
  text,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(openDeleteModal);
  }, [openDeleteModal]);

  const handleOk = () => {
    setIsModalOpen(false);
    setOpenDeleteModal(false);
    setConfirmDelete(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenDeleteModal(false);
    setConfirmDelete(false);
  };

  return (
    <Modal
      title='Confirm Deletion'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Are you sure you want to delete this {text}?</p>
    </Modal>
  );
};

export default ConfirmDelete;
