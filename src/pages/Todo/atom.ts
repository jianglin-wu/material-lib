import { atom } from 'recoil';
import { ITaskState } from '../../components/Todo/interface';

const tasksAtom = atom({
  key: 'tasks',
  default: [
    {
      id: 1,
      title: 'Task 1',
      state: ITaskState.TASK_ARCHIVED,
    },
    {
      id: 2,
      title: 'Task 2',
      state: ITaskState.TASK_INBOX,
    },
    {
      id: 3,
      title: 'Task 3',
      state: ITaskState.TASK_PINNED,
    },
  ],
});

export default tasksAtom;
