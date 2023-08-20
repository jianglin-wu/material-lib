import { useRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import { ITaskState } from '../../components/Todo/interface';
import Header from '../../components/Header';
import TaskList from '../../components/Todo/TaskList';
import './learnstorybook-code.css';
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
      <div className="absolute top-1/2 right-0 bottom-auto left-0 w-auto h-auto text-center -translate-y-1/2">
        <FaceFrownOutline className="w-12 leading-14 stroke-[#2cc5d2] block mx-auto" />
        <div className="text-base font-extrabold text-slate-100">Oh no!</div>
        <div className="text-sm text-slate-200">Something went wrong</div>
      </div>
    );
  }

  return (
    <div>
      <Header items={items} />
      <div className="min-h-[80vh] bg-white" style={{ margin: '20px 50px' }}>
        <nav className="text-left md:text-center px-6 py-5 bg-[#d3edf4]">
          <h1 className="text-xl leading-5 cursor-pointer whitespace-nowrap">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap font-extrabold text-[#1c3f53] inline-block align-top max-w-full">
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
  );
}

const InboxScreen = () => {
  const [params] = useSearchParams();
  return <PureInboxScreen error={params.get('error')} />;
};

export default InboxScreen;
