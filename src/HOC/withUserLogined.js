import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { USER_TOKEN } from 'utils/storage';
import usersApi from 'api/usersApi';
import { locations } from 'Routes';
import { useSetUserLogin } from 'store/userLogin/hook';

export default (WrappedComponent) => function UserLogined({ ...props }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const setUserLogin = useSetUserLogin();

  useEffect(() => {
    const checkUserLogin = async () => {
      const userToken = USER_TOKEN.get();
      if (userToken) {
        try {
          const res = await usersApi.me();
          setUserLogin(res);
        } catch (e) {
          console.error(e);
          navigate('/login');
        }
        if (pathname === locations.login) {
          navigate(locations.home);
        }
      } else {
        setUserLogin(undefined);
        navigate(locations.login);
      }
    };
    checkUserLogin();
    window.addEventListener('storage', checkUserLogin);
    return () => {
      window.removeEventListener('storage', checkUserLogin);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <WrappedComponent {...props} />;
};
