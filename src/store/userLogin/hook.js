import { useDispatch, useSelector } from 'react-redux';
import { setUserLogin } from '.';

export const useGetUserLogin = () => {
  return useSelector((state) => state.userLogin.user);
};

export const useSetUserLogin = () => {
  const dispatch = useDispatch();
  const handleSetUserLogin = (data) => {
    dispatch(setUserLogin(data));
  };
  return handleSetUserLogin;
};

export const useUserLogin = () => {
  return {userLogin: useGetUserLogin(), setUserLogin: useSetUserLogin() };
};
