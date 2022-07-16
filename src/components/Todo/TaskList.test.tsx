import ReactDOM from 'react-dom';
import { IProps } from './TaskList';
import { WithPinnedTasks } from './TaskList.stories';

it('renders pinned tasks at the start of the list', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <WithPinnedTasks {...(WithPinnedTasks.args as IProps)} />,
    div,
  );
  const lastTaskInput = div.querySelector(
    '.list-item:nth-child(1) input[value="Task 4"]',
  );
  expect(lastTaskInput).not.toBe(null);
  ReactDOM.unmountComponentAtNode(div);
});
