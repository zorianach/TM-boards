import BoardModel from "../models/boardSchema.js";

// Отримання всіх дошок з бази даних
const getAllBoards = async (req, res) => {
    try{
        const boards = await BoardModel.find(); 
        if (!boards) {
            throw HttpError(404, `Not found`);
        }
        // console.log('boards', boards)
        res.status(200).json(boards);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching boards', error });
      }
    }
// Отримання даних про дошку по ID
const getBoardDataById = async (req, res) => {
  const { boardId } = req.params;
  try{
    // const condition = { boardId: new mongoose.Types.ObjectId(boardId) };
    const board = await BoardModel.findById(boardId);
    console.log('board', board);
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: 'Failed to find board', error });
  }
  };

// Отримання даних про дошку по назві(Search Bar)
const getBoardDataByName = async (req, res) => {
  const { name } = req.params;
  try{
    // const condition = { boardId: new mongoose.Types.ObjectId(boardId) };
    const board = await BoardModel.find(boardId);
    console.log('board', board);
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: 'Failed to find board', error });
  }
  };

// Створюємо нову дошку і зберігаємо її в базу даних
const createNewBoard = async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Board name is required' });
    }
  
    try {
        const createdBoard = await BoardModel.create({name});
        // console.log('createdBoard', createdBoard)
        res.status(201).json(createdBoard);
    } catch (error) {
      res.status(500).json({ message: 'Error creating board', error });
    }
  };

  export default {
    getAllBoards,
    createNewBoard, 
    getBoardDataById,
    getBoardDataByName
  }