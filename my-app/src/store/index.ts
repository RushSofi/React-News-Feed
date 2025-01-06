import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../store/slices/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

store.subscribe(() => {
  console.log('Store изменился:', store.getState());
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
