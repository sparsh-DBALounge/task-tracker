'use client';

import Button from '@/components/Button';
import useAuthHooks from '@/hooks/useAuthHooks';
import { useState } from 'react';
import Link from 'next/link';
import pageRoutes from '@/utils/pageRoutes';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuthHooks();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleInputChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast.succe('All Fields are Required');
      return;
    }
    login(formData, e);
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className='max-w-xl mx-auto mt-10 p-2 flex flex-col gap-8 items-center'
      >
        <p className='text-3xl font-semibold tracking-tight'>Login</p>

        <div className='w-3/4'>
          <p className='text-lg'>
            Email <span className='text-red-500'>*</span>{' '}
          </p>
          <input
            value={email}
            id='email'
            onChange={handleInputChange}
            type='email'
            className='border-2 w-full p-1 shadow-sm rounded-md focus:outline-none text-lg'
            required
          />
        </div>

        <div className='w-3/4'>
          <p className='text-lg'>
            Password <span className='text-red-500'>*</span>{' '}
          </p>
          <input
            value={password}
            id='password'
            onChange={handleInputChange}
            type='password'
            className='border-2 w-full p-1 shadow-sm rounded-md focus:outline-none text-lg'
            required
          />
        </div>

        <p>
          New user?{' '}
          <Link
            href={pageRoutes.SIGNUP_PAGE()}
            className='text-blue-500 font-semibold'
          >
            Signup
          </Link>
        </p>

        <Button
          type='submit'
          text='Login'
          className='bg-blue-400 px-6 py-2 text-white shadow-md hover:bg-blue-600 hover:text-white transition-all ease-out duration-300'
        />
      </form>
    </>
  );
}
