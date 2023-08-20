import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { PureInboxScreen } from './index';

const meta: Meta<typeof PureInboxScreen> = {
  title: 'TODO/InboxScreen',
  component: PureInboxScreen,
  decorators: [
    (story) => (
      <RecoilRoot>
        <BrowserRouter>{story()}</BrowserRouter>
      </RecoilRoot>
    ),
  ],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof PureInboxScreen>;
export const Default: Story = {
  args: {
    error: null,
  },
};

export const ErrorState: Story = {
  args: {
    error: '加载失败！',
  },
};
