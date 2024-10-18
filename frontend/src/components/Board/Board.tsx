import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardEditModal } from '../CardEditModal/CardEditModal';
import { addCard, loadCards, removeCard, updateCardDetails } from '../../redux/thunks';
import { selectBoardCards, selectBoardId, selectBoardName } from '../../redux/selectors';
import Column from '../Column/Column'; 
import css from './Board.module.css';

import { BoardProps, CardProps, ColumnStatus } from '../../types';
import { AppDispatch } from '../../redux/store';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


const Board: React.FC<BoardProps> = ({ _id, name, children }) => {
  const dispatch: AppDispatch = useDispatch();
  const boardId = useSelector(selectBoardId); 
  const boardName = useSelector(selectBoardName);
  const cards = useSelector(selectBoardCards(boardId || ''));
  // const cards: CardsState['cards'] = boardId ? allCards : { "todo": [], "inProgress": [], "done": [] };
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editingCardData, setEditingCardData] = useState<{ title: string; description: string; boardId: string }>({ title: '', description: '', boardId: '' });
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);
  const columns = [
    { title: "ToDo", status: "todo" },
    { title: "In Progress", status: "inProgress" },
    { title: "Done", status: "done" }
  ];


  useEffect(() => {
    if (boardId) {
      dispatch(loadCards(boardId));
    }
  }, [dispatch, boardId]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
  // console.log('result', result)
    if (!destination) {
      return; 
    }
  
    const sourceId = source.droppableId as ColumnStatus;
    console.log('sourceId', sourceId)
    const destinationId = destination.droppableId as ColumnStatus;
    console.log('destinationId', destinationId)
  
    if (sourceId === destinationId) {
      const reorderedCards = Array.from(cards[sourceId]);
      const [removed] = reorderedCards.splice(source.index, 1);
      reorderedCards.splice(destination.index, 0, removed);
  
      const updatedCard = { ...removed, status: destinationId };
      try {
        await dispatch(updateCardDetails({ cardId: removed._id, updatedCard }));
        // Оновлюємо картки після оновлення
        if (boardId) {
          await dispatch(loadCards(boardId));
        }
      } catch (error) {
        console.error('Error updating cards in the same column:', error);
      }
    } else {
      // Переміщення картки в іншу колонку
      const cardToMove = cards[sourceId][source.index];
      const updatedCard = { ...cardToMove, status: destinationId };
  
      try {
        await dispatch(updateCardDetails({ cardId: cardToMove._id, updatedCard }));
        if (boardId) {
          await dispatch(loadCards(boardId));
        }
      } catch (error) {
        console.error('Error updating card status:', error);
      }
    }
  };
    
  const handleAddCard = async (title: string, description: string, boardId: string, status: 'todo' | 'inProgress' | 'done') => {
    if (!boardId) {
      console.error("Board ID is not defined.");
      return;
    }
    const newCard: Omit<CardProps, '_id'> & { boardId: string, status: string } = { 
      title, 
      description: description || '-', 
      boardId, 
      status: 'todo'
    };

    try {
      await dispatch(addCard(newCard));
      console.log('Card added successfully');
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!boardId) {
      console.error("Board ID is not defined.");
      return;
    }
    try {
      await dispatch(removeCard({ boardId, cardId }));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleUpdateCard = async (title: string, description: string) => {
    if (!editingCardId) return;
    // console.log('editingCardId', editingCardId);
      // Знаходимо статус картки 
      const cardToUpdate = Object.values(cards).flat().find(card => card._id === editingCardId);

      if (!cardToUpdate) {
        console.error('Card not found');
        return; 
      }
      const status = cardToUpdate.status;
  
      const updatedCard: Omit<CardProps, '_id'> = { 
        title, 
        description, 
        status, 
        boardId: editingCardData.boardId 
      };
        // console.log('updatedCard', updatedCard);
      try {
        // Викликаємо функцію для оновлення картки
         await dispatch(updateCardDetails({ cardId: editingCardId, updatedCard }));
         console.log('Card updated successfully');
        } catch (error) {
          console.error('Error updating card:', error);
        } finally {
          // Закриваємо модальне вікно після збереження
          setEditingCardId(null);
        }
    }
  
  const handleEditClick = (card: CardProps) => {
      setModalPosition({ top: window.innerHeight / 2 - 200, left: window.innerWidth / 2 - 300 });
      console.log('editingCardId', editingCardId) 
      setEditingCardId(card._id);
      setEditingCardData({ title: card.title, description: card.description,  boardId: card.boardId });
  };

  return (
   <DragDropContext onDragEnd={onDragEnd}>
    <div className={css.board_page_container}>
      <h1 className={css.board_title}>
        <span className={css.title_black_part}></span> 
        {boardName}
      </h1>
      
      <div className={css.columns_container}>
      {columns.map((column) => (
        <Column
          key={column.status}
          title={column.title}
          columnId={column.status}
          cards={cards[column.status as 'todo' | 'inProgress' | 'done']}  
          onAddCard={handleAddCard}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteCard}
        />
      ))}
      </div>

      {/* Modal for Editing Card */}
      {editingCardId !== null && modalPosition && (
        <CardEditModal
          isOpen={editingCardId !== null}
          onClose={() => setEditingCardId(null)}
          title={editingCardData.title}
          description={editingCardData.description}
          onSave={handleUpdateCard}
          position={modalPosition}
        />
      )}
    </div>
  );

  </DragDropContext>
);

};

export default Board;

