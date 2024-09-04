'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import NewTaskModal from '@/components/modals/NewTaskModal';
import TaskDetails from '@/components/modals/TaskDetails';
import { withAuth } from '@/HOC/withAuth';
import toast from 'react-hot-toast';
import ConfirmDelete from '@/components/modals/ConfirmDelete';
import { useTaskHooks } from '@/hooks/useTaskHooks';

function Task() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.taskSlice);
  const { fetchTasks, deleteTaskDB, updateTaskDB } = useTaskHooks();
  const [updateTaskId, setUpdateTaskId] = useState(null);
  const [newTaskName, setnewTaskName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [addNewTask, setAddNewTask] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showTaskDetailsId, setShowTaskDetailsId] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (confirmDelete && selectedTask) {
      deleteTaskDB(selectedTask.id);
      toast('Task Deleted', {
        style: {
          fontWeight: 'bold',
          fontSize: '18px',
        },
      });
      setConfirmDelete(false);
    }
  }, [confirmDelete, selectedTask, dispatch]);

  const handleTaskNameChange = (e) => {
    setnewTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleTaskUpdate = (id) => {
    const updatedTask = {
      taskName: newTaskName,
      description: newDescription,
    };
    updateTaskDB(id, updatedTask);
    toast.success('Task Updated');
    setUpdateTaskId(null);
    setnewTaskName('');
    setNewDescription('');
  };

  return (
    <>
      <div className='flex-1'>
        <p className='pl-3 mt-20 md:mt-5 text-3xl font-bold tracking-tight montserrat-bold'>
          TASK LIST
        </p>

        <div className='max-w-6xl relative mx-auto px-5'>
          <div className='absolute -mt-[60px] right-5 flex items-center gap-2'>
            <button
              onClick={() => setAddNewTask(true)}
              className='bg-blue-500 text-white px-3 py-2 rounded-md right-5 hover:bg-blue-600 transition-all ease-in-out duration-300'
            >
              Add New Task
            </button>
          </div>
          <table className='w-full border-collapse mt-20'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border px-4 py-2 text-left'>Task</th>
                <th className='border px-4 py-2 text-left'>Description</th>
                <th className='border px-4 py-2 text-left'>Created Date</th>
                <th className='border px-4 py-2 text-center'>Action</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className='hover:bg-gray-100'>
                  <td className='border px-4 py-2'>
                    {updateTaskId === task.id ? (
                      <input
                        value={newTaskName}
                        onChange={handleTaskNameChange}
                        className='p-1 border-2 border-gray-500 rounded-md w-full'
                      />
                    ) : (
                      task.taskName
                    )}
                  </td>
                  <td className='border px-4 py-2'>
                    {updateTaskId === task.id ? (
                      <input
                        value={newDescription}
                        onChange={handleDescriptionChange}
                        className='p-1 border-2 border-gray-500 rounded-md w-full'
                      />
                    ) : (
                      task.description
                    )}
                  </td>
                  <td className='border px-4 py-2'>
                    {new Date(task.created_at).toLocaleDateString()}
                  </td>
                  <td className='border px-4 py-2 flex flex-col gap-2 md:flex-row md:justify-center'>
                    {updateTaskId === task.id ? (
                      <button
                        onClick={() => handleTaskUpdate(task.id)}
                        className='bg-green-500 text-white px-3 py-1 mr-2 rounded hover:bg-green-700 transition-all'
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setnewTaskName(task.taskName);
                          setNewDescription(task.description);
                          setUpdateTaskId(task.id);
                        }}
                        className='bg-yellow-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-700 transition-all'
                      >
                        Update
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setShowTaskDetails(true);
                        setShowTaskDetailsId(task.id);
                      }}
                      className='bg-blue-500 text-white px-3 py-1 mr-2 rounded hover:bg-blue-700 transition-all'
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setSelectedTask(task);
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
      {addNewTask && (
        <NewTaskModal addNewTask={addNewTask} setAddNewTask={setAddNewTask} />
      )}
      {showTaskDetails && (
        <TaskDetails
          taskId={showTaskDetailsId}
          showTaskDetails={showTaskDetails}
          setShowTaskDetails={setShowTaskDetails}
        />
      )}
      {openDeleteModal && (
        <ConfirmDelete
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          setConfirmDelete={setConfirmDelete}
          text='Task'
        />
      )}
    </>
  );
}

export default withAuth(Task);
