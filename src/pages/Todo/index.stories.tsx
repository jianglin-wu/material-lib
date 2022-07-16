import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { IPureProps, PureInboxScreen } from './index';

export default {
  title: 'TODO/InboxScreen',
  component: PureInboxScreen,
  decorators: [(story) => <RecoilRoot>{story()}</RecoilRoot>],
} as ComponentMeta<typeof PureInboxScreen>;

const Template = (args: IPureProps) => <PureInboxScreen {...args} />;

export const Default: ComponentStory<typeof PureInboxScreen> = Template.bind(
  {},
);
Default.args = {
  error: null,
};

export const ErrorState: ComponentStory<typeof PureInboxScreen> = Template.bind(
  {},
);
ErrorState.args = {
  error: '加载失败！',
};
