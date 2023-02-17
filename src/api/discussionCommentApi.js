import axiosClient from './axiosClient';

const discussionCommentApi = {
  get: (options) => {
    const url = '/discussions-comment';
    return axiosClient.get(url, options);
  },
  delete: (id) => {
    const url = `/discussions-comment/${id}`;
    return axiosClient.delete(url);
  },
};

export default discussionCommentApi;
