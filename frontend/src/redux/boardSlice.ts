import { createSlice, } from '@reduxjs/toolkit';
import { addBoard, loadBoards, removeBoard } from './thunks';

interface Board {
  _id: string;
  name: string;
}

interface BoardState {
  boards: Board[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BoardState = {
  boards: [],
  status: 'idle',
  error: null,
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBoards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadBoards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boards = action.payload;
      })
      .addCase(loadBoards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load boards';
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter((board) => board._id !== action.payload);
      });
  },
});

export default boardSlice.reducer;