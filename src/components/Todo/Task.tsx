import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import StarIcon from '@heroicons/react/24/outline/StarIcon';
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
      className={`${state} group/item flex leading-5 flex-wrap h-12 w-full bg-white hover:bg-gradient-to-t from-[#e5f9f7] to-[#f0fffd] [&+&]:border-t [&+&]:border-[#f0f9fb]`}
    >
      <label className="relative h-12 flex items-center justify-center align-middle w-11 group-hover/item:cursor-pointer">
        <input
          type="checkbox"
          checked={state === ITaskState.TASK_ARCHIVED}
          disabled
          name="checked"
          className="invisible peer"
        />
        <span
          className="block peer-checked:hidden absolute top-1/2 right-auto bottom-auto left-1/2 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 bg-transparent shadow-[0_0_0_1px_#2cc5d2_inset]"
          onClick={() => onArchiveTask(id)}
        />
        <CheckIcon className="hidden peer-checked:block absolute top-1/2 right-auto bottom-auto left-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 stroke-[#2cc5d2]" />
      </label>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap flex-grow">
        <input
          className="text-slate-500 [.TASK\_ARCHIVED_&]:text-[#aaa] leading-[48px] outline-none bg-transparent w-full focus:cursor-text"
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
            <StarIcon className="w-4 h-4 stroke-[#2cc5d2] [.TASK\_PINNED_&]:fill-[#2cc5d2] cursor-pointer" />
          </a>
        )}
      </div>
    </div>
  );
}
