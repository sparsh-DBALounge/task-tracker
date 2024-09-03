'use client';

import Button from '@/components/Button';
import { useState } from 'react';
import useAuthHooks from '@/hooks/useAuthHooks';
import toast from 'react-hot-toast';
import Link from 'next/link';
import pageRoutes from '@/utils/pageRoutes';
import Navbar from '@/components/Navbar';

export default function Signup() {
  const { signup } = useAuthHooks();

  const [formData, setFormData] = useState({
    employee_name: '',
    phone: '',
    email: '',
    password: '',
  });

  const { employee_name, phone, email, password } = formData;

  const handleInputChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    if (
      employee_name === '' ||
      phone === '' ||
      email === '' ||
      password === ''
    ) {
      toast.error('All Fields are Required');
      return;
    }

    signup(formData, e);
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className='max-w-xl mx-auto mt-5 p-2 flex flex-col gap-5 items-center'
      >
        <p className='text-3xl font-semibold tracking-tight'>Signup</p>

        <div className='w-3/4 mt-2'>
          <p className='text-lg'>
            Employee Name <span className='text-red-500'>*</span>{' '}
          </p>
          <input
            value={employee_name}
            id='employee_name'
            required
            onChange={handleInputChange}
            className='border-2 w-full p-1 shadow-sm rounded-md focus:outline-none text-lg'
          />
        </div>

        <div className='w-3/4'>
          <p className='text-lg'>
            Phone <span className='text-red-500'>*</span>{' '}
          </p>
          <input
            value={phone}
            id='phone'
            onChange={handleInputChange}
            className='border-2 w-full p-1 shadow-sm rounded-md focus:outline-none text-lg'
          />
        </div>

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
          />
        </div>

        <div className='w-3/4'>
          <p className='text-lg'>
            Password <span className='text-red-500'>*</span>{' '}
          </p>
          <input
            id='password'
            type='password'
            value={password}
            onChange={handleInputChange}
            className='border-2 w-full p-1 shadow-sm rounded-md focus:outline-none text-lg'
          />
        </div>

        <p>
          Alread a user?{' '}
          <Link
            href={pageRoutes.LOGIN_PAGE()}
            className='text-blue-500 font-semibold'
          >
            Login
          </Link>
        </p>

        <Button
          type='submit'
          text='signup'
          className='bg-blue-400 px-6 py-2 text-white shadow-md hover:bg-blue-600 hover:text-white transition-all ease-out duration-300'
        />
      </form>
    </>
  );
}
