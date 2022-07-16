import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ITaskState } from './interface';
import TaskList, { IProps } from './TaskList';

export default {
  title: 'TODO/TaskList',
  component: TaskList,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
} as ComponentMeta<typeof TaskList>;

const Template = (args: IProps) => <TaskList {...args} />;

export const Default: ComponentStory<typeof TaskList> = Template.bind({});
Default.args = {
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
};

export const WithPinnedTasks: ComponentStory<typeof TaskList> = Template.bind(
  {},
);
WithPinnedTasks.args = {
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
};

export const Loading: ComponentStory<typeof TaskList> = Template.bind({});
Loading.args = {
  loading: true,
  tasks: [],
};

export const Empty: ComponentStory<typeof TaskList> = Template.bind({});
Empty.args = {
  loading: false,
  tasks: [],
};
