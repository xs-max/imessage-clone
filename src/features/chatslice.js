import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatId: null,
    chatName: null,
    show: false
  },
  reducers: {
    setChat: (state, action) => {
      
      state.chatId = action.payload.chatId;
      state.chatName = action.payload.chatName;
    },
    setShow: (state) => {
      state.show = !state.show;
    }
  },
});

export const { setChat, setShow } = chatSlice.actions;

export const selectChatName = state => state.chat.chatName;
export const selectChatId = state => state.chat.chatId;
export const selectShow = state => state.chat.show;

export default chatSlice.reducer;
