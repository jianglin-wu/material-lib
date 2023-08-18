import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const items = [
  { path: '/', name: 'Home' },
  { path: '/form/list-filter-head', name: 'Form List Filter Head' },
  { path: '/form/dynamic-filter', name: 'Form Dynamic Filter' },
];

const Index = (props: any) => {
  console.log('props', props);
  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-500 to-purple-500">
      <Header items={items} />
      <div className="rounded min-h-[500px] bg-white m-6 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
