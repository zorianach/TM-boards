import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import css from './Home.module.css'
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch} from '../../redux/store';
import { addBoard, getBoardData, loadBoards } from '../../redux/thunks';
import { selectAllBoards } from '../../redux/selectors';


const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();  
  const boards = useSelector(selectAllBoards);
    // const [boards, setBoards] = useState<Board[]>([]);
    const [newBoardName, setNewBoardName] = useState('');
    const navigate = useNavigate();


  useEffect(() => {
      dispatch(loadBoards());
  }, [dispatch]);

  const handleCreateBoard = async () => {
  if (newBoardName.trim()) {
    await dispatch(addBoard(newBoardName)); 
    setNewBoardName(''); 
  } else {
    alert('Please enter a board name!');
  }
};

    const enterBoard = async (boardId: string, event:React.MouseEvent<HTMLLIElement>) => {
      console.log('Navigating to board:', boardId);
      if (event.target instanceof HTMLAnchorElement) {
        return; 
      }
      try{ 
        // Завантажуємо дані дошки
        await dispatch(getBoardData(boardId));
    
        setTimeout(() => {
          navigate(`/board/${boardId}`);
        }, 150);
      }catch (error) {
        console.error("Failed to load board data or cards:", error);
      }
       
    };
  

  return (
    <div className={css.home_container} >
       <Header />
      <div className={css.input_container}>
        <input
          className={css.home_input}
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Enter new board name..."
        />
        <button className={css.home_button} onClick={handleCreateBoard}>Create Board</button>
      </div>
      <h2 className={css.home_subtitle}>My Boards</h2>
      <ul className={css.board_list}>
        {boards.map((board) => (
          <li key={board._id} 
          className={css.board_item}
          onClick={(event) => enterBoard(board._id, event)}>
           <Link to={`/board/${board._id}`} className={css.board_link}>{board.name}</Link></li>
        ))}
      </ul>
    
    </div>
  );
};

export default Home;
