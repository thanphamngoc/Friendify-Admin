import axiosClient from './axiosClient';

const usersApi = {
  login: (body) => {
    const url = '/users/login';
    return axiosClient.post(url, body);
  },
};

export default usersApi;
