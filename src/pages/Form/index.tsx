import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const items = [
  { path: '/', name: 'Home' },
  { path: '/form/list-filter-head', name: 'Form List Filter Head' },
  { path: '/form/dynamic-filter', name: 'Form Dynamic Filter' },
];

const Index = (props: any) => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-500 to-purple-500">
      <Header items={items} />
      <div className="m-6 min-h-[500px] rounded bg-white p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
