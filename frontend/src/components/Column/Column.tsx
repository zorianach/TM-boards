import React, { useState } from 'react';
import { CardProps } from '../../types'; 
import css from './Column.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectBoardId } from '../../redux/selectors';
// // import { addCard } from '../../redux/thunks';
// import { useSelector } from 'react-redux';
// import { selectBoardId } from '../../redux/selectors';

interface ColumnProps {
  title: string;
  cards: CardProps[];
  onAddCard: (title: string, description: string, boardId: string, status: 'todo' | 'inProgress' | 'done') => void;
  onEditClick: (card: CardProps) => void;
  onDeleteClick: (cardId: string) => Promise<void>;
}

const Column: React.FC<ColumnProps> = ({ title, cards, onAddCard, onEditClick, onDeleteClick }) => {
  const boardId = useSelector(selectBoardId)
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');

  const handleAddClick = async () => {
    if(!newCardTitle){
      alert('Card title is required')
      return;
    }
    if (!boardId) {
      console.error("Board ID is not defined.");
      return;
    }
    try{ 
      await onAddCard(newCardTitle, newCardDescription, boardId, title.toLowerCase() as 'todo' | 'inProgress' | 'done');
    setNewCardTitle('');
    setNewCardDescription(''); 
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  // const handleAddCard = async (status: keyof typeof cards) => {
  //   if (!boardId) {
  //     console.error("Board ID is not defined.");
  //     return;
  //   }
  //   const newCard: Omit<CardProps, '_id'> & { boardId: string } = { 
  //     title: newCardTitle, 
  //     description: newCardDescription, 
  //     status: 'todo',
  //     boardId};
      
  //     await onAddCard(newCardTitle, newCardDescription, title.toLowerCase() as 'todo' | 'inProgress' | 'done');
  //     setNewCardTitle('');
  //     setNewCardDescription('');
  //   // try {
  //   //     // Виклик функції для створення картки
  //   //   const createdCard = await addCard(newCard); 
  //   //   console.log('createdCard', createdCard)
  //   //   setNewCardTitle('');
  //   //   setNewCardDescription('');
  //   // } catch (error) {
  //   //   console.error('Error creating card:', error);
  //   // }
  // }; 

  return (
    <div className={css.column_container}>
      <h2 className={css.column_title}>{title}</h2>
      <div className={css.column_box}>
          {cards.map((card) => (
            <div className={css.card_item} key={card._id}>
              <h3 className={css.card_title}>{card.title}</h3>
              <p className={css.card_decription}>{card.description}</p>
              <div className={css.icons_box}>
              <button onClick={() => onEditClick(card)} className={css.icon_button}>
                <FontAwesomeIcon icon={faEdit} className={css.icon} />
              </button>
              <button onClick={() => onDeleteClick(card._id)} className={css.icon_button}>
                <FontAwesomeIcon icon={faTrash} className={css.icon} />
              </button>
              </div>
            </div>
          ))}
            {title === "ToDo" && (
        <div className={css.new_card_form}>
          <FontAwesomeIcon className={css.add_card_icon} icon={faPlus} />
          <input
            className={css.new_card_title}
            type="text"
            placeholder="Task Title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            maxLength={50}
          />
          <textarea
            className={css.new_card_description}
            placeholder="Task Description"
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            maxLength={200}
          />
          <button className={css.new_card_button} onClick={handleAddClick}>Add Card</button>
        </div>
      )}
      </div>
     
    </div>
  );
};

export default Column;