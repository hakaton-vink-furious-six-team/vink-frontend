import { createSlice } from "@reduxjs/toolkit";
import { postForm } from "../../shared/api/formApi";
import type { RootState } from "../../app/store/store";

interface SliceState {
  chatName: null;
  loading: boolean;
  error: null | string;
}

const initialState: SliceState = {
  chatName: null,
  loading: false,
  error: null,
};

const chatNameSlice = createSlice({
  name: 'chatName',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // Редуктор для начала отправки формы
      .addCase(postForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Редуктор для успешного завершения отправки формы
      .addCase(postForm.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.chatName = action.payload;// Сохраняем данные о chat_name
      })
      // Редуктор для ошибки при отправке формы
      .addCase(postForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
})


export const chatNameValue = (state: RootState) => state.chatName.chatName;
export default chatNameSlice.reducer;