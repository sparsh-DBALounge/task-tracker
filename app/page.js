'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Home() {
  const { currentUser } = useSelector((state) => state.authSlice);

  return (
    <>
      <Navbar />
      <main className='h-[60vh] flex flex-col items-center justify-center gap-5'>
        <p className='tracking-tight text-4xl text-center lg:text-6xl'>
          Welcome To Task and Resource Tracker
        </p>
        {currentUser && (
          <Link href='/dashboard'>
            <button className='bg-blue-500 text-white px-3 py-2 rounded-md right-5 hover:bg-blue-600 transition-all ease-in-out duration-300'>
              Continue To Dashboard
            </button>
          </Link>
        )}
      </main>
    </>
  );
}
