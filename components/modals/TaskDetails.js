import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskTrackerByIdAsync } from '@/redux/slice/taskTracker.slice';

const TaskDetails = ({ showTaskDetails, setShowTaskDetails, taskId }) => {
  const dispatch = useDispatch();
  const { taskTrackingDetails } = useSelector(
    (state) => state.taskTrackerSlice
  );
  const [isModalOpen, setIsModalOpen] = useState(showTaskDetails);
  console.log(taskTrackingDetails);

  useEffect(() => {
    if (taskId && isModalOpen) {
      dispatch(fetchTaskTrackerByIdAsync(taskId));
    }
  }, [dispatch, taskId, isModalOpen]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setShowTaskDetails(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      cancelButtonProps={{ hidden: true }}
      okButtonProps={{ hidden: true }}
    >
      {taskTrackingDetails.length !== 0 ? (
        <div className='flex flex-col gap-3 text-lg'>
          <p className='text-center font-semibold text-xl'>Task Details</p>
          <p>
            Task Name:{' '}
            <span className='ml-2'>{taskTrackingDetails[0]?.task_name}</span>
          </p>
          <p>
            Assigned By:
            <span className='ml-2'>
              {taskTrackingDetails[0]?.assigned_by_name}
            </span>
          </p>
          <p>
            Assigned To:{' '}
            <span className='ml-2'>
              {taskTrackingDetails[0]?.assigned_to_name}
            </span>
          </p>
          <p>
            Assigned Date:{' '}
            <span className='ml-2'>{taskTrackingDetails[0]?.start_date}</span>
          </p>
          <p>
            Start Date:{' '}
            <span className='ml-2'>
              {' '}
              {new Date(taskTrackingDetails[0]?.start_date).toLocaleString()}
            </span>
          </p>
          <p>
            End Date:{' '}
            <span className='ml-2'>
              {new Date(taskTrackingDetails[0]?.end_date).toLocaleString()}
            </span>
          </p>
          <p>
            Status:
            <span className='ml-2'>{taskTrackingDetails[0]?.status}</span>
          </p>
          <p>
            Comment:{' '}
            <span className='ml-2'>{taskTrackingDetails[0]?.comment}</span>
          </p>
        </div>
      ) : (
        <p className='font-semibol text-lg text-center'>
          No Task Tracking Details
        </p>
      )}
    </Modal>
  );
};

export default TaskDetails;
