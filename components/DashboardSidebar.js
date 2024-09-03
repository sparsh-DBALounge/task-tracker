'use client';

import Link from 'next/link';
import useAuthHooks from '@/hooks/useAuthHooks';
import Image from 'next/image';
import menuBars from '@/public/menu-bars.png';
import SidebarDrawer from './SidebarDrawer';
import { useState } from 'react';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';

const DashboardSidebar = () => {
  const pathName = usePathname();
  const { logout } = useAuthHooks();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      {openDrawer && (
        <SidebarDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      )}

      <div className='block md:hidden absolute left-3 top-3 z-[100]'>
        <Image
          onClick={() => {
            setOpenDrawer(true);
          }}
          src={menuBars}
          width={30}
          className='shadow-md p-1 border rounded-md cursor-pointer'
        />
      </div>

      <div className='w-[200px] lg:w-[250px] px-2 shadow-2xl hidden md:flex flex-col items-center gap-10 pt-10 bg-gray-400/50'>
        <div className='h-[94vh] flex flex-col gap-5 sticky top-5'>
          {sidebarLinks.map((n, idx) => (
            <Link href={n.path} key={`nav-link__${idx}`}>
              <button
                className={`${
                  pathName === n.pathName ? 'bg-black' : 'bg-gray-500'
                } w-[180px] flex items-center justify-between  px-3 py-2 text-white shadow-xl hover:bg-black transition-all ease-in-out duration-300`}
              >
                <Image src={n.icon} width={25} height={25} alt={n.label} />
                <span>{n.label}</span>
              </button>
            </Link>
          ))}

          <button
            onClick={() => {
              logout();
            }}
            className='flex justify-between absolute bottom-4 w-[180px] bg-red-500 px-5 py-2 text-white shadow-xl hover:bg-red-600 transition-all ease-in-out duration-300'
          >
            <Image src='/logout.png' width={25} height={25} alt='logout' />
            <p>Logout</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
