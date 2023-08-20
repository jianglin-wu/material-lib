import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DataFieldFilterWithModal, { DataFieldFilter } from './index';
import { metaData, operatorMap } from './example/data-filter';

const meta: Meta<typeof DataFieldFilterWithModal> = {
  title: 'Form/DataFieldFilter',
  component: DataFieldFilterWithModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DataFieldFilterWithModal>;

export const Default: Story = {
  args: {
    metaData,
    initialValue: [],
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
