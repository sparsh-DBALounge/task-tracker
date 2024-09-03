'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  fetchRolesAsync,
  updateRoleAsync,
  deleteRoleAsync,
} from '@/redux/slice/role.slice';
import toast from 'react-hot-toast';
import { withAuth } from '@/HOC/withAuth';
import ConfirmDelete from '@/components/modals/ConfirmDelete';
import AddNewRole from '@/components/modals/AddNewRole';

function Role() {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.roleSlice);
  const [updateRoleId, setUpdateRoleId] = useState(null);
  const [role, setRole] = useState('');
  const [selectedRoleForDelete, setSelectedRoleForDelete] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addNewRole, setAddNewRole] = useState(false);

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (confirmDelete && selectedRoleForDelete) {
      dispatch(deleteRoleAsync(selectedRoleForDelete.id));
      toast('Role Deleted', {
        style: {
          fontWeight: 'bold',
          fontSize: '18px',
        },
      });
      setConfirmDelete(false);
      setSelectedRoleForDelete(null);
    }
  }, [confirmDelete, selectedRoleForDelete, dispatch]);

  const handleRoleUpdate = async () => {
    const updatedRole = { role };
    dispatch(updateRoleAsync({ id: updateRoleId, updatedRole }));
    toast('Role Updated', {
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
      },
    });
    setUpdateRoleId(null);
    setRole('');
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <>
      <div className='flex-1'>
        <p className='relative pl-3 mt-20 md:mt-5 text-3xl font-bold tracking-tight montserrat-bold'>
          Roles LIST
        </p>

        <button
          onClick={() => setAddNewRole(true)}
          className='absolute bg-blue-500 text-white px-3 py-2 rounded-md right-5 hover:bg-blue-600 transition-all ease-in-out duration-300'
        >
          Add New Role
        </button>

        <div className='max-w-5xl mx-auto mt-20 px-5'>
          <table className='w-full border-collapse mt-10'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border px-4 py-2 text-left'>S. No.</th>
                <th className='border px-4 py-2 text-left'>Role</th>
                <th className='border px-4 py-2 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.length !== 0 &&
                roles.map((roleItem, i) => (
                  <tr key={roleItem.id} className='hover:bg-gray-100'>
                    <td className='border px-4 py-2'>{i + 1}</td>
                    <td className='border px-4 py-2'>
                      {updateRoleId === roleItem.id ? (
                        <input
                          value={role}
                          onChange={handleInputChange}
                          className='p-1 border-2 border-gray-500 rounded-md w-full'
                        />
                      ) : (
                        roleItem.role
                      )}
                    </td>
                    <td className='border px-4 py-2 flex flex-col gap-2 sm:flex-row sm:justify-center'>
                      {updateRoleId === roleItem.id ? (
                        <button
                          onClick={handleRoleUpdate}
                          className='bg-green-500 text-white px-3 py-1 mr-2 rounded hover:bg-green-700 transition-all'
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setRole(roleItem.role);
                            setUpdateRoleId(roleItem.id);
                          }}
                          className='bg-yellow-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-700 transition-all'
                        >
                          Update
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setSelectedRoleForDelete(roleItem);
                        }}
                        className='bg-red-500 text-white px-3 py-1 mr-2 rounded hover:bg-red-700 transition-all'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {openDeleteModal && (
        <ConfirmDelete
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          setConfirmDelete={setConfirmDelete}
          text='Role'
        />
      )}

      {addNewRole && (
        <AddNewRole addNewRole={addNewRole} setAddNewRole={setAddNewRole} />
      )}
    </>
  );
}

export default withAuth(Role);
