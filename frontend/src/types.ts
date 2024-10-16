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
