'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTaskTrackerAsync } from '@/redux/slice/taskTracker.slice';
import NewTaskTracker from '@/components/modals/NewTaskTracker';
import { withAuth } from '@/HOC/withAuth';
import {
  deleteTaskTrackerAsync,
  updateTaskTrackerAsync,
} from '@/redux/slice/taskTracker.slice';
import ConfirmDelete from '@/components/modals/ConfirmDelete';
import toast from 'react-hot-toast';
import { mapEmployeeNameToId } from '@/utils/mapEmployeeNameToId';
import { mapTaskNameToId } from '@/utils/mapTaskNameToId';

function TaskTracker() {
  const dispatch = useDispatch();
  const { taskTracker } = useSelector((state) => state.taskTrackerSlice);
  const { tasks } = useSelector((state) => state.taskSlice);
  const { employees } = useSelector((state) => state.employeeSlice);
  const [addNewTaskTracker, setAddNewTaskTracker] = useState(false);
  const [taskTrackerUpdateId, setTaskTrackerUpdateId] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [newAssignedBy, setNewAssignedBy] = useState('');
  const [newAssignedTo, setNewAssignedTo] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newComment, setNewComment] = useState('');

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTaskTracker, setSelectedTaskTracker] = useState(null);

  useEffect(() => {
    dispatch(fetchTaskTrackerAsync());
  }, [dispatch]);

  useEffect(() => {
    if (confirmDelete && selectedTaskTracker) {
      dispatch(deleteTaskTrackerAsync(selectedTaskTracker.id));
      toast('Task Tracker Deleted', {
        style: {
          fontWeight: 'bold',
          fontSize: '18px',
        },
      });
      setConfirmDelete(false);
    }
  }, [confirmDelete, selectedTaskTracker, dispatch]);

  const handleTaskTrackerUpdate = (taskTracker) => {
    const trackerId = taskTracker.id;
    const dbData = {
      task_id: mapTaskNameToId(tasks, newTask),
      assignedBy: mapEmployeeNameToId(employees, newAssignedBy),
      assignedTo: mapEmployeeNameToId(employees, newAssignedTo),
      assigned_date: taskTracker.assigned_date,
      start_date: taskTracker.start_date,
      end_date: taskTracker.end_date,
      status: newStatus,
      comment: newComment,
    };

    const reduxData = {
      assigned_by: dbData.assignedBy,
      assigned_to: dbData.assignedTo,
      task_name: newTask,
      assigned_by_name: newAssignedBy,
      assigned_to_name: newAssignedTo,
      status: newStatus,
      comment: newComment,
    };

    dispatch(updateTaskTrackerAsync({ id: trackerId, dbData, reduxData }));

    setTaskTrackerUpdateId(null);
    setNewTask('');
    setNewAssignedBy('');
    setNewAssignedTo('');
  };

  return (
    <>
      <div className='realtive flex-1'>
        <p className='pl-3 mt-[60px] md:mt-5 text-3xl font-bold tracking-tight montserrat-bold'>
          TASK TRACKER
        </p>

        <button
          onClick={() => {
            setAddNewTaskTracker(true);
          }}
          className='absolute bg-blue-500 text-white px-3 py-2 rounded-md right-10 hover:bg-blue-600 transition-all ease-in-out duration-300'
        >
          Add New Task Tracker
        </button>

        <div className='mt-20 max-w-6xl mx-auto px-2'>
          <table className='overflow-x-scroll w-full border-collapse'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border px-4 py-2 text-left'>Task Name</th>
                <th className='border px-4 py-2 text-left'>Assigned By</th>
                <th className='border px-4 py-2 text-left'>Assigned To</th>
                <th className='border px-4 py-2 text-left'>Assigned Date</th>
                <th className='border px-4 py-2 text-left'>End Date</th>
                <th className='border px-4 py-2 text-left'>Status</th>
                <th className='border px-4 py-2 text-left'>Comment</th>
                <th className='border px-4 py-2 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {taskTracker.length !== 0 &&
                taskTracker.map((t) => (
                  <tr key={t.task_id} className='hover:bg-gray-200'>
                    <td className='px-4 py-2 border'>
                      {taskTrackerUpdateId === t.id ? (
                        <select
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                          className='p-1 border-2 border-gray-500 rounded-md w-full'
                        >
                          {tasks.map((t) => (
                            <option>{t.taskName}</option>
                          ))}
                        </select>
                      ) : (
                        t.task_name
                      )}
                    </td>
                    <td className='px-4 py-2 border'>
                      {taskTrackerUpdateId === t.id ? (
                        <select
                          value={newAssignedBy}
                          onChange={(e) => setNewAssignedBy(e.target.value)}
                          className='p-1 border-2 border-gray-500 rounded-md'
                        >
                          {employees.map((e) => (
                            <option>{e.employee_name}</option>
                          ))}
                        </select>
                      ) : (
                        t.assigned_by_name
                      )}
                    </td>
                    <td className='px-4 py-2 border'>
                      {' '}
                      {taskTrackerUpdateId === t.id ? (
                        <select
                          value={newAssignedTo}
                          onChange={(e) => setNewAssignedTo(e.target.value)}
                          className='p-1 border-2 border-gray-500 rounded-md'
                        >
                          {employees.map((e) => (
                            <option>{e.employee_name}</option>
                          ))}
                        </select>
                      ) : (
                        t.assigned_to_name
                      )}
                    </td>
                    <td className='px-4 py-2 border'>
                      {new Date(t.assigned_date).toLocaleString()}
                    </td>
                    <td className='px-4 py-2 border'>
                      {new Date(t.end_date).toLocaleString()}
                    </td>

                    <td className='px-4 py-2 border'>
                      {taskTrackerUpdateId === t.id ? (
                        <input
                          type='text'
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className='border-2 border-gray-500 rounded-md pl-1'
                        />
                      ) : (
                        t.status
                      )}
                    </td>
                    <td className='px-4 py-2 border'>
                      {taskTrackerUpdateId === t.id ? (
                        <input
                          type='text'
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className='border-2 border-gray-500 rounded-md pl-1'
                        />
                      ) : (
                        t.comment
                      )}
                    </td>
                    <td className='px-4 py-2 border flex flex-col gap-2'>
                      {taskTrackerUpdateId === t?.id ? (
                        <button
                          onClick={() => handleTaskTrackerUpdate(t)}
                          className='bg-green-500 text-white px-3 py-1 mr-2 rounded hover:bg-green-700 transition-all'
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setTaskTrackerUpdateId(t.id);
                            setNewTask(t.task_name);
                            setNewAssignedBy(t.assigned_by_name);
                            setNewAssignedTo(t.assigned_to_name);
                            setNewStatus(t.status);
                            setNewComment(t.comment);
                          }}
                          className='bg-yellow-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-700 transition-all'
                        >
                          Update
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setSelectedTaskTracker(t);
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

      {addNewTaskTracker && (
        <NewTaskTracker
          addNewTaskTracker={addNewTaskTracker}
          setAddNewTaskTracker={setAddNewTaskTracker}
        />
      )}

      {openDeleteModal && (
        <ConfirmDelete
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          setConfirmDelete={setConfirmDelete}
          text='Task Tracker'
        />
      )}
    </>
  );
}

export default withAuth(TaskTracker);
