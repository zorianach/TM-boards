import mongoose, { Schema } from 'mongoose';

const boardSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
    // boardId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "boards",
    //     required: true,
    // }
});

const BoardModel = mongoose.model('board', boardSchema)

export default BoardModel;
