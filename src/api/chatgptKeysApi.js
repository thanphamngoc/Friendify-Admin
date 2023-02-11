import axiosClient from './axiosClient';

const chatgptKeysApi = {
  get: () => {
    const url = '/histories/get-chatGPT-key';
    return axiosClient.get(url);
  },
  add: (body) => {
    const url = '/histories/user-add-chatGPT-key';
    return axiosClient.post(url, body);
  },
};

export default chatgptKeysApi;
