import mongoose, { Schema } from 'mongoose';

// Схема для картки
const cardSchema = new Schema({
    title: { 
        type: String, 
        required: true },
    description: { 
        type: String, 
        required: true },
    status: { 
        type: String, 
        enum: ['todo', 'inProgress', 'done'], 
        required: true, 
        default: 'todo'},
    boardId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'board', 
        required: true }
});

const CardModel = mongoose.model('card', cardSchema)

export default CardModel;
