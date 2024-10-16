import React, { useState } from 'react';
import css from './CardEditModal.module.css'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onSave: (title: string, description: string) => void;
  position: { top: number; left: number };

}

export const CardEditModal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, onSave, position }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(newTitle, newDescription);
    console.log('newTitle', newTitle)
    onClose();
  };

  return (
    <div className={css.modal_overlay} onClick={onClose}>
      <div
        className={css.modal}
        style={{
          top: position.top,
          left: position.left,
        }}
        onClick={(e) => e.stopPropagation()} // Зупинити клік на модальному вікні
      >
        <div className={css.modal_container}>
          <h2>Edit Task</h2>
          <input
            className={css.card_title}
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Task Title"
            maxLength={50}
          />
          <textarea
            className={css.card_description}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Task Description"
            maxLength={80}
          />
          <div className={css.buttons_box}>
            <button className={css.card_button} onClick={handleSave}>Save</button>
            <button className={css.card_button} onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

//  default CardEditModal;
