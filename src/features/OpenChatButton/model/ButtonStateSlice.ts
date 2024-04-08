import { createSlice } from '@reduxjs/toolkit';
import { type State } from '../../../shared/types/State';
import type { RootState } from '../../../app/store/store';

const initialState: State = {
  isOpen: false,
  isAssesment: false,
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
    setSubmitted: state => {
      state.isAssesment = !state.isAssesment;
      state.isOpen = !state.isOpen;
    },
  },
});

export const { clickButton, closeChat, setSubmitted } = ButtonStateSlice.actions;
export const selectIsOpen = (state: RootState) => state.buttonState.isOpen;
export const selectIsAssesment = (state: RootState) => state.assesmentState.isAssesment;
export default ButtonStateSlice.reducer;
