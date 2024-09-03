import useActionDispatch from './useActionDispatch';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import pageRoutes from '@/utils/pageRoutes';

const useAuthHooks = () => {
  const router = useRouter();
  const { logoutUser, setUser } = useActionDispatch();

  const signup = async (formData, e) => {
    try {
      const res = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      toast.success(data);
      router.push(pageRoutes.LOGIN_PAGE());
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (formData, e) => {
    try {
      const res = await fetch('http://localhost:3000/userLogin', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      toast.success('login successful');
      setUser(data);
      router.push(pageRoutes.DASHBOARD());
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    logoutUser();
    router.push(pageRoutes.Home());
    toast.success('Logged Out');
  };

  return { signup, login, logout };
};

export default useAuthHooks;
