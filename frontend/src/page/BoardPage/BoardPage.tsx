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
import { selectBoardId, selectBoardName } from '../../redux/selectors';
import { AppDispatch } from '../../redux/store';
import { getBoardData, loadCards } from '../../redux/thunks';


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
  // useEffect(() => {
  //   const fetchBoardData = async () => {
  //     try {
  //       // Отримання назви дошки
  //       const board = await fetchBoardById(id);
  //       // console.log('board', board)
  //       setBoardName(board.name);

  //       // Отримання карток за ID дошки
  //     const fetchedCards = await fetchCardsByBoardId(id);
  //     // console.log('fetchedCards', fetchedCards)
  //     setCards({
  //       todo: fetchedCards.filter(card => card.status === 'todo'),
  //       inProgress: fetchedCards.filter(card => card.status === 'inProgress'),
  //       done: fetchedCards.filter(card => card.status === 'done'),
  //     });
  //     } catch (error) {
  //       console.error('Error fetching board data:', error);
  //     }
  //   };
  //   fetchBoardData();
  // }, [id]);

  // const handleAddCard = async (status: keyof typeof cards) => {
  //   const newCard: Omit<CardProps, '_id'> & { boardId: string } = { 
  //     title: newCardTitle, 
  //     description: newCardDescription, 
  //     status,
  //     boardId: id!};
  //   try {
  //       // Виклик функції для створення картки
  //     const createdCard = await createCard(id!, newCard); 
  //     setCards(prevCards => ({ ...prevCards, [status]: [...prevCards[status], { ...createdCard, _id: createdCard._id }] }));
  //     setNewCardTitle('');
  //     setNewCardDescription('');
  //   } catch (error) {
  //     console.error('Error creating card:', error);
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
  //   // console.log('editingCardId', editingCardId);
  
  //   if (editingCardId) {
  //     // Знайдемо статус картки у всіх списках (todo, inProgress, done)
  //     const status = cards.todo.find(card => card._id === editingCardId)?.status ||
  //                    cards.inProgress.find(card => card._id === editingCardId)?.status ||
  //                    cards.done.find(card => card._id === editingCardId)?.status || 'todo';
  
  //     const updatedCard: Omit<CardProps, '_id'> = { 
  //       title, 
  //       description, 
  //       status, 
  //       boardId: editingCardData.boardId 
  //     };
  //       // console.log('updatedCard', updatedCard);

  //     try {
  //       // Викликаємо функцію для оновлення картки через API
  //       await updateCard(editingCardId, updatedCard);
  
  //       // Оновлюємо стан після успішного оновлення
  //       setCards(prevCards => {
  //         const updatedCards = { ...prevCards };
  
  //         // Оновлюємо картку у всіх списках
  //         const statuses: Array<keyof typeof updatedCards> = ['todo', 'inProgress', 'done'];
  //         statuses.forEach(status => {
  //           updatedCards[status] = updatedCards[status].map(card => 
  //             card._id === editingCardId ? { ...card, title, description } : card
  //           );
  //         });
  
  //         // console.log('updatedCards', updatedCards);
  //         return updatedCards;
  //       });
  //     } catch (error) {
  //       console.error('Error updating card:', error);
  //     } finally {
  //       // Закриваємо модальне вікно після збереження
  //       setEditingCardId(null);
  //     }
  //   }
  // };

//   const handleDeleteCard = async (status: keyof typeof cards, cardId: string) => {
//     try {
//       // Викликаємо функцію для видалення картки
//       await deleteCard(id!, cardId);
//     setCards(prevCards => ({ ...prevCards, [status]: prevCards[status].filter(card => card._id !== cardId) }));
//   } catch (error) {
//     console.error("Error deleting card:", error);
//     throw error;
//   }
// };

// const handleSearchQuery = async(searchQuery: string) => {
// try{
//   const boards = await fetchBoards();
//     // console.log('boards', boards)

//     const filteredBoards = boards.filter((board: BoardProps) =>
//       board.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     // console.log('Filtered boards:', filteredBoards);

//     if (filteredBoards.length > 0) {
//       const boardId = filteredBoards[0]._id; 
//       setBoardName(filteredBoards[0].name); // Оновлюємо назву дошки
//       const fetchedCards = await fetchCardsByBoardId(boardId);
//       setCards({
//         todo: fetchedCards.filter(card => card.status === 'todo'),
//         inProgress: fetchedCards.filter(card => card.status === 'inProgress'),
//         done: fetchedCards.filter(card => card.status === 'done'),
//       });
//       navigate(`/board/${boardId}`);

//     } else {
//       alert('No boards found!');
//     } 
//   } catch (error) {
//     console.error("Error searching boards:", error);
//     throw error;
//   }
// }
  //  const handleCreateNewBoard = async () => {
  //   if (!newBoardName.trim()) {
  //     alert("Board name cannot be empty!");
  //     return;
  //   }
  //   await createBoard(newBoardName);
  //   setNewBoardName('');
  // };

  // Функція для переходу на домашню сторінку
  
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
