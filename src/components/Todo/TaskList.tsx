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
    <div className="flex h-12 w-full items-center bg-white pl-4 leading-4 [&+&]:border-t [&+&]:border-[#f0f9fb]">
      <span className="mr-4 inline-block h-3 w-3 animate-pulse cursor-progress bg-[#eee] text-transparent" />
      <span className="">
        <span className="inline-block animate-pulse cursor-progress bg-[#eee] text-transparent">
          Loading
        </span>{' '}
        <span className="inline-block animate-pulse cursor-progress bg-[#eee] text-transparent">
          cool
        </span>{' '}
        <span className="inline-block animate-pulse cursor-progress bg-[#eee] text-transparent">
          state
        </span>
      </span>
    </div>
  );
  if (loading) {
    return (
      <div className="relative min-h-[288px] bg-white">
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
      <div className="relative min-h-[288px] bg-white">
        <div className="absolute top-1/2 right-0 bottom-auto left-0 h-auto w-auto -translate-y-1/2 text-center">
          <CheckIcon className="leading-14 mx-auto block w-12 stroke-[#2cc5d2]" />
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
    <div className="relative min-h-[288px] bg-white">
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
