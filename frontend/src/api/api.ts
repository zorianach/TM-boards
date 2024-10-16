import axios from "axios";
// import { Card } from '../page/BoardPage/BoardPage'
import { CardProps } from "../types";

const BASE_URL = 'http://localhost:8080/api';

// Функція для отримання всіх дошок
export const fetchBoards = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/boards`);
    return response.data;
  } catch (error) {
    console.error("Error fetching boards:", error);
    throw error;
  }
};

// Функція для створення нової дошки
export const createBoard = async (name: string) => {
  try{ 
    const response = await axios.post(`${BASE_URL}/boards`, { name });
    return response.data;
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  };
};

// Отримання назви дошки
export const fetchBoardById = async (boardId: string): Promise<{ name: string, _id: string }> => {
  try{
    const response = await axios.get(`${BASE_URL}/board/${boardId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching board title:", error);
    throw error;
  };
};

// Видалення дошки
export const deleteBoard =async (boardId: string) => {
   return boardId;
}

// Отримання всіх карток дошки за ID дошки
export const fetchCardsByBoardId = async (boardId: string): Promise<CardProps[]> => {
  try
 { const response = await axios.get(`${BASE_URL}/board/${boardId}/cards`);
  return response.data;
}catch (error) {
  console.error("Error fetching cards:", error);
  throw error;
};
}

// // Пошук дошки за назвою 
// export const searchBoardByName = async (name: string) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/boards/search`, { params: { name } });
//     return response.data;
//   } catch (error) {
//     console.error("Error searching board:", error);
//     throw error;
//   }
// };

// Створення нової картки
export const createCard = async (boardId: string, cardData: Omit<CardProps, '_id'>) => {
  try 
 { const response = await axios.post(`${BASE_URL}/board/${boardId}/card`, cardData);
 console.log('response', response)
  return response.data;
}catch (error) {
  console.error("Error creating new card:", error);
  throw error;
};
};

// Редагування картки
export const updateCard = async (cardId: string, cardData: Omit<CardProps, '_id'>) => {
  try
  {const response = await axios.put(`${BASE_URL}/board/${cardData.boardId}/card/${cardId}`, cardData);
  return response.data;}
  catch (error) {
    console.error("Error updating card:", error);
    throw error;
  };
};

// Видалення картки
export const deleteCard = async (boardId: string, cardId: string) => {
  try
{  await axios.delete(`${BASE_URL}/board/${boardId}/card/${cardId}`);
}  catch (error) {
    console.error("Error deleting card:", error);
    throw error;
  };
};
