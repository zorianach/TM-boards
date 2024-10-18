import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBoard, createCard, deleteBoard, deleteCard, fetchBoardById, fetchBoards, fetchCardsByBoardId, updateCard } from "../api/api";
import { CardProps } from "../types";

//Board thunks

export const loadBoards = createAsyncThunk('boards/fetchBoards', async (_, { rejectWithValue }) => {
  try{
    const response = await fetchBoards();
    // console.log('response', response)
    return response;
  } catch (error) {
    console.error("Error fetching board title:", error);
    if (error instanceof Error && (error as any).response) {
      return rejectWithValue((error as any).response.data || 'Failed to fetch board title');
    }
    return rejectWithValue('Unknown error occurred');
  }
});

export const getBoardData = createAsyncThunk('boards/fetchBoardById',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await fetchBoardById(boardId);
      // console.log('response', response)
      return {
        _id: response._id,
        name: response.name
      };
    } catch (error) {
      console.error("Error fetching board title:", error);
      if (error instanceof Error && (error as any).response) {
        return rejectWithValue((error as any).response.data || 'Failed to fetch board title');
      }
      return rejectWithValue('Unknown error occurred');
    }
  }
);

export const addBoard = createAsyncThunk('boards/addBoard', async (name: string, { rejectWithValue }) => {
  try{
    const response = await createBoard(name);
    return response;
  }catch (error) {
    console.error("Error fetching board title:", error);
    if (error instanceof Error && (error as any).response) {
      return rejectWithValue((error as any).response.data || 'Failed to fetch board title');
    }
    return rejectWithValue('Unknown error occurred');
  }
 
});

export const removeBoard = createAsyncThunk('boards/deleteBoard', async (id: string, { rejectWithValue }) => {
  try{
    await deleteBoard(id);
    return id;
  }catch (error) {
    console.error("Error fetching board title:", error);
    if (error instanceof Error && (error as any).response) {
      return rejectWithValue((error as any).response.data || 'Failed to fetch board title');
    }
    return rejectWithValue('Unknown error occurred');
  }
});

//Cards thunks
export const loadCards = createAsyncThunk('cards/fetchCards', async (boardId: string, { rejectWithValue }) => {
  try{
    const response = await fetchCardsByBoardId(boardId);
    console.log('load response', response)
    return response;
  } catch (error) {
    console.error("Error fetching board title:", error);
    if (error instanceof Error && (error as any).response) {
      return rejectWithValue((error as any).response.data || 'Failed to fetch board title');
    }
    return rejectWithValue('Unknown error occurred');
  }
 
  
});

export const addCard = createAsyncThunk('cards/addCard', async (cardData: Omit<CardProps, '_id'>, { rejectWithValue }) => {
  try{
    // console.log('cardData', cardData)
  const response = await createCard(cardData.boardId, cardData);
  return response;}
  catch (error) {
    console.error("Error fetching board title:", error);
    if (error instanceof Error && (error as any).response) {
      return rejectWithValue((error as any).response.data || 'Failed to fetch board title');
    }
    return rejectWithValue('Unknown error occurred');
  }
});

export const removeCard = createAsyncThunk('cards/deleteCard', async ({ boardId, cardId }: { boardId: string, cardId: string }, { rejectWithValue }) => {
  try{
    await deleteCard(boardId, cardId);
  return cardId;
}catch (error) {
    console.error("Error fetching board title:", error);
    if (error instanceof Error && (error as any).response) {
      return rejectWithValue((error as any).response.data || 'Failed to fetch board title');
    }
    return rejectWithValue('Unknown error occurred');
  }
});

export const updateCardDetails = createAsyncThunk('cards/updateCard', async ({ cardId, updatedCard }: { cardId: string, updatedCard: Omit<CardProps, '_id'> }, { rejectWithValue }) => {
  try{
    const response = await updateCard(cardId, updatedCard);
    // console.log('response', response)
    return response;
  } catch (error) {
    console.error("Error fetching board title:", error);
    if (error instanceof Error && (error as any).response) {
      return rejectWithValue((error as any).response.data || 'Failed to fetch board title');
    }
    return rejectWithValue('Unknown error occurred');
  }
});