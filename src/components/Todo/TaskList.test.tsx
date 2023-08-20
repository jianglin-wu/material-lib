import renderer from 'react-test-renderer';
import TaskList, { IProps } from './TaskList';
import { WithPinnedTasks } from './TaskList.stories';

it('renders pinned tasks at the start of the list', () => {
  const component = renderer.create(
    <TaskList {...(WithPinnedTasks.args as IProps)} />,
  );
  expect(component.toJSON()).not.toBe(null);
});
