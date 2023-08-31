import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DataFieldFilterWithModal, {
  DataFieldFilter,
  DataFieldFilterPure,
  DEFAULT_OPERATOR_MAP,
} from './index';
import { metaData, operatorMap } from './example/data-filter';

const meta: Meta<typeof DataFieldFilterPure> = {
  title: 'Form/DataFieldFilter',
  component: DataFieldFilterPure,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DataFieldFilterPure>;

export const Primary: Story = {
  args: {
    metaData,
    initialValue: [],
    operatorMap: DEFAULT_OPERATOR_MAP,
    setCustomErrorInfo: () => null,
  },
};

export const Modal: Story = {
  args: {
    metaData,
    initialValue: [],
    operatorMap: DEFAULT_OPERATOR_MAP,
  },
  render: (args: any) => {
    return <DataFieldFilterWithModal {...args} />;
  },
};

const DataFieldFilterForwardRef = React.forwardRef(DataFieldFilter);
const DataFieldFilterPureWithHooks = () => {
  const test = useRef<any>(null);
  return (
    <DataFieldFilterForwardRef
      metaData={metaData}
      initialValue={[]}
      operatorMap={operatorMap}
      ref={test}
    />
  );
};

export const PureList: Story = {
  render: () => <DataFieldFilterPureWithHooks />,
};
