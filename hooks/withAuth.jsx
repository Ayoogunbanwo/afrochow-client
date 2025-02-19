import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const auth = localStorage.getItem('auth');
      if (!auth) {
        router.push('/customer');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
