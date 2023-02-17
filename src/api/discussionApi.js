import axiosClient from './axiosClient';

const discussionApi = {
  get: (options) => {
    const url = '/discussions';
    return axiosClient.get(url, options);
  },
  adminGet: (options) => {
    const url = '/discussions/admin/discussions';
    return axiosClient.get(url, options);
  },
  getById: (id) => {
    const url = `/discussions/${id}`;
    return axiosClient.get(url);
  },
  create: (body) => {
    const url = '/discussions';
    return axiosClient.post(url, body);
  },
  edit: (id, body) => {
    const url = `/discussions/${id}`;
    return axiosClient.put(url, body);
  },
  adminDelete: (id) => {
    const url = `/discussions/admin/discussions/${id}`;
    return axiosClient.delete(url);
  },
  delete: (id) => {
    const url = `/discussions/${id}`;
    return axiosClient.delete(url);
  },
};

export default discussionApi;
