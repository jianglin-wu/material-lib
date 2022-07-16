import ReactDOM from 'react-dom/client';
import { IProps } from './TaskList';
import { WithPinnedTasks } from './TaskList.stories';

it('renders pinned tasks at the start of the list', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  root.render(<WithPinnedTasks {...(WithPinnedTasks.args as IProps)} />);
  const lastTaskInput = div.querySelector(
    '.list-item:nth-child(1) input[value="Task 4"]',
  );
  expect(lastTaskInput).not.toBe(null);
  root.unmount();
});
