import mongoose from "mongoose";
import CardModel from "../models/cardSchema.js";

// Отримання карток для конкретної дошки
const getCardsByBoardId = async (req, res) => {
    console.log('req.params', req.params)
    const { boardId } = req.params;
    try {
        const condition = { boardId
            : new mongoose.Types.ObjectId(boardId) 
        };
// console.log('condition', condition)
        const cards = await CardModel.find(condition);
        console.log('cards', cards)
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cards', error });
    }
};

// Створення нової картки
const createNewCard = async (req, res) => {
    console.log('req', req)
    const { title, description, status, boardId } = req.body;
  
    try {
        const newCard = await CardModel.create({ 
            title, 
            description, 
            status, 
            boardId: new mongoose.Types.ObjectId(boardId)
              });
            console.log('newCard', newCard)
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create card', error });
    }
};

// Оновлення картки
const updateCard = async (req, res) => {
    const { cardId } = req.params;
    const { body } = req;

    try {
        const updatedCard = await CardModel.findByIdAndUpdate(cardId, body, { new: true });
        if (updatedCard) {
            res.status(200).json(updatedCard);
        } else {
            res.status(404).json({ message: 'Card not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update card', error });
    }
};

// Видалення картки
const deleteCard =  async (req, res) => {
    const { cardId } = req.params;

    try {
        const deletedCard = await CardModel.findByIdAndDelete(cardId);
        // console.log('deletedCard', deletedCard)
        if (deletedCard) {
            res.status(200).json({
                message: "Deleted successfully",
              });
        } else {
            res.status(404).json({ message: 'Card not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete card', error });
    }
}
;

export default {
    getCardsByBoardId,
    createNewCard,
    updateCard,
    deleteCard
}