export interface CardProps {
    _id: string;
    title: string;
    description: string;
    status: 'todo' | 'inProgress' | 'done';
    boardId: string;
  }
  
  export interface BoardProps {
    _id: string | null;
    name: string | null;
    children?: React.ReactNode;
  }

  export interface ColumnProps {
    title: string;
    cards: CardProps[];
    onAddCard: (title: string, description: string, boardId: string, status: 'todo' | 'inProgress' | 'done') => void;
    onEditClick: (card: CardProps) => void;
    onDeleteClick: (cardId: string) => Promise<void>;  
    columnId: string;
  }

  export type ColumnStatus = 'todo' | 'inProgress' | 'done';


