import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from './App';

// 模拟 React.lazy
jest.mock('./pages/Home', () => {
  return () => <div>mocked home component</div>;
});
jest.mock('./pages/Todo', () => {
  return () => <div>mocked todo component</div>;
});

// 解决 react-test-render window.matchMedia 报错
global.matchMedia = function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
} as any;

test('renders home', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>,
  );

  const loadingElement = screen.getByText(/loading/i);
  expect(loadingElement).toBeInTheDocument();

  const textToMatch = await screen.findByText(/mocked home component/);
  expect(textToMatch).toBeInTheDocument();
});

test('renders todo', async () => {
  const history = createMemoryHistory();
  history.push('/todo');
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>,
  );

  const loadingElement = screen.getByText(/loading/i);
  expect(loadingElement).toBeInTheDocument();

  const textToMatch = await screen.findByText(/mocked todo component/);
  expect(textToMatch).toBeInTheDocument();
});
