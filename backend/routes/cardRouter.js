import express from 'express';
import Card from '../models/cardSchema.js';
import cardController from '../controllers/cardController.js';

const cardRouter = express.Router();

// Отримання карток для конкретної дошки по Id
cardRouter.get('/:boardId/cards', cardController.getCardsByBoardId);

// Створення нової картки
cardRouter.post('/:boardId/card', cardController.createNewCard);

// Оновлення картки
cardRouter.put('/:boardId/card/:cardId', cardController.updateCard);

// Видалення картки
cardRouter.delete('/:boardId/card/:cardId', cardController.deleteCard);

export default cardRouter;
