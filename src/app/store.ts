import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import titleReducer from '../feature/title/titleSlice';
import questionReducer from '../feature/question/questionSlice';

export const store = configureStore({
  reducer: {
    title: titleReducer,
    questions: questionReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
