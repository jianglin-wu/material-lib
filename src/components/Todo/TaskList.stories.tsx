import type { Meta, StoryObj } from '@storybook/react';
import { ITaskState } from './interface';
import TaskList, { IProps } from './TaskList';

const meta: Meta<typeof TaskList> = {
  title: 'TODO/TaskList',
  component: TaskList,
};
export default meta;

type Story = StoryObj<typeof TaskList>;

export const Default: Story = {
  args: {
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        state: ITaskState.TASK_INBOX,
      },
      {
        id: 2,
        title: 'Task 2',
        state: ITaskState.TASK_INBOX,
      },
      {
        id: 3,
        title: 'Task 3',
        state: ITaskState.TASK_INBOX,
      },
    ],
  },
};

export const WithPinnedTasks: Story = {
  args: {
    tasks: [
      ...(Default.args as IProps).tasks,
      {
        id: 4,
        title: 'Task 4',
        state: ITaskState.TASK_PINNED,
      },
      {
        id: 5,
        title: 'Task 5',
        state: ITaskState.TASK_PINNED,
      },
      {
        id: 6,
        title: 'Task 6',
        state: ITaskState.TASK_ARCHIVED,
      },
    ],
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    tasks: [],
  },
};

export const Empty: Story = {
  args: {
    loading: false,
    tasks: [],
  },
};
