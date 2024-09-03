import DashboardSidebar from '@/components/DashboardSidebar';

export default function dashboardLayout({ children }) {
  return (
    <div className='flex w-full'>
      <DashboardSidebar />
      {children}
    </div>
  );
}
