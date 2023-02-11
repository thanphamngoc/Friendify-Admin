import { configureStore } from '@reduxjs/toolkit';

import userLoginReducer from './userLogin';

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
  },
});

export default store;
