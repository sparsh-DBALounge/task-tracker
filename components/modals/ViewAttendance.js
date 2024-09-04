import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { useAttendanceHooks } from '@/hooks/useAttendanceHooks';
import toast from 'react-hot-toast';

const ViewAttendance = ({
  viewAttendance,
  setViewAttendace,
  viewAttendanceId,
}) => {
  const { updateAttendanceRecord, fetchEmployeeAttendance } =
    useAttendanceHooks();
  const { employeeAttendance } = useSelector((state) => state.attendanceSlice);
  const [isModalOpen, setIsModalOpen] = useState(viewAttendance);
  const [updateRecord, setUpdateRecord] = useState(false);
  const [updateRecordId, setUpdateRecordId] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const [newShift, setNewShift] = useState(null);

  useEffect(() => {
    fetchEmployeeAttendance(viewAttendanceId);
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    setViewAttendace(false);
  };

  const handleAttendanceUpdate = (record) => {
    const dbData = {
      date: record.date,
      location: newLocation,
      shift: newShift,
    };
    updateAttendanceRecord(record.employee_id, dbData);
    toast.success('Record Updated');
    setUpdateRecordId(null);
  };

  return (
    <Modal
      width={700}
      open={isModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      className='top-5'
    >
      {employeeAttendance.length === 0 && (
        <p className='text-center font-semibold text-lg'>No Record</p>
      )}

      {employeeAttendance.length !== 0 && (
        <table className='border-collapse w-full mt-7'>
          <thead>
            <tr>
              <th className='px-4 py-2 border'>Date</th>
              <th className='px-4 py-2 border'>Location</th>
              <th className='px-4 py-2 border'>Shift</th>
              <th className='px-4 py-2 border'>Actions</th>
            </tr>
          </thead>

          {employeeAttendance.map((record) => (
            <tr key={record.id} className='hover:bg-gray-100 text-lg'>
              <td className='px-4 py-2 border'>{record.date}</td>
              <td className='px-4 py-2 border'>
                {record.id === updateRecordId ? (
                  <input
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className='w-full pl-2 border-2 border-black focus:outline-none rounded-md'
                  />
                ) : (
                  record.location
                )}
              </td>
              <td className='px-4 py-2 border'>
                {record.id === updateRecordId ? (
                  <input
                    value={newShift}
                    onChange={(e) => setNewShift(e.target.value)}
                    className='w-full pl-2 border-2 border-black focus:outline-none rounded-md'
                  />
                ) : (
                  record.shift
                )}
              </td>
              <td className='px-4 py-2 border flex flex-col gap-3'>
                {record.id === updateRecordId ? (
                  <button
                    onClick={() => handleAttendanceUpdate(record)}
                    className='bg-green-500 text-white px-3 py-1 mr-2 rounded hover:bg-green-700 transition-all'
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setUpdateRecord(true);
                      setUpdateRecordId(record.id);
                      setNewLocation(record.location);
                      setNewShift(record.shift);
                    }}
                    className='bg-yellow-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-700 transition-all'
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </table>
      )}
    </Modal>
  );
};
export default ViewAttendance;
