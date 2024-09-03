'use client';

import React, { useState } from 'react';
import { Drawer } from 'antd';
import { useEffect } from 'react';
import { sidebarLinks } from '@/constants';
import Link from 'next/link';
import useAuthHooks from '@/hooks/useAuthHooks';

const App = ({ openDrawer, setOpenDrawer }) => {
  const [open, setOpen] = useState(openDrawer);
  const { logout } = useAuthHooks();

  useEffect(() => {
    setOpen(openDrawer);
  }, [openDrawer]);

  const onClose = () => {
    setOpen(false);
    setOpenDrawer(false);
  };

  return (
    <>
      <Drawer width={250} onClose={onClose} open={open} placement='left'>
        <div className='h-full relative w-[200px] lg:w-[250px] flex flex-col items-center gap-10 '>
          {sidebarLinks.map((n, idx) => (
            <Link href={n.path} key={`nav-link__${idx}`}>
              <button className='w-[180px] flex justify-center bg-gray-500 px-5 py-2 text-white shadow-md hover:bg-black transition-all ease-in-out duration-300'>
                {/* <img src={n.icon} alt={n.label} width={30} /> */}
                <span>{n.label}</span>
              </button>
            </Link>
          ))}

          <button
            onClick={() => {
              logout();
            }}
            className='absolute bottom-3 w-[180px] flex justify-center bg-red-500 px-5 py-2 text-white shadow-md hover:bg-red-600 transition-all ease-in-out duration-300'
          >
            {/* <img src='/logout.png' alt='logout' width={30} /> */}
            <p>Logout</p>
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default App;
