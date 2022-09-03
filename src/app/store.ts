import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../feature/posts/postsSlice';
import titleReducer from '../feature/title/titleSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    title: titleReducer
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
