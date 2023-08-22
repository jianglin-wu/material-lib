import type { Meta, StoryObj } from '@storybook/react';

import BaseIframe from './BaseIframe';

const meta: Meta<typeof BaseIframe> = {
  title: 'BaseIframe/html',
  component: BaseIframe,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      type: { name: 'string', required: true },
      description: 'Iframe title used for accessibility',
    },
    url: {
      type: { name: 'string', required: true },
      description: 'Link to the embed source',
    },
    height: {
      type: { name: 'string', required: false },
      description: 'Iframe embed height',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseIframe>;

export const CountdownEnd: Story = {
  args: {
    title: 'countdown-end',
    url: '/static-html/countdown-end/index.html',
    height: '100vh',
  },
};

export const PhotoWall: Story = {
  args: {
    title: 'photo-wall',
    url: '/static-html/photo-wall/index.html',
    height: '100vh',
  },
};
