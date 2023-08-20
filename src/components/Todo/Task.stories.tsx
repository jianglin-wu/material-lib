import type { Meta, StoryObj } from '@storybook/react';
import Task, { IProps } from './Task';
import { ITaskState } from './interface';

const meta: Meta<typeof Task> = {
  title: 'TODO/Task',
  component: Task,
};

export default meta;

type Story = StoryObj<typeof Task>;

export const Default: Story = {
  args: {
    task: {
      id: 1,
      title: 'Test Task',
      state: ITaskState.TASK_INBOX,
    },
  },
};

export const Pinned: Story = {
  args: {
    task: {
      ...(Default.args as IProps).task,
      state: ITaskState.TASK_PINNED,
    },
  },
};

export const Archived: Story = {
  args: {
    task: {
      ...(Default.args as IProps).task,
      state: ITaskState.TASK_ARCHIVED,
    },
  },
};
