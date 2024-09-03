import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export function withAuth(Component) {
  return function withAuth(props) {
    const { currentUser } = useSelector((state) => state.authSlice);
    const router = useRouter();

    if (!currentUser) {
      router.push('/login');
    } else {
      return <Component {...props} />;
    }
  };
}
