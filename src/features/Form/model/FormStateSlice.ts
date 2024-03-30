import { createSlice } from '@reduxjs/toolkit'
import { type State } from '../../../shared';
import type { RootState } from '../../../app/store/store';


const initialState: State = {
  isOpen: false,
}

const FormStateSlice = createSlice({
  name: 'FormState',
  initialState,
  reducers: {
    setSubmitted: state => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setSubmitted } = FormStateSlice.actions;
export const selectIsSubmitted = (state: RootState) => state.formState.isOpen;
export default FormStateSlice.reducer;