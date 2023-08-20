import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoadingPage, { LoadingBlock } from './components/Loading';
import BasicLayout from './components/Layout/BasicLayout';

const Home = React.lazy(() => import('./pages/Home'));
const Todo = React.lazy(() => import('./pages/Todo'));
const FormIndex = React.lazy(() => import('./pages/Form/index'));
const ListFilterHead = React.lazy(() => import('./pages/Form/ListFilterHead'));
const DynamicFilter = React.lazy(() => import('./pages/Form/DynamicFilter'));
const Workspace = React.lazy(() => import('./Workspace'));

const asyncElement = (
  element: React.ReactNode,
  fallback: React.ReactNode = <LoadingBlock />,
) => <Suspense fallback={fallback}>{element}</Suspense>;

function App() {
  return (
    <Routes>
      <Route element={<BasicLayout />}>
        <Route path="/" element={asyncElement(<Home />, <LoadingPage />)} />
        <Route path="/todo" element={asyncElement(<Todo />, <LoadingPage />)} />
        <Route
          path="/form"
          element={asyncElement(<FormIndex />, <LoadingPage />)}
        >
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
      </Route>
    </Routes>
  );
}

export default App;
