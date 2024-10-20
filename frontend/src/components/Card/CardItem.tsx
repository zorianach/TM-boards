import React from 'react';
import { useDrag } from 'react-dnd';
import { CardProps } from '../../types';
import css from './CardItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface CardItemProps {
  card: CardProps;
  onEditClick: (card: CardProps) => void;
  onDeleteClick: (cardId: string) => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, onEditClick, onDeleteClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: card,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`${css.card_item} ${isDragging ? css.dragging : ''}`}
    >
      <h3 className={css.card_title}>{card.title}</h3>
      <p className={css.card_description}>{card.description}</p>
      <div className={css.icons_box}>
        <button className={css.icon_button} onClick={() => onEditClick(card)}>
          <FontAwesomeIcon icon={faEdit} className={css.icon}/>
        </button>
        <button className={css.icon_button} onClick={() => onDeleteClick(card._id)}>
          <FontAwesomeIcon icon={faTrash} className={css.icon} />
        </button>
      </div>
    </div>
  );
};

export default CardItem;
