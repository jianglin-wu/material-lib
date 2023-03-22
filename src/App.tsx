import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const Home = React.lazy(() => import('./pages/Home'));
const Todo = React.lazy(() => import('./pages/Todo'));
const Form = React.lazy(() => import('./pages/Form'));
const KonvaEditor = React.lazy(() => import('./pages/KonvaEditor'));
const Workspace = React.lazy(() => import('./Workspace'));

const Loading = () => <div>loading</div>;
const asyncElement = (element: React.ReactNode) => (
  <Suspense fallback={<Loading />}>{element}</Suspense>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={asyncElement(<Home />)} />
      <Route path="/todo" element={asyncElement(<Todo />)} />
      <Route path="/form" element={asyncElement(<Form />)} />
      <Route path="/konva" element={asyncElement(<KonvaEditor />)} />
      <Route path="/workspace" element={asyncElement(<Workspace />)} />
    </Routes>
  );
}

export default App;
