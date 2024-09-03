'use client';

import EmployeeTable from '@/components/EmployeeTable';

export default function resourceList() {
  return (
    <div className='mt-10 md:mt-0 flex-1 p-4'>
      <div className='h-full flex flex-col gap-10 sm:items-start p'>
        <div className='flex items-center justify-between w-full'>
          <p className='montserrat-bold text-3xl font-bold tracking-tight'>
            EMPLOYEE LIST
          </p>
        </div>
        <EmployeeTable />
      </div>
    </div>
  );
}
