import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import chatReducer from '../features/chatslice';

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});
