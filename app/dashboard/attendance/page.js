'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import ViewAttendance from '@/components/modals/ViewAttendance';
import { fetchEmployees } from '@/redux/slice/employee.slice';
import AddNewAttendance from '@/components/modals/AddNewAttendance';

export default function attendance() {
  const dispatch = useDispatch();
  const [viewAttendance, setViewAttendace] = useState(false);
  const [viewAttendanceId, setViewAttendaceId] = useState(null);
  const [addAttendance, setAddAttendance] = useState(false);
  const { employees } = useSelector((state) => state.employeeSlice);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <>
      <div className='relative w-full px-5'>
        <p className='pl-3 mt-[50px] md:mt-5 text-3xl font-bold tracking-tight montserrat-bold'>
          Attendance
        </p>

        <button
          onClick={() => setAddAttendance(true)}
          className='absolute right-5 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-all ease-in-out duration-300'
        >
          Add New Attendance
        </button>

        <table className='border-collapse min-w-full mt-[60px]'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border px-4 py-2 text-left'>S. No.</th>
              <th className='border px-4 py-2 text-left'>Employee Name</th>
              <th className='border px-4 py-2 text-left'>Email</th>
              <th className='border px-4 py-2 text-left'>Phone</th>
              <th className='border px-4 py-2 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, i) => (
              <tr key={employee.id} className='hover:bg-gray-100'>
                <td className='border px-4 py-2'>{i + 1}</td>
                <td className='border px-4 py-2'>{employee.employee_name}</td>
                <td className='border px-4 py-2'>{employee.email}</td>
                <td className='border px-4 py-2'>{employee.phone}</td>
                <td className='border px-4 py-2 text-center flex justify-center'>
                  <button
                    onClick={() => {
                      setViewAttendace(true);
                      setViewAttendaceId(employee.id);
                    }}
                    className='bg-blue-500 text-white px-3 py-1 mr-2 rounded hover:bg-blue-700 transition-all'
                  >
                    View Attendance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewAttendance && (
        <ViewAttendance
          viewAttendance={viewAttendance}
          setViewAttendace={setViewAttendace}
          viewAttendanceId={viewAttendanceId}
        />
      )}

      {addAttendance && (
        <AddNewAttendance
          addAttendance={addAttendance}
          setAddAttendance={setAddAttendance}
        />
      )}
    </>
  );
}
