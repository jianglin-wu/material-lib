export interface ITask {
  id: number;
  title: string;
  state: ITaskState;
}

export enum ITaskState {
  TASK_INBOX = 'TASK_INBOX',
  TASK_PINNED = 'TASK_PINNED',
  TASK_ARCHIVED = 'TASK_ARCHIVED',
}
