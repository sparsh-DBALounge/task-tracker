'use client';

import Button from './Button';
import Logo from '@/public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import pageRoutes from '@/utils/pageRoutes';
import { useSelector } from 'react-redux';
import useAuthHooks from '@/hooks/useAuthHooks';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathName = usePathname();
  const { currentUser } = useSelector((state) => state.authSlice);
  const { logout } = useAuthHooks();

  return (
    <nav
      className='sticky z-[100] h-[70px] inset-0 top-0 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all
    flex items-center justify-between px-4 py-2'
    >
      <Link href={pageRoutes.Home()}>
        <div className='flex items-center gap-1'>
          <Image src={Logo} alt='logo' width={40} className='object-cover' />
          <p className='font-semibold'>
            Task <span className='text-blue-500'>Tracker</span>
          </p>
        </div>
      </Link>

      {/* buttons */}
      <div>
        {currentUser ? (
          <button
            onClick={() => {
              logout();
            }}
            className='bg-gray-400 px-6 py-2 text-white shadow-md hover:bg-black hover:text-white transition-all ease-out duration-300'
          >
            Sign Out
          </button>
        ) : (
          <div className='flex items-center gap-3'>
            <Link href={pageRoutes.SIGNUP_PAGE()}>
              <button
                type='button'
                className={`${
                  pathName === '/signup' ? 'bg-black' : 'bg-gray-400'
                } px-6 py-2 text-white shadow-md hover:bg-black hover:text-white transition-all ease-out duration-300`}
              >
                Signup
              </button>
            </Link>
            <Link href={pageRoutes.LOGIN_PAGE()}>
              <button
                type='button'
                className={`${
                  pathName === '/login' ? 'bg-black' : 'bg-gray-400'
                } px-6 py-2 text-white shadow-md hover:bg-black hover:text-white transition-all ease-out duration-300`}
              >
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
