// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home/Home';
import BoardPage from './page/BoardPage/BoardPage';
import { Layout } from './components/Layout/Layout';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Головна сторінка */}
          
            <Route path="/board/:id" element={<BoardPage />} /> {/* Сторінка дошки */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
      </DndProvider>
  );
}

export default App;
