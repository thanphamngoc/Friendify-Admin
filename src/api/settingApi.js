import axiosClient from './axiosClient';

const settingApi = {
  get: (key) => {
    const url = '/users/admin-setting';
    return axiosClient.get(url, { params: { key } });
  },
  update: (body) => {
    const url = '/users/admin-setting';
    return axiosClient.put(url, body);
  },
};

export default settingApi;
