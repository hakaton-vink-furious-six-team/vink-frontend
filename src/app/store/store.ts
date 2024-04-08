import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ButtonStateSlice from '../../features/OpenChatButton/model/ButtonStateSlice';
import FormStateSlice from '../../features/Form/model/FormStateSlice';
import AssesmentStateSlice from '../../features/Assessment/model/AssesmentStateSlice';
import chatNameSlice from '../../entity/chatName/chatNameSlice';

const rootReducer = combineReducers({
  buttonState: ButtonStateSlice,
  formState: FormStateSlice,
  chatName: chatNameSlice,
  assesmentState: AssesmentStateSlice
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
