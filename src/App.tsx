import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoadingPage from './components/Loading/LoadingPage';

const Home = React.lazy(() => import('./pages/Home'));
const Todo = React.lazy(() => import('./pages/Todo'));
const FormIndex = React.lazy(() => import('./pages/Form/index'));
const ListFilterHead = React.lazy(() => import('./pages/Form/ListFilterHead'));
const DynamicFilter = React.lazy(() => import('./pages/Form/DynamicFilter'));
const Workspace = React.lazy(() => import('./Workspace'));

const asyncElement = (element: React.ReactNode) => (
  <Suspense fallback={<LoadingPage />}>{element}</Suspense>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={asyncElement(<Home />)} />
      <Route path="/todo" element={asyncElement(<Todo />)} />
      <Route path="/form" element={asyncElement(<FormIndex />)}>
        {/* <Route path="/form"> */}
        <Route
          path="list-filter-head"
          element={asyncElement(<ListFilterHead />)}
        />
        <Route
          path="dynamic-filter"
          element={asyncElement(<DynamicFilter />)}
        />
      </Route>
      <Route path="/workspace" element={asyncElement(<Workspace />)} />
    </Routes>
  );
}

export default App;
