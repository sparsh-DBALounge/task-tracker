import React, { useState } from 'react';
import { Modal } from 'antd';
import { addAttendanceAsync } from '@/redux/slice/attendance.slice';
import { useDispatch } from 'react-redux';

const NewAttendance = ({ newAttendance, setNewAttendance }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(newAttendance);
  const [formData, setFormDate] = useState({
    startDate: '',
    endDate: '',
    employee_id: '',
  });
  const [location, setLocation] = useState('DBA Lounge');
  const [shift, setShift] = useState('Morning');

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewAttendance(false);
  };

  const handleInputChange = (e) => {
    setFormDate((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleShiftChange = (e) => {
    setShift(e.target.value);
  };

  const dataToSubmit = { ...formData, location, shift };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAttendanceAsync(dataToSubmit));
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-5 font-semibold'
        >
          <div>
            <p>Employee ID</p>
            <input
              type='Text'
              id='employee_id'
              value={formData.employee_id}
              onChange={handleInputChange}
              className='border p-1 w-full mt-1'
            />
          </div>

          <div>
            <p>Start Date </p>
            <input
              type='date'
              id='startDate'
              value={formData.startDate}
              onChange={handleInputChange}
              className='border p-1 w-full mt-1'
            />
          </div>

          <div>
            <p>End Date </p>
            <input
              type='date'
              id='endDate'
              value={formData.endDate}
              onChange={handleInputChange}
              className='border p-1 w-full mt-1'
            />
          </div>

          <div>
            <p>Location </p>
            <select
              value={location}
              onChange={handleLocationChange}
              id='location'
              className='border p-1 w-full mt-1'
            >
              <option value='DBA Lounge'>DBA Lounge</option>
              <option value='wfh'>wfh</option>
            </select>
          </div>

          <div>
            <p>Shift </p>
            <select
              onCanPlay={handleShiftChange}
              value={shift}
              className='border p-1 w-full mt-1'
              id='shift'
            >
              <option value='morning'>Morning</option>
              <option value='evening'>Evening</option>
            </select>
          </div>

          <button className='mt-5 text-lg rounded-md bg-blue-500 p-2 text-white w-[100px] hover:bg-blue-600 transition-all ease-in-out duration-300 self-center'>
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};
export default NewAttendance;
