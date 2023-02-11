import axiosClient from './axiosClient';

const usersApi = {
  login: (body) => {
    const url = '/users/login';
    return axiosClient.post(url, body);
  },
  get: ({ params }) => {
    const url = '/users';
    return axiosClient.get(url, { params });
  },
  create: (body) => {
    const url = '/users/registry';
    return axiosClient.get(url, body);
  },
};

export default usersApi;
