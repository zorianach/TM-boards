
import React from 'react';
import { CardProps } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import css from './Card.module.css';

interface CardComponentProps {
  card: CardProps;
  onEditClick: (card: CardProps) => void;
  onDeleteClick: (cardId: string) => void;
}

const Card: React.FC<CardComponentProps> = ({ card, onEditClick, onDeleteClick }) => {
  return (
    <div className={css.card_item}>
      <h3 className={css.card_title}>{card.title}</h3>
      <p className={css.card_description}>{card.description}</p>
      <div className={css.icons_box}>
        <button onClick={() => onEditClick(card)} className={css.icon_button}>
          <FontAwesomeIcon icon={faEdit} className={css.icon} />
        </button>
        <button onClick={() => onDeleteClick(card._id)} className={css.icon_button}>
          <FontAwesomeIcon icon={faTrash} className={css.icon} />
        </button>
      </div>
    </div>
  );
};

export default Card;

