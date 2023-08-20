import { useRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import { ITaskState } from '../../components/Todo/interface';
import Header from '../../components/Header';
import TaskList from '../../components/Todo/TaskList';
import tasksAtom from './atom';
import FaceFrownOutline from '../../components/Icon/FaceFrownOutline';

const items = [{ path: '/', name: 'Home' }];

export interface IPureProps {
  error: string | null;
}

export function PureInboxScreen({ error }: IPureProps) {
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const onPinTask = (id: number) => {
    setTasks(
      tasks.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            state: ITaskState.TASK_PINNED,
          };
        }
        return item;
      }),
    );
  };
  const onArchiveTask = (id: number) => {
    setTasks(
      tasks.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            state: ITaskState.TASK_ARCHIVED,
          };
        }
        return item;
      }),
    );
  };

  if (error) {
    return (
      <div className="h-full w-full bg-[#2cc5d2] ">
        <Header items={items} />
        <div className="py-6 px-6 md:px-16">
          <div className="min-h-[calc(100vh-96px)] bg-white">
            <div className="absolute top-1/2 right-0 bottom-auto left-0 h-auto w-auto -translate-y-1/2 text-center">
              <FaceFrownOutline className="leading-14 mx-auto block w-12 stroke-[#2cc5d2]" />
              <div className="text-base font-extrabold text-slate-600">
                {error || 'Oh no!'}
              </div>
              <div className="text-sm text-slate-500">Something went wrong</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#2cc5d2] ">
      <Header items={items} />
      <div className="py-6 px-6 md:px-16">
        <div className="min-h-[calc(100vh-96px)] bg-white">
          <nav className="bg-[#d3edf4] px-6 py-5 text-left md:text-center">
            <h1 className="cursor-pointer whitespace-nowrap text-xl leading-5">
              <span className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap align-top font-extrabold text-[#1c3f53]">
                TaskBox
              </span>
            </h1>
          </nav>
          <TaskList
            loading={false}
            onPinTask={onPinTask}
            onArchiveTask={onArchiveTask}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  );
}

const InboxScreen = () => {
  const [params] = useSearchParams();
  return <PureInboxScreen error={params.get('error')} />;
};

export default InboxScreen;
