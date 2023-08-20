import { CheckIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/outline';
import { ITask, ITaskState } from './interface';

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
  return (
    <div
      className={`${state} group/item flex h-12 w-full flex-wrap bg-white from-[#e5f9f7] to-[#f0fffd] leading-5 hover:bg-gradient-to-t [&+&]:border-t [&+&]:border-[#f0f9fb]`}
    >
      <label className="group-hover/item:cursor-pointer relative flex h-12 w-11 items-center justify-center align-middle">
        <input
          type="checkbox"
          checked={state === ITaskState.TASK_ARCHIVED}
          disabled
          name="checked"
          className="peer invisible"
        />
        <span
          className="absolute top-1/2 right-auto bottom-auto left-1/2 block h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 bg-transparent shadow-[0_0_0_1px_#2cc5d2_inset] peer-checked:hidden"
          onClick={() => onArchiveTask(id)}
        />
        <CheckIcon className="absolute top-1/2 right-auto bottom-auto left-1/2 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 stroke-[#2cc5d2] peer-checked:block" />
      </label>
      <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
        <input
          className="w-full bg-transparent leading-[48px] text-slate-500 outline-none focus:cursor-text [.TASK\_ARCHIVED_&]:text-[#aaa]"
          type="text"
          value={title}
          readOnly={true}
          placeholder="Input title"
        />
      </div>

      <div
        className="pr-5 transition-all duration-200 ease-in"
        onClick={(event) => event.stopPropagation()}
      >
        {state !== ITaskState.TASK_ARCHIVED && (
          <a className="flex h-12 items-center" onClick={() => onPinTask(id)}>
            <StarIcon className="h-4 w-4 cursor-pointer stroke-[#2cc5d2] [.TASK\_PINNED_&]:fill-[#2cc5d2]" />
          </a>
        )}
      </div>
    </div>
  );
}
