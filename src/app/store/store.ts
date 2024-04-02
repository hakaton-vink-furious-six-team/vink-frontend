import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ButtonStateSlice from "../../features/OpenChatButton/model/ButtonStateSlice";
import FormStateSlice from "../../features/Form/model/FormStateSlice";

const rootReducer = combineReducers({
  buttonState: ButtonStateSlice,
  formState: FormStateSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;