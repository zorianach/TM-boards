import React, { useEffect } from 'react';
import { 
  Outlet,
  useNavigate,
  useParams } from 'react-router-dom';
import Board from '../../components/Board/Board';
import Header from '../../components/Header/Header';
import css from './BoardPage.module.css'
import SearchBar from '../../components/SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoardName } from '../../redux/selectors';
import { AppDispatch } from '../../redux/store';
import { getBoardData } from '../../redux/thunks';


const BoardPage: React.FC = () => {
  const boardName = useSelector(selectBoardName)
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();  

  const { id } = useParams<{ id: string }>();

    useEffect(() => {
    if (id) {
      dispatch(getBoardData(id));
      // dispatch(loadCards(id));
    }
  }, [dispatch, id]);

  if (!id) {
    throw new Error('Board ID is required');
  }
  
  const handleGoBack = () => {
    navigate('/');
  };
  return (
    <div className={css.board_page_container}>
    <Header/>
      <div className={css.board_container}>
        <button 
          className={css.back_button}   
          onClick={handleGoBack}> &larr; Back to Boards</button> 
          <SearchBar/>
          <Board _id={id} name={boardName}>
            <Outlet/>
          </Board>
 
      </div>
    </div>
  );
};

export default BoardPage;
