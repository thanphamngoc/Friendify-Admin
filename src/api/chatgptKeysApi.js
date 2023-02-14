import axiosClient from './axiosClient';

const chatgptKeysApi = {
  get: (options) => {
    const url = '/histories/get-chatGPT-key';
    return axiosClient.get(url, options);
  },
  add: (body) => {
    const url = '/histories/user-add-chatGPT-key';
    return axiosClient.post(url, body);
  },
};

export default chatgptKeysApi;
