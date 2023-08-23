import type { Meta, StoryObj } from '@storybook/react';
import DrawingBoard from './components/DrawingBoard';
import EditWarp from './components/EditWarp';
import Img from './assets/c4315f40e314e782a80b47cb1e51f600.jpg';

const meta: Meta<typeof DrawingBoard> = {
  title: 'Workspace/DrawingBoard',
  component: DrawingBoard,
};

export default meta;
type Story = StoryObj<typeof DrawingBoard>;

export const Basic: Story = {
  args: {},
  render: () => (
    <DrawingBoard className="relative h-[500px] select-none bg-slate-100">
      <EditWarp defaultPosition={{ left: 0, top: 0 }}>
        <div>hello</div>
      </EditWarp>
      <EditWarp defaultPosition={{ left: 200, top: 0 }}>
        <div>world</div>
      </EditWarp>
    </DrawingBoard>
  ),
};

export const Image: Story = {
  args: {},
  render: () => (
    <DrawingBoard className="relative h-[500px] select-none bg-slate-100">
      <EditWarp
        defaultPosition={{ left: 0, top: 200 }}
        defaultSize={{ width: 200, height: 100 }}
      >
        <img src={Img} alt="" />
      </EditWarp>
    </DrawingBoard>
  ),
};
