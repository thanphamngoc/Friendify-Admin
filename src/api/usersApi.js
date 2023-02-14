import axiosClient from './axiosClient';

const usersApi = {
  me: () => {
    const url = '/users/me';
    return axiosClient.get(url);
  },
  login: (body) => {
    const url = '/users/login';
    return axiosClient.post(url, body);
  },
  get: (options) => {
    const url = '/users';
    return axiosClient.get(url, options);
  },
  create: (body) => {
    const url = '/users/registry';
    return axiosClient.get(url, body);
  },
};

export default usersApi;
