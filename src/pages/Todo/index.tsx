import { useRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import { ITaskState } from '../../components/Todo/interface';
import TaskList from '../../components/Todo/TaskList';
import './learnstorybook-code.css';
import tasksAtom from './atom';

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
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem' }}>
      <div className="page lists-show" style={{ margin: '20px 50px' }}>
        <nav>
          <h1 className="title-page">
            <span className="title-wrapper">TaskBox</span>
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
