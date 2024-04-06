import { createSlice } from "@reduxjs/toolkit";
import { postForm } from "../../shared/api/formApi";

interface SliceState {
  data: null;
  loading: boolean;
  error: null | string;
}

const initialState: SliceState = {
  data: null,
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
        state.data = action.payload; // Сохраняем данные о chat_name
      })
      // Редуктор для ошибки при отправке формы
      .addCase(postForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
})

export default chatNameSlice.reducer;