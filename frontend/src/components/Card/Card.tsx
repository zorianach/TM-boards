import React from 'react'

const Card = () => {
  return (
    <div>Card</div>
  )
}

export default Card
// import React, { useState } from 'react';
// import {  useSelector } from 'react-redux';
// import {  } from '../../redux/boardSlice';
// import { CardEditModal } from '../CardEditModal/CardEditModal';
// import css from './Card.module.css'
// import { addCard, removeCard, updateCardDetails } from '../../redux/thunks';
// import { selectBoardCards } from '../../redux/selectors';
// import CardProps from '../../types';


// const Card: React.FC<CardProps> = ({ _id, title, description, status, boardId } ) => {
//   const cards = useSelector((state: RootState) => selectBoardCards(boardId)(state));
//   const [newCardTitle, setNewCardTitle] = useState('');
//   const [newCardDescription, setNewCardDescription] = useState('');
//   const [editingCardId, setEditingCardId] = useState<string | null>(null); //для збереження ID картки, яку редагуємо
//   const [editingCardData, setEditingCardData] = useState<{ title: string; description: string; boardId: string }>({ title: '', description: '', boardId: '' });
//   const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null); //для позиціонування модального вікна


//   const handleAddCard = async (status: keyof typeof cards) => {
//     const newCard: Omit<CardProps, '_id'> & { boardId: string } = { 
//       title: newCardTitle, 
//       description: newCardDescription, 
//       status: 'todo',
//       boardId};
//     try {
//         // Виклик функції для створення картки
//       const createdCard = await addCard(newCard); 
//       // setCards(prevCards => ({ ...prevCards, [status]: [...prevCards[status], { ...createdCard, _id: createdCard._id }] }));
//       console.log('createdCard', createdCard)
//       setNewCardTitle('');
//       setNewCardDescription('');
//     } catch (error) {
//       console.error('Error creating card:', error);
//     }
//   }; 

//   const handleDeleteCard = async (status: keyof typeof cards, cardId: string) => {
//     try {
//       // Викликаємо функцію для видалення картки
//       await removeCard({boardId, cardId});
//     // setCards(prevCards => ({ ...prevCards, [status]: prevCards[status].filter(card => card._id !== cardId) }));
//   } catch (error) {
//     console.error("Error deleting card:", error);
//     throw error;
//   }
// };

// const handleEditClick = (card: CardProps, event: React.MouseEvent<HTMLButtonElement>) => {
//   const rect = event.currentTarget.getBoundingClientRect();
//   setModalPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX }); // Позиціонування модального вікна
//   setEditingCardId(card._id);
//   // console.log('card', card._id)
//   setEditingCardData({ title: card.title, description: card.description, boardId: card.boardId });
// };

// const handleUpdateCard = async (title: string, description: string) => {
//   if (!editingCardId) return;
//   // console.log('editingCardId', editingCardId);

//     // Знайдемо статус картки 
//     const allCards = [...cards.todo, ...cards.inProgress, ...cards.done];
//     const cardToUpdate = allCards.find(card => card._id === editingCardId);
//     if (!cardToUpdate) {
//       console.error('Card not found');
//       return; 
//     }
//     const status = cardToUpdate.status;

//     const updatedCard: Omit<CardProps, '_id'> = { 
//       title, 
//       description, 
//       status, 
//       boardId: editingCardData.boardId 
//     };
//       // console.log('updatedCard', updatedCard);
//     try {
//       // Викликаємо функцію для оновлення картки
//       await updateCardDetails({cardId: editingCardId, updatedCard});

//       // // Оновлюємо стан після успішного оновлення
//       // setCards(prevCards => {
//       //   const updatedCards = { ...prevCards };

//         // // Оновлюємо картку у всіх списках
//         // const statuses: Array<keyof typeof updatedCards> = ['todo', 'inProgress', 'done'];
//         // statuses.forEach(status => {
//         //   updatedCards[status] = updatedCards[status].map(card => 
//         //     card._id === editingCardId ? { ...card, title, description } : card
//         //   );
//         // });

//         // console.log('updatedCards', updatedCards);
//         // return updatedCards;
//         return;
//       } catch (error) {
//         console.error('Error updating card:', error);
//       } finally {
//         // Закриваємо модальне вікно після збереження
//         setEditingCardId(null);
//       }
//   }


// // const moveCard = (newStatus: 'todo' | 'inProgress' | 'done') => {
// //   dispatch(updateCardStatus({ cardId, newStatus }));
// // };

// //   const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
// //     event.dataTransfer.setData("text/plain", _id);
// //   };

//   return (
//     <div className={css.board_page_container}>
//         {/* ToDo + Додати нову картку */}
//         <div>
//           <div>
//             <h2>ToDo</h2>
//             <div>
//               {cards.todo.map((card) => (
//                 <div key={card._id}>
//                   <h3>{card.title}</h3>
//                   <p>{card.description}</p>
//                   <button onClick={(event) => handleEditClick(card, event)}>Edit</button>
//                 <button onClick={() => handleDeleteCard('todo', card._id)}>Delete</button>
//                 </div>
//               ))}
//             </div>
//           </div>

//            {/* Модальне для редагування картки */}
//           {editingCardId !== null && modalPosition && (
//           <CardEditModal
//             isOpen={editingCardId !== null}
//             onClose={() => setEditingCardId(null)}
//             title={editingCardData.title}
//             description={editingCardData.description}
//             onSave={handleUpdateCard}
//             position={modalPosition} // Передача позиції модального вікна
//           />
//         )}
//         </div>
//         <div>
//           <input
//             type="text"
//             value={newCardTitle}
//             onChange={(e) => setNewCardTitle(e.target.value)}
//             placeholder="Card Title"
//           />
//           <textarea
//             value={newCardDescription}
//             onChange={(e) => setNewCardDescription(e.target.value)}
//             placeholder="Card Description"
//           />
//           <button onClick={() => handleAddCard('todo')}>Add Card</button>
//         </div> 

//         {/* Колонки "In Progress" і "Done" */}
//          <div>
//           <h2>In Progress</h2>
//           <div>
//             {cards.inProgress.map((card) => (
//               <div key={card._id}>
//                 <h3>{card.title}</h3>
//                 <p>{card.description}</p>
//                 <button onClick={(event) => handleEditClick(card, event)}>Edit</button>
//                 <button onClick={() => handleDeleteCard('inProgress', card._id)}>Delete</button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h2>Done</h2>
//           <div>
//             {cards.done.map((card) => (
//               <div key={card._id}>
//                 <h3>{card.title}</h3>
//                 <p>{card.description}</p>
//                 <button onClick={(event) => handleEditClick(card, event)}>Edit</button>
//                 <button onClick={() => handleDeleteCard('done', card._id)}>Delete</button>
//               </div>
//             ))}
//           </div>
//         </div> 
//       </div>
//   );
// };