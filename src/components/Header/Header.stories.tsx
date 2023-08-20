import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './index';

const meta: Meta<typeof Header> = {
  title: 'Basic/Header',
  component: Header,
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    items: [
      { path: '/', name: 'Home' },
      { path: '/form/list-filter-head', name: 'Form List Filter Head' },
      { path: '/form/dynamic-filter', name: 'Form Dynamic Filter' },
    ],
  },
};
