'use client';
import Head from 'next/head';
import DashboardCard from '@/components/core/DashboardCard';
import {
  selectTaskSummary,
  selectEmployeeSummary,
  selectProjectSummary,
} from '@/redux/selectors';
import SummaryGraph from '@/components/charts/TaskSummaryGraph';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { withAuth } from '@/HOC/withAuth';
import { useProjectHooks } from '@/hooks/useProjectHooks';
import { useEmployeeHooks } from '@/hooks/useEmployeeHooks';
import { useTaskHooks } from '@/hooks/useTaskHooks';
import { useRoleHooks } from '@/hooks/useRoleHooks';

function Dashboard() {
  const { fetchProjects } = useProjectHooks();
  const { fetchEmployees } = useEmployeeHooks();
  const { fetchTasks } = useTaskHooks();
  const { fetchRoles } = useRoleHooks();
  const taskSummary = useSelector(selectTaskSummary);
  const employeeSummary = useSelector(selectEmployeeSummary);
  const projectSummary = useSelector(selectProjectSummary);

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
    fetchTasks();
    fetchRoles();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name='description'
          content='Dashboard overview of the application'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='p-4 flex-1'>
        <p className='pl-3 mt-10 md:mt-5 text-3xl font-bold tracking-tight montserrat-bold'>
          DASHBOARD
        </p>
        <div className='w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <DashboardCard
            title='Employee List'
            count={employeeSummary.totalEmployees}
            description='View and manage employee details.'
            link='/dashboard/employee-list'
            color='bg-green-500'
          />
          <DashboardCard
            title='Task Tracker'
            count={taskSummary.totalTasks}
            description='Manage and track tasks efficiently.'
            link='/dashboard/task-tracker'
            color='bg-blue-500'
          />
          <DashboardCard
            title='Project Tracker'
            count={projectSummary.totalProject}
            description='Track and manage ongoing Projects.'
            link='/dashboard/project'
            color='bg-yellow-500'
          />
        </div>
        <section className='mt-8'>
          <SummaryGraph
            taskSummary={taskSummary}
            employeeSummary={employeeSummary}
            projectSummary={projectSummary}
          />
        </section>
      </main>
    </>
  );
}

export default withAuth(Dashboard);
