import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeDetails from './modals/EmployeeDetails';
import toast from 'react-hot-toast';
import { withAuth } from '@/HOC/withAuth';
import ConfirmDelete from './modals/ConfirmDelete';
import { useEmployeeHooks } from '@/hooks/useEmployeeHooks';

const EmmployeeTable = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employeeSlice);
  const { fetchEmployees, updateEmployeeDB, deleteEmployeeDB } =
    useEmployeeHooks();
  const [editEmployee, setEditEmployee] = useState(null);
  const [editEmployeeDetails, setEditEmployeeDetails] = useState({
    employee_name: '',
    phone: '',
    email: '',
  });
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeBasicDetails, setEmployeeBasicDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (confirmDelete && selectedEmployee) {
      deleteEmployeeDB(selectedEmployee.id);
      toast('Employee Deleted', {
        style: {
          fontWeight: 'bold',
          fontSize: '18px',
        },
      });
      setConfirmDelete(false);
    }
  }, [confirmDelete, selectedEmployee, dispatch]);

  const handleInputChange = (e) => {
    setEditEmployeeDetails((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleEmployeeUpdate = (employee) => {
    updateEmployeeDB(employee.id, editEmployeeDetails);
    setEditEmployee(null);
    setEditEmployeeDetails({
      employee_name: '',
      phone: '',
      email: '',
    });
    toast.success('Employee Details Updated');
  };

  return (
    <>
      <div className='overflow-x-auto w-full'>
        <table className='min-w-full border-collapse'>
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
                <td className='border px-4 py-2'>
                  {editEmployee === employee.id ? (
                    <input
                      type='text'
                      id='employee_name'
                      value={editEmployeeDetails.employee_name}
                      onChange={handleInputChange}
                      className='border-2 border-gray-500 rounded-md pl-1'
                    />
                  ) : (
                    employee.employee_name
                  )}
                </td>
                <td className='border px-4 py-2'>
                  {editEmployee === employee.id ? (
                    <input
                      type='email'
                      id='email'
                      onChange={handleInputChange}
                      value={editEmployeeDetails.email}
                      className='border-2 border-gray-500 rounded-md pl-1'
                    />
                  ) : (
                    employee.email
                  )}
                </td>
                <td className='border px-4 py-2'>
                  {editEmployee === employee.id ? (
                    <input
                      type='text'
                      id='phone'
                      onChange={handleInputChange}
                      value={editEmployeeDetails.phone}
                      className='border-2 border-gray-500 rounded-md pl-1'
                    />
                  ) : (
                    employee.phone
                  )}
                </td>
                <td className='border px-4 py-2 text-center flex justify-center'>
                  <button
                    onClick={() => {
                      setEmployeeId(employee.id);
                      setOpenViewDetails(true);
                      setEmployeeBasicDetails({
                        name: employee.employee_name,
                        email: employee.email,
                        phone: employee.phone,
                      });
                    }}
                    className='bg-blue-500 text-white px-3 py-1 mr-2 rounded hover:bg-blue-700 transition-all'
                  >
                    View Details
                  </button>

                  {editEmployee === employee.id ? (
                    <button
                      onClick={() => handleEmployeeUpdate(employee)}
                      className='bg-green-500 text-white px-3 py-1 mr-2 rounded hover:bg-green-700 transition-all'
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditEmployee(employee.id);
                        setEditEmployeeDetails({
                          employee_name: employee.employee_name,
                          phone: employee.phone,
                          email: employee.email,
                        });
                      }}
                      className='bg-yellow-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-700 transition-all'
                    >
                      Update
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setOpenDeleteModal(true);
                    }}
                    className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-all'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openViewDetails && (
        <EmployeeDetails
          openViewDetails={openViewDetails}
          setOpenViewDetails={setOpenViewDetails}
          employeeBasicDetails={employeeBasicDetails}
          employeeId={employeeId}
        />
      )}

      {openDeleteModal && (
        <ConfirmDelete
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          setConfirmDelete={setConfirmDelete}
          text='Employee'
        />
      )}
    </>
  );
};

export default withAuth(EmmployeeTable);
