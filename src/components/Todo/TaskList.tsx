import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
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
    <div className="[&+&]:border-t [&+&]:border-[#f0f9fb] h-12 w-full bg-white flex items-center leading-4 pl-4">
      <span className="w-3 h-3 mr-4 bg-[#eee] text-transparent cursor-progress inline-block animate-pulse" />
      <span className="">
        <span className="bg-[#eee] text-transparent cursor-progress inline-block animate-pulse">
          Loading
        </span>{' '}
        <span className="bg-[#eee] text-transparent cursor-progress inline-block animate-pulse">
          cool
        </span>{' '}
        <span className="bg-[#eee] text-transparent cursor-progress inline-block animate-pulse">
          state
        </span>
      </span>
    </div>
  );
  if (loading) {
    return (
      <div className="relative bg-white min-h-[288px]">
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
      <div className="relative bg-white min-h-[288px]">
        <div className="absolute top-1/2 right-0 bottom-auto left-0 w-auto h-auto text-center -translate-y-1/2">
          <CheckIcon className="w-12 leading-14 stroke-[#2cc5d2] block mx-auto" />
          <div className="text-base font-extrabold text-slate-900">Oh no!</div>
          <div className="text-sm text-slate-600">Something went wrong</div>
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
    <div className="relative bg-white min-h-[288px]">
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
