import express from 'express';
import boardController from '../controllers/boardController.js';

const boardsRouter = express.Router();

// Маршрут для отримання всіх дошок
boardsRouter.get('/boards', boardController.getAllBoards);

// Маршрут для отримання назви дошки
boardsRouter.get('/board/:boardId', boardController.getBoardDataById);

// // Маршрут для пошуку дошки за назвою
// boardsRouter.get('/boards/search', { params: { name } }, boardController.getBoardDataByName);

// Маршрут для створення нової дошки
boardsRouter.post('/boards', boardController.createNewBoard);

export default boardsRouter;
