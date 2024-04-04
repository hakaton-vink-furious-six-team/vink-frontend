import { createSlice } from '@reduxjs/toolkit';
import { type State } from '../../../shared/types/State';
import type { RootState } from '../../../app/store/store';

const initialState: State = {
  isOpen: false,
};

const ButtonStateSlice = createSlice({
  name: 'ButtonState',
  initialState,
  reducers: {
    clickButton: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeChat: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { clickButton, closeChat } = ButtonStateSlice.actions;
export const selectIsOpen = (state: RootState) => state.buttonState.isOpen;
export default ButtonStateSlice.reducer;
