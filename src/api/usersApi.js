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
  getById: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  create: (body) => {
    const url = '/users/registry';
    return axiosClient.post(url, body);
  },
  edit: (id, body) => {
    const url = `/users/${id}`;
    return axiosClient.put(url, body);
  },
};

export default usersApi;
