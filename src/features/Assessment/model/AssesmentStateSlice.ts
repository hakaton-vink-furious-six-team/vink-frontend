import { createSlice } from '@reduxjs/toolkit'
import { type Assesment } from '../../../shared/types/Assesment';
import type { RootState } from '../../../app/store/store';


const initialState: Assesment = {
  isAssesment: false,
}

const AssesmentStateSlice = createSlice({
  name: 'AssesmentState',
  initialState,
  reducers: {
    setSubmitted: state => {
      state.isAssesment = !state.isAssesment;
    },
  },
});

export const { setSubmitted } = AssesmentStateSlice.actions;
export const selectIsAssesment = (state: RootState) => state.assesmentState.isAssesment;
export default AssesmentStateSlice.reducer;