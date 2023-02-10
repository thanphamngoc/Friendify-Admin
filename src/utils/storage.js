/**
 * Handle get/set user token
 * @type {{get: (function()), set: (function(*=))}}
 */
export const USER_TOKEN = {
  get: () => localStorage?.getItem('userToken'),
  set: (newValue) => {
    localStorage?.setItem('userToken', newValue.includes('Bearer') ? newValue : `Bearer ${newValue}`);
  },
  delete: () => localStorage?.removeItem('userToken'),
};