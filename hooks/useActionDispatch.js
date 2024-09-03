'use client';

import { useDispatch } from 'react-redux';
import { setUser, logoutUser } from '@/redux/slice/auth.slice';

const useActionDispatch = () => {
  const dispatch = useDispatch();

  return {
    setUser: (payload) => dispatch(setUser(payload)),
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default useActionDispatch;
