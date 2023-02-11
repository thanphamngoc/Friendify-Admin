import axiosClient from './axiosClient';

const usersApi = {
  login: (body) => {
    const url = '/users/login';
    return axiosClient.post(url, body);
  },
  get: ({ params }) => {
    const url = '/users';
    return axiosClient.get(url, { params });
  }
};

export default usersApi;
