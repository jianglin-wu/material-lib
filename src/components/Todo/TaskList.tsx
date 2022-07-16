import React from 'react';
import Task from './Task';
import { ITask, ITaskState } from './interface';

export interface IProps {
  loading: boolean;
  tasks: ITask[];
  onPinTask: (id: number) => void;
  onArchiveTask: (id: number) => void;
}

export const PureTaskList: React.FC<IProps> = ({
  loading,
  tasks,
  onPinTask,
  onArchiveTask,
}) => {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === ITaskState.TASK_PINNED),
    ...tasks.filter((t) => t.state === ITaskState.TASK_INBOX),
    ...tasks.filter((t) => t.state === ITaskState.TASK_ARCHIVED),
  ];
  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};

PureTaskList.defaultProps = {
  loading: false,
  tasks: [],
};

export default PureTaskList;
