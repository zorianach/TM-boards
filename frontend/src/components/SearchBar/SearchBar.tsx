import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './SearchBar.module.css'
import { BoardProps } from '../../types';
import { useNavigate } from 'react-router-dom';
import { selectAllBoards } from '../../redux/selectors';
import { getBoardData, loadBoards, loadCards } from '../../redux/thunks';
import { AppDispatch } from '../../redux/store';

const SearchBar: React.FC = () => {
  const allBoards = useSelector(selectAllBoards)
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch();  

  const handleSearchQuery = async(searchQuery: string) => {
    if (!allBoards.length) {
      await dispatch(loadBoards());
    }
    try{
        const filteredBoards = allBoards.filter((board: BoardProps) =>
        board.name && board.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // console.log('Filtered boards:', filteredBoards);
    
        if (filteredBoards.length > 0) {
          const boardId = filteredBoards[0]._id; 

          await dispatch(getBoardData(boardId));
          await dispatch(loadCards(boardId)).unwrap();

          navigate(`/board/${boardId}`);
    
        } else {
          alert('No boards found!');
        } 
      } catch (error) {
        console.error("Error searching boards:", error);
        throw error;
      } finally {
        setSearchQuery('')
      }
    }
  return (
    <div className={css.search_container}>
          <input
            type="text"
            className={css.search_input}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search board by name"
          />
          <button className={css.search_button} onClick={() => handleSearchQuery(searchQuery)}>Load</button>
        </div>
  );
};

export default SearchBar;
