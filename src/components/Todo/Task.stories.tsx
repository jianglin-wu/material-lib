import { ComponentStory, ComponentMeta } from '@storybook/react';
import Task, { IProps } from './Task';
import { ITaskState } from './interface';

export default {
  title: 'TODO/Task',
  component: Task,
} as ComponentMeta<typeof Task>;

const Template = (args: IProps) => <Task {...args} />;

export const Default: ComponentStory<typeof Task> = Template.bind({});
Default.args = {
  task: {
    id: 1,
    title: 'Test Task',
    state: ITaskState.TASK_INBOX,
  },
};

export const Pinned: ComponentStory<typeof Task> = Template.bind({});
Pinned.args = {
  task: {
    ...(Default.args as IProps).task,
    state: ITaskState.TASK_PINNED,
  },
};

export const Archived: ComponentStory<typeof Task> = Template.bind({});
Archived.args = {
  task: {
    ...(Default.args as IProps).task,
    state: ITaskState.TASK_ARCHIVED,
  },
};
