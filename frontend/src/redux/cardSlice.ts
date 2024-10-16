import { createSlice } from '@reduxjs/toolkit';
import { addCard, getBoardData, loadCards, removeCard, updateCardDetails } from './thunks';
import { CardProps } from '../types';

export interface CardsState {
    cards: 
        {todo: CardProps[];
        inProgress: CardProps[];
        done: CardProps[]};  
    boardId: string | null;
    boardName: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const initialState: CardsState = {
  cards: {
    todo:[],
    inProgress:[],
    done:[]},
  boardId: null,
  boardName: null,
  status: 'idle',
  error: null,
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cards.todo = action.payload.filter(card => card.status === 'todo');
        state.cards.inProgress = action.payload.filter(card => card.status === 'inProgress');
        state.cards.done = action.payload.filter(card => card.status === 'done');
      })
      .addCase(loadCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load cards';
      })
      .addCase(getBoardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boardId = action.payload._id
        state.boardName = action.payload.name
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.cards = {
          ...state.cards,
          todo: [...state.cards.todo, action.payload] };
      })
      .addCase(removeCard.fulfilled, (state, action) => {
        const cardIdToRemove = action.payload;
        state.cards = {
            ...state.cards,
            todo: state.cards.todo.filter(card => card._id !== cardIdToRemove),
            inProgress: state.cards.inProgress.filter(card => card._id !== cardIdToRemove),
            done: state.cards.done.filter(card => card._id !== cardIdToRemove),
        };
      })
      .addCase(updateCardDetails.fulfilled, (state, action) => {
        const { _id, title, description, status } = action.payload;
        const updateCardInArray = (array: CardProps[]) => {
          const index = array.findIndex(card => card._id === _id);
          if (index !== -1) {
            array[index] = { ...array[index], title, description, status };
          }
        };
        updateCardInArray(state.cards.todo);
        updateCardInArray(state.cards.inProgress);
        updateCardInArray(state.cards.done);
      })
      .addCase(updateCardDetails.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update card';
      });
  },
});

export default cardSlice.reducer;