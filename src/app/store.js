import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import projectReducer from '../features/project/projectSlice';
import authReducer from '../features/auth/authSlice';

   
  


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    project: projectReducer,
     auth: authReducer,
  },
});
