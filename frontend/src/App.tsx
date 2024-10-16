// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home/Home';
import BoardPage from './page/BoardPage/BoardPage';
import { Layout } from './components/Layout/Layout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} /> {/* Головна сторінка */}
        <Route path="/board/:id" element={<BoardPage />} /> {/* Сторінка дошки */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
