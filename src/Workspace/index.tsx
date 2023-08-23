import Header from '../components/Header';
import DrawingBoard from './components/DrawingBoard';
import EditWarp from './components/EditWarp';
import Img from './assets/c4315f40e314e782a80b47cb1e51f600.jpg';
import './index.css';

const items = [
  {
    name: 'Home',
    path: '/',
  },
];

export default function Workspace() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-500 to-purple-500">
      <Header items={items} />
      <DrawingBoard className="relative mx-6 h-[500px] select-none bg-slate-100">
        <EditWarp defaultPosition={{ left: 0, top: 0 }}>
          <div>hello</div>
        </EditWarp>
        <EditWarp defaultPosition={{ left: 200, top: 0 }}>
          <div>world</div>
        </EditWarp>
        <EditWarp
          defaultPosition={{ left: 0, top: 200 }}
          defaultSize={{ width: 200, height: 100 }}
        >
          <img src={Img} alt="" />
        </EditWarp>
      </DrawingBoard>
    </div>
  );
}
