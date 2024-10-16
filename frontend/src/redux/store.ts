import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';
import cardReducer from './cardSlice';

const store = configureStore({
  reducer: {
    boards: boardReducer,
    cards: cardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;