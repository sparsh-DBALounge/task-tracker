'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeById } from '@/redux/slice/employee.slice';

const ViewDetails = ({
  openViewDetails,
  setOpenViewDetails,
  employeeBasicDetails,
  employeeId,
}) => {
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employeeSlice);
  const [isModalOpen, setIsModalOpen] = useState(openViewDetails);

  useEffect(() => {
    dispatch(fetchEmployeeById(employeeId));
  }, [dispatch]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenViewDetails(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      cancelButtonProps={{ hidden: true }}
      okButtonProps={{ hidden: true }}
      width={600}
    >
      <div>
        <p className='font-semibold text-xl text-center'>Employee Details</p>
        {employee.length === 0 && (
          <div className='mt-4'>
            <div className='flex flex-col gap-2 items-center text-[16px]'>
              <p>Name: {employeeBasicDetails.name}</p>
              <p>Email: {employeeBasicDetails.email}</p>
              <p>Phone: {employeeBasicDetails.phone}</p>
            </div>
            <p className='text-center font-semibold mt-4 text-lg'>
              No Project And Task Assigned
            </p>
          </div>
        )}

        {employee.length !== 0 && (
          <div className='grid grid-cols-2 gap-5 mt-5'>
            <div className='flex flex-col gap-2 items-center'>
              <p className='text-center font-semibold text-lg'>Basic Details</p>
              <p>Name: {employeeBasicDetails.name}</p>
              <p>Email: {employeeBasicDetails.email}</p>
              <p>Phone: {employeeBasicDetails.phone}</p>
            </div>

            <div className='flex flex-col gap-2 items-center'>
              <p className='text-center font-semibold text-lg'>Task Details</p>
              <p>Assigned Task Name: {employee[0]?.task_name}</p>
              <p>Task Assigned By: {employee[0]?.assignedby}</p>
              <p>Task Status: {employee[0]?.status}</p>
            </div>

            <div className='flex-1'>
              <p className='text-center font-semibold text-lg'>
                Project Details
              </p>
              <p className='text-center mt-2'>
                Project Assigned: {employee[0]?.projects[0]}
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
export default ViewDetails;
