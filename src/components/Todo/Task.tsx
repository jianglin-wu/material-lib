import { ITask, ITaskState } from './interface';
import StarIcon from '@heroicons/react/24/outline/StarIcon';
export interface IProps {
  task: ITask;
  onArchiveTask: (id: number) => void;
  onPinTask: (id: number) => void;
}

export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}: IProps) {
  console.log(
    'state === ITaskState.TASK_ARCHIVED',
    state === ITaskState.TASK_ARCHIVED,
    state,
    ITaskState.TASK_ARCHIVED,
  );
  return (
    <div
      className={`group/item flex list2-item ${state} hover:bg-gradient-to-t from-[#e5f9f7] to-[#f0fffd]`}
    >
      <label className="checkbox group-hover/item:cursor-pointer">
        <input
          type="checkbox"
          checked={state === ITaskState.TASK_ARCHIVED}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>
      <div className="title">
        <input
          className="[.TASK\_ARCHIVED_&]:text-[#aaa]"
          type="text"
          value={title}
          readOnly={true}
          placeholder="Input title"
        />
      </div>

      <div className="actions" onClick={(event) => event.stopPropagation()}>
        {state !== ITaskState.TASK_ARCHIVED && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a className="flex h-12 items-center" onClick={() => onPinTask(id)}>
            <StarIcon className="w-4 h-4 stroke-[#2cc5d2] [.TASK\_PINNED_&]:fill-[#2cc5d2]" />
          </a>
        )}
      </div>
    </div>
  );
}
