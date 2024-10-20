import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { BoardProps, CardProps } from "../types";


// Селектори для дошок (Boards)
export const selectAllBoards = (state: RootState) => state.boards.boards
export const selectBoardById = (state: RootState, boardId: string): BoardProps | undefined => {
    return state.boards.boards.find((board: BoardProps) => board._id === boardId);
  };

// Селектори для карток (Cards)
export const selectBoardCards = (boardId: string) => createSelector(
  [(state: RootState) => state.cards.cards],
  (cards) => ({
    todo: cards.todo.filter((card: CardProps) => card.boardId === boardId),
    inProgress: cards.inProgress.filter((card: CardProps) => card.boardId === boardId),
    done: cards.done.filter((card: CardProps) => card.boardId === boardId),
  })
);

export const selectBoardId = (state: RootState) => state.cards.boardId;
export const selectBoardName = (state: RootState) => state.cards.boardName;

export const selectCardsStatus = (state: RootState) => state.cards.status;
export const selectCardsError = (state: RootState) => state.cards.error;

